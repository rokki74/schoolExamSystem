import express from 'express';
import {addExamController, getExamController } from '../controllers/exam.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addExamController);
router.get('/', getExamController);

export default router;
