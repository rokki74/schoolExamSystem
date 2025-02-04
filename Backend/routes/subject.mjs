import express from 'express';
import {addSubjectController, getSubjectController } from '../controllers/subject.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addSubjectController);
router.get('/',authenticate, getSubjectController)

export default router;
