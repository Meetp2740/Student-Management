import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
    },
    Role: {
        type: String,
        enum: {
            values: ['student', 'faculty', 'management'],
            message: "please select correct role",
        },
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    refreshToken: {
        type: String,
    },
    ContactNumber: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression for a simple phone number validation
                return /^\d{10}$/g.test(v); // Assuming a 10-digit phone number
            },
            message: 'Enter valid mobile number' // Your specific error message
        },
        required: [true, 'ContactNumber number is required'],
    }
},
    {
        timestamps: true
    }
);

userSchema.post('validate', function (error, doc, next) {
    if (error && error.errors && error.errors['ContactNumber']) {
        error.message = error.errors['ContactNumber'].message;
    }
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();

    this.Password = await bcrypt.hash(this.Password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (Password) {
    return await bcrypt.compare(Password, this.Password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            Email: this.Email,
            Role: this.Role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);