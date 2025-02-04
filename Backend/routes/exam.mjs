import express from 'express';
import {addExamController, getExamController } from '../controllers/exam.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addExamController);
router.get('/',authenticate, getExamController);

export default router;
