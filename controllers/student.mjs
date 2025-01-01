import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addStudentController = async (req, res) => {
try {
    const { admission_number, name, class_name } = req.body;

   // check if class_id exists?
    const classSql = "SELECT * FROM classes WHERE class_name=?";
    const classParams = class_name;
    const [classExists] = await dbConnectionLogic(classSql, classParams);

    const stream = class_name;

    console.log("class_id: ", classExists.class_id);

    const sql = "INSERT INTO students(admission_number,name,class_id, stream) VALUES(?, ?, ?, ?)";
    const params = [admission_number, name, classExists.class_id, stream];

    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0) {
        console.log(`Student inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Student registered successfully" });
    } else {
      throw new Error('Failed to insert student'); // Handle the case where no student was inserted
    }
} catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getStudentController = async (req, res) =>{

    try{
    const sql = "SELECT * FROM students";

    const results = await dbLogicTwo(sql);
    console.log(results);

    if(results.length > 0){
        res.json(results);
    }else{
        throw new Error('Failed to fetch students from database as records may not exist');
    }
}catch(error){
    console.error(error);
    return res.status(500).send(error.message);
}
}

export { addStudentController, getStudentController}; // Export the addStudent function for use in the routes