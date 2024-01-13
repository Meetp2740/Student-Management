import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Code: {
    type: String,
    required: true,
    unique: true,
  },
  Description: {
    type: String,
  },
  Duration: {
    type: String,
  },
  Faculty: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty', // Reference to the Faculty model
  }],
  StudentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
  }],
  Subjects: [{
    type: String,
    required: true
  }]
});

export const Course = mongoose.model('Course', courseSchema);
