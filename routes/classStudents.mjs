import express from 'express';
import {getStudentsByClassController, getClassListsController} from '../controllers/classStudents.mjs';
import {check, validationResult} from 'express-validator';

const router = express.Router();

// Route handler for  getting students of a class (get /api/students)
router.get('/:class_name',[check('class_name').isString()], getStudentsByClassController);
router.get('/', getClassListsController);

export default router;