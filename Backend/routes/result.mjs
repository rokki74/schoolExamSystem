import express from 'express';
import {addResultController, getResultsController } from '../controllers/result.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

//Route to post to classes
router.post('/',authenticate, addResultController);
router.get('/',authenticate, getResultsController);

export default router;
