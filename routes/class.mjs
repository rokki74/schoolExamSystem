import express from 'express';
import {addClassController, getClassController } from '../controllers/class.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addClassController);
router.get('/', getClassController);

export default router;
