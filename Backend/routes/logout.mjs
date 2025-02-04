import express from 'express';
import { logoutController } from '../controllers/logout.mjs';


const router = express.Router();

//Route to post to admin
router.post('/', logoutController);

export default router;