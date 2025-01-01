import express from 'express';
import {addSubjectController, getSubjectController } from '../controllers/subject.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addSubjectController);
router.get('/', getSubjectController)

export default router;
