import express from 'express';
import {addClassController, getClassController } from '../controllers/class.mjs';
import { authenticate } from '../auth/auth.mjs';

const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addClassController);
router.get('/',authenticate, getClassController);

export default router;
