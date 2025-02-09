import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addTeacherController = async (req, res) => {
try {
    const { name, phonenumber, email, class_name, subject_name, password } = req.body;
    console.log(name,phonenumber, email, class_name, subject_name);
    
  // check if class_id exists?
    const classSql = "SELECT * FROM classes WHERE class_name=?";
    const classParams = class_name;
    const [classExists] = await dbConnectionLogic(classSql, classParams);
    

    //check if subject exists
    const subjectSql = "SELECT * FROM subjects WHERE subject_name=?";
    const subjectParams = subject_name;
    const [subjectExists] = await dbConnectionLogic(subjectSql, subjectParams);
    console.log("SubjectId: ",subjectExists.subject_id);
    console.log("class_id: ", classExists.class_id);

    const sql = "INSERT INTO teachers(name, phonenumber, email, class_id, subject_id, password) VALUES(?, ?, ?, ?, ?, ?)";
    const params = [name, phonenumber, email, classExists.class_id, subjectExists.subject_id, password];

    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0) {
        console.log(`Teacher inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Teacher registered successfully" });
    } else {
      throw new Error('Failed to insert the teacher'); // Handle the case where no teacher was inserted
    }
} catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getTeacherController = async(req, res)=>{
  try{
    const sql = "SELECT * FROM teachers";
    
    const results = await dbLogicTwo(sql);

    if(results.length>0){
      res.json(results);
    }else{
      res.status(404).send("No records found");
    }
  }catch(error){
    console.error(error);
    res.send(error.message);
  }
}

export { addTeacherController, getTeacherController}; // Export the addTeacherController function for use in the routes