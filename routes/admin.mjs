import express from 'express';
import {addAdminController, getAdminController } from '../controllers/admin.mjs';

const router = express.Router();

//Route to post to classes
router.post('/', addAdminController);
router.get('/', getAdminController);

export default router;
