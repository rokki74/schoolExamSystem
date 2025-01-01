import express from 'express';
import {addClassTeacherController, getClassTeacherController } from '../controllers/classTeacher.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addClassTeacherController);
router.get('/', getClassTeacherController);
export default router;
