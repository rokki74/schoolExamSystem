import express from 'express';
import {addClassTeacherController, getClassTeacherController } from '../controllers/classTeacher.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addClassTeacherController);
router.get('/',authenticate, getClassTeacherController);

export default router;
