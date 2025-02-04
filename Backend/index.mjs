import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser'; // Assuming you're still using body-parser
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import studentRouter from './routes/student.mjs'; // Assuming your student routes are in a separate file
import classRouter from './routes/class.mjs';
import teacherRouter from './routes/teacher.mjs';
import adminRouter from './routes/admin.mjs';
import subjectRouter from './routes/subject.mjs';
import examRouter from './routes/exam.mjs';
import resultRouter from './routes/result.mjs';
import classTeacherRouter from './routes/classTeacher.mjs';
import classStudentRouter from './routes/classStudents.mjs';
import sendingAdminMessagesRouter from './routes/admin.mjs';
import logoutRouter from './routes/logout.mjs';
import { authenticate } from './auth/auth.mjs';
import cookieParser from 'cookie-parser'; // For parsing cookies
import csrf from 'csurf';


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());  For parsing JSON request bodies
app.use(cookieParser()); 
const csrfProtection = csrf({ cookie: true }); // CSRF protection
// Apply CSRF protection to all routes (or specific routes as needed)
//app.use(csrfProtection);


// Mount the student router to handle student-related API endpoints
app.use('/api/students', studentRouter);
app.use('/api/classes', classRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/admin', adminRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/exams', examRouter);
app.use('/api/results', resultRouter);
app.use('/api/classTeachers', classTeacherRouter);
app.use('/api/classList', classStudentRouter);
app.use('/api/admin/dashboard/messages', sendingAdminMessagesRouter);
app.use('/api/logout', logoutRouter);



// Example protected route
app.get('/api/protected', authenticate, (request, response) => {
    response.json({ message: 'Protected resource accessed', user: request.user});
});


app.listen(PORT, () => {
console.log(`The sch app is running on port ${PORT}`);
});

// const secret_key = generateRandomSecretKey();
// console.log(secret_key);