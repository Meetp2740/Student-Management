import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  Address: {
    type: String,
  },
  Course: {
    type: String,
    required: true,
  },
  FullName: {
    type: String,
  },
  Semester: {
    type: String,
    enum: {
      values: ['Sem-1', 'Sem-2', 'Sem-3', 'Sem-4', 'Sem-5', 'Sem-6'],
      message: "please select correct Semester",
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
  Avatar: {
    type: String,
  },
  Attendence: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

export const Student = mongoose.model('Student', studentSchema);

