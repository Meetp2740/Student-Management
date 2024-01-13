import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  Address: {
    type: String
  },
  BirthDate: {
    type: String
  },
  FullName: {
    type: String,
  },
  Gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: "please select correct Gender",
  },
  },
  Avatar: {
    type: String
  },
  Department: {
    type: String,
    enum: {
      values: ['adminstitation', 'Principal'],
      message: "please select correct Department",
  },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

export const Admin = mongoose.model('Admin', adminSchema);

