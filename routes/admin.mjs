import express from 'express';
import {addAdminController, getAdminController, loginAdminController } from '../controllers/admin.mjs';

const router = express.Router();

//Route to post to admin
router.post('/register', addAdminController);
router.get('/', getAdminController);
router.post('/login', loginAdminController);

export default router;
