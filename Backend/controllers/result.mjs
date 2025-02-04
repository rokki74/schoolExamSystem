import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addResultController = async (req, res) => {
try {
    const { exam_name, subject_name, admission_number, marks} = req.body;

    //admission number exists?
    const admNoSql = "SELECT * FROM students WHERE admission_number=?";
    const admNoParams = admission_number;
    const [admNoExists] = await dbConnectionLogic(admNoSql, admNoParams);
    
    console.log("mwanafunzi huyu ako class ya: ", admNoExists.class_id);
    // check if exam_id exists?
    const examSql = "SELECT * FROM exams WHERE exam_name=?";
    const examParams = exam_name;
    const [examExists] = await dbConnectionLogic(examSql, examParams);
    
    //check if subject exists
    const subjectSql = "SELECT * FROM subjects WHERE subject_name=?";
    const subjectParams = subject_name;
    const [subjectExists] = await dbConnectionLogic(subjectSql, subjectParams);
        console.log("ExamId: ",examExists.exam_id);
        console.log("SubjectId: ",subjectExists.subject_id);
        
    const teacherIdSql = "SELECT teacher_id FROM teachers WHERE subject_id=?";
    
    const [teacherId] = await dbConnectionLogic(teacherIdSql, subjectExists.subject_id);
    console.log(teacherId);
    console.log("Teacher id: ",teacherId.teacher_id);

    // Check for existing result to avoid duplication of records in results table
        const checkExistingRecordSql = `SELECT COUNT(*) AS count FROM results WHERE exam_id = ? AND subject_id = ? AND admission_number = ?`;
        const existingRecordParams = [examExists.exam_id, subjectExists.subject_id, admission_number];
        const existingRecordCount = await dbConnectionLogic(checkExistingRecordSql, existingRecordParams);

    if (existingRecordCount[0].count > 0) {
    return res.status(400).json({ error: "Result for this student, subject, and exam already exists." });
    }   
        
    const sql = "INSERT INTO results(exam_id,teacher_id, subject_id, admission_number,class_id, marks) VALUES(?, ?, ?, ?, ?, ?)";
    const params = [examExists.exam_id, teacherId.teacher_id, subjectExists.subject_id, admNoExists.admission_number,admNoExists.class_id, marks];
    const results = await dbConnectionLogic(sql, params);

        if (results.affectedRows > 0) {
                    console.log(`results successfully inserted, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
                    res.json({ message: "results registered successfully" });
                } else {
                  throw new Error('Failed to insert the results'); // Handle the case where no student was inserted
                }
        }
catch (error) {
    console.error(error);
    return res.status(500).json({error: "A server or network error occurred, Ensure you are using the correct format for your entries or that they really exist in the database as such!"});
}
};

const getResultsController = async(req,res)=>{
    try{
      const sql = "SELECT * FROM results";

        const results = await dbLogicTwo(sql);

        if(results.length>0){
        console.log("Results successfully fetched!");
        console.log(results);
        res.json(results);
        }else{
        res.status(404).send("No records found");
        }
    }catch(error){
        console.error(error);
        res.send(error.message);
    }
}

export {addResultController, getResultsController}; // Export the addStudent function for use in the routesS