import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";

const generateAccessAndRefereshTokens = async (userId) => {

    try {

        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    }

    catch (error) {

        next(new ApiError(500, "Internal Server Error"))

    }
}

export const userLogin = asyncHandler(async (req, res, next) => {

    const { Email, Password } = req.body;

    if (!(Email || Password)) {
        return next(new ApiError(400, "Email and Password are required"))
    }

    const user = await User.findOne({ Email })

    if (!user) {
        return next(new ApiError(404, "User not found"))
    }

    const isMatch = await user.isPasswordCorrect(Password)

    if (!isMatch) {
        return next(new ApiError(401, "Invalid user creadentials"))
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-Password -refreshToken")

    const options = {
        httpOnly: true,
        new: true,
        secure: true
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: loggedInUser, accessToken
                },
                "User Logged In Successfully")
        )
})

export const studentRegister = asyncHandler(async (req, res, next) => {

    const { FirstName, Password, Email, ContactNumber, Role, LastName, Address, Semester, BirthDate, Gender, Avatar } = req.body;
    const { Course: courseName } = req.body;

    if (![FirstName, LastName, Email, ContactNumber, Password, Role].every(field => typeof field === 'string' && field.trim().length > 0)) {
        next(new ApiError(400, "All fields are required"))
        return;
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const exisitingUser = await User.findOne({ Email }).session(session);

        if (exisitingUser) {
            session.endSession();
            return res.status(409).json(new ApiResponse(409, null, "User already exists"));
        }

        const FullName = FirstName + " " + LastName;

        const newUser = await User.create(
            [
                {
                    FirstName: FirstName,
                    LastName: LastName,
                    Password: Password,
                    Email: Email,
                    ContactNumber: ContactNumber,
                    Role: Role
                },
            ],
            { session }
        );

        const id = newUser[0]._id

        const newStudent = new Student({
            user: id,
            Address: Address,
            FullName: FullName,
            Course: courseName,
            Semester: Semester,
            BirthDate: BirthDate,
            Avatar: Avatar,
            Gender: Gender
        });

        console.log(newStudent)

        await newStudent.save({ session });

        const courseToUpdate = await Course.findOne();
        console.log(courseToUpdate)

        if (courseToUpdate === null || courseToUpdate === undefined) {
            session.endSession();
            return next(new ApiError(404, "Course not found"));
        }

        courseToUpdate.StudentsEnrolled.push(newStudent._id);
        await courseToUpdate.save({ session })

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            new ApiResponse(201, null, "User Created Successfully")
        );

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return next(new ApiError(500, "Registration failed: " + err.message));
    }
})

export const adminRegister = asyncHandler(async (req, res, next) => {

    const { FirstName, Password, Email, ContactNumber, Role, LastName, Address, Department, BirthDate, Gender, Avatar } = req.body;

    if (![FirstName, LastName, Email, ContactNumber, Password, Role].every(field => typeof field === 'string' && field.trim().length > 0)) {
        return next(new ApiError(400, "All fields are required"))
    }

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const exisitingUser = await User.findOne({ Email }).session(session);

        if (exisitingUser) {
            session.endSession();
            return res.status(409).json(new ApiResponse(409, null, "User already exists"));
        }

        const FullName = FirstName + " " + LastName;

        const newUser = await User.create(
            [
                {

                    FirstName: FirstName,
                    LastName: LastName,
                    Password: Password,
                    Email: Email,
                    ContactNumber: ContactNumber,
                    Role: Role
                },
            ],
            { session }
        );

        const id = newUser[0]._id

        const newAdmin = new Admin({
            user: id,
            FullName: FullName,
            Address: Address,
            Department: Department,
            BirthDate: BirthDate,
            Avatar: Avatar,
            Gender: Gender
        });

        await newAdmin.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            new ApiResponse(201, null, "User Created Successfully")
        );
    }

    catch (err) {
        await session.abortTransaction();
        session.endSession();

        return next(new ApiError(500, "Registration failed: " + err.message));
    }
})

export const facultyRegister = asyncHandler(async (req, res, next) => {
    const { FirstName, LastName, Password, Email, ContactNumber, Role, Address, Course, BirthDate, Gender, Avatar, Subject } = req.body;
    const { Course: courseName } = req.body;

    if (![FirstName, LastName, Email, ContactNumber, Password, Role].every(field => typeof field === 'string' && field.trim().length > 0)) {
        return next(new ApiError(400, "All fields are required"));
    }

    console.log(Course)

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const exisitingUser = await User.findOne({ Email }).session(session);

        if (exisitingUser) {
            session.endSession();
            return res.status(409).json(new ApiResponse(409, null, "User already exists"));
        }

        const FullName = FirstName + " " + LastName;

        const newUser = await User.create(
            [
                {

                    FirstName: FirstName,
                    LastName: LastName,
                    Password: Password,
                    Email: Email,
                    ContactNumber: ContactNumber,
                    Role: Role
                },
            ],
            { session }
        );

        const id = newUser[0]._id

        const newFaculty = new Faculty({
            user: id,
            Address: Address,
            FullName: FullName,
            Course: courseName,
            BirthDate: BirthDate,
            Avatar: Avatar,
            Gender: Gender,
            Subject: Subject
        });

        await newFaculty.save({ session });

        const courseToUpdate = await Course.findOne({ Name: Course });

        if (courseToUpdate === null || courseToUpdate === undefined) {
            session.endSession();
            return next(new ApiError(404, "Course not found"));
        }

        courseToUpdate.Faculty.push(newFaculty._id);
        await courseToUpdate.save({ session })

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            new ApiResponse(201, null, "User Created Successfully")
        );
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return next(new ApiError(500, "Registration failed: " + err.message));
    }
});

export const courseRegister = asyncHandler(async (req, res, next) => {
    const { name, code, subjects, description, duration } = req.body


    console.log(name)

    try {
        if (![name, code, description, duration].every(field => typeof field === 'string' && field.trim().length > 0)) {
            next(new ApiError(400, "All fields are required"))
            return;
        }

        const newCourse = await Course.create(
            {
                Name: name,
                Code: code,
                Subjects: subjects,
                Description: description,
                Duration: duration,
            }
        );
        console.log(newCourse)

        const savedCourse = await newCourse.save()

        res.status(201).json(
            new ApiResponse(201, { savedCourse }, "Course Created Successfully")
        );

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Registration failed"));
    }

});

export const signOut =  asyncHandler(async (req, res, next) => {
    res.clearCookie('accessToken', 'refreshToken').status(200).json('Signout success!');
});
