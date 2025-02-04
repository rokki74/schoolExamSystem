import express from 'express';
import {addStudentController, getStudentController, getStudentByAdmnoController} from '../controllers/student.mjs'; // Path to your student controller
import { authenticate } from '../auth/auth.mjs';


const router = express.Router();

// Route handler for adding students (POST /api/students)
router.post('/',authenticate, addStudentController); // Assuming 'addStudent' is a function in your controller
router.get('/',authenticate, getStudentController);
router.get('/:admission_number',authenticate, getStudentByAdmnoController);

export default router;
