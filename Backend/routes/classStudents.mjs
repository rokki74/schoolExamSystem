import express from 'express';
import {getStudentsByClassController, getClassListsController} from '../controllers/classStudents.mjs';
import {check, validationResult} from 'express-validator';
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

// Route handler for  getting students of a class (get /api/students)
router.get('/:class_name',[check('class_name').isString()],authenticate, getStudentsByClassController);
router.get('/',authenticate, getClassListsController);

export default router;