import express from 'express';
import {addTeacherController, getTeacherController } from '../controllers/teacher.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addTeacherController);
router.get('/', getTeacherController);

export default router;
