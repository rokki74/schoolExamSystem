import express from 'express';
import {addTeacherController, getTeacherController } from '../controllers/teacher.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addTeacherController);
router.get('/',authenticate, getTeacherController);

export default router;
