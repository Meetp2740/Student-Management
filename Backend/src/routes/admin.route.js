import express from 'express';
import { StudentData, courseData, facultyData } from '../controllers/admin.controller.js';
import { verify } from '../middlewares/Auth.middlewares.js';
import { Role } from '../middlewares/checkRole.middlerwares.js';
import { count } from '../controllers/admin.controller.js';

const router = new express.Router();

router.get('/dashboard/faculty', facultyData)
router.get('/dashboard/state', count)
router.get('/dashboard/course', courseData)
router.get('/dashboard/students', StudentData)


export default router;