
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

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(bodyParser.json()); // Assuming you're still using body-parser

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


app.listen(PORT, () => {
console.log(`The sch app is running on port ${PORT}`);
});