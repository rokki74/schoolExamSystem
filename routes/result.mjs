import express from 'express';
import {addResultController, getResultsController } from '../controllers/result.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addResultController);
router.get('/', getResultsController);

export default router;
