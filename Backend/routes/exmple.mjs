// router.get('/', async (req, res) => {
//   try {
//     const students = await studentModel.getAllStudents();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch students' });
//   }
// });

// router.get('/:admissionNumber', async (req, res) => {
//   try {
//     const student = await studentModel.getStudentByAdmissionNumber(req.params.admissionNumber);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch student' });
//   }
// });