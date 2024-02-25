import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import { Course } from "../models/course.model.js";

export const facultyData = asyncHandler(async (req, res, next) => {

    try {
        const Facultydata = await Faculty.find().populate('user')
        console.log("waiting")
        console.log(Facultydata)
        res.status(201).json(new ApiResponse(200, Facultydata, "Data Successfully Fetched"))
        console.log("hello")
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, error));
    }
})

export const count = asyncHandler(async (req, res, next) => {

    try {
        const totalStudents = await Student.countDocuments();
        const totalFaculty = await Faculty.countDocuments();
        const totalAdmin = await Admin.countDocuments();

        res.status(201).json(new ApiResponse(200, { totalStudents, totalFaculty, totalAdmin }, "Data Successfully Fetched"))
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

export const courseData = asyncHandler(async (req, res, next) => {
    try {
        const courseData = await Course.find().select("-Faculty, -StudentsEnrolled")

        res.status(201).json(new ApiResponse(200, { courseData }, "Data Successfully Fetched"))
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

export const StudentData = asyncHandler(async (req, res, next) => {
    try {
        // Define filters
        const filters = {};
        console.log(req.query)
        
        // Gender filter
        if (req.query.gender) {
            filters.Gender = req.query.gender;
        }

        const totalStudents = await Student.countDocuments();

        // Semester filter
        if (req.query.semester) {
            filters.Semester = req.query.semester;
        }

        // Course filter
        if (req.query.course) {
            filters.Course = req.query.course;
        }

        if (req.query.name) {
            filters.FullName = { $regex : req.query.name, $options : "i" }
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Sorting
        const sort = {};
        if (req.query.sortBy) {
            sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        // Fetch data with filters, sorting, and pagination
        const studentsData = await Student.find(filters)
            .populate("user")
            .sort(sort)
            .skip(skip)
            .limit(limit);

            console.log(filters)

        res.status(200).json(new ApiResponse(200, { studentsData, totalStudents }, "Data Successfully Fetched"));
    } catch (error) {
        // Handle errors
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});