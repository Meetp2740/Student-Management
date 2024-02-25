import express from 'express';
import { StudentData, courseData, facultyData } from '../controllers/admin.controller.js';
import { verify } from '../middlewares/Auth.middlewares.js';
import { Role } from '../middlewares/checkRole.middlerwares.js';
import { count } from '../controllers/admin.controller.js';

const router = new express.Router();

router.get('/dashboard/faculty',verify, Role('management'), facultyData)
router.get('/dashboard/state', verify, Role('management'),  count)
router.get('/dashboard/course', verify, Role('management'), courseData)
router.get('/dashboard/students', verify,  StudentData)


export default router;