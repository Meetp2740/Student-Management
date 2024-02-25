import express from 'express';
import  {adminRegister, courseRegister, facultyRegister, signOut, studentRegister, userLogin}  from '../controllers/user.controller.js';

const router = new express.Router();

router.post('/login', userLogin)
router.post('/student/register', studentRegister)
router.post('/faculty/register', facultyRegister)
router.post('/admin/register', adminRegister)
router.post('/course/register', courseRegister)
router.get('/signout' , signOut)

export default router;