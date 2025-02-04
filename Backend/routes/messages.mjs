import express from 'express';
import { sendingMessagesController } from '../controllers/messages.mjs';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

router.post('/sending',authenticate, sendingMessagesController);


export default router;