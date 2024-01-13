import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  Address: {
    type: String,
  },
  FullName: {
    type: String,
  },
  Program: {
    type: String,
    enum: {
      values: ['B.C.A', 'B.B.A', 'B.COM', 'B.S.W', 'M.COM'],
      message: "please select correct Program",
    },
  },
  BirthDate: {
    type: String,
  },
  Gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: "please select correct Gender",
  },
  },
  Subject: {
    type: String,
  },
  Avatar: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

export const Faculty = mongoose.model('Faculty', facultySchema);

