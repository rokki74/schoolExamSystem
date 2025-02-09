import express from 'express';
import {addStudentController, getStudentController, getStudentByAdmnoController} from '../controllers/student.mjs'; // Path to your student controller

const router = express.Router();

// Route handler for adding students (POST /api/students)
router.post('/', addStudentController); // Assuming 'addStudent' is a function in your controller
router.get('/', getStudentController);
router.get('/:admission_number', getStudentByAdmnoController);

export default router;
