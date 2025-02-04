import express from 'express';
import {addAdminController, getAdminController, loginAdminController } from '../controllers/admin.mjs';
import { verifyToken } from '../auth/auth.mjs';
import 'dotenv/config';
import { authenticate, adminRoleGuard } from '../auth/auth.mjs';
import { sendingMessagesController } from '../controllers/messages.mjs';

const router = express.Router();

//custom authenticate and adminroleguard middlewares enhance authentication 
//Route to post to admin
router.post('/register',authenticate, adminRoleGuard, addAdminController);
router.get('/',authenticate, adminRoleGuard, getAdminController);
router.post('/login', loginAdminController);
router.post('/sending', authenticate, sendingMessagesController);

export default router;
