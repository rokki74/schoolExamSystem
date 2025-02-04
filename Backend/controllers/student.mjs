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
    const classIdSql = "SELECT class_id FROM students";
    const classId = await dbLogicTwo(classIdSql);

    //console.log("ClassId: ",classId);

    const results = await dbLogicTwo(sql);
    //console.log(results);

    if(results.length > 0){
        // try{
        //     const [students] = await dbLogicTwo(
        //         `SELECT s.*, c.class_name 
        //         FROM students s 
        //         JOIN classes c ON s.class_id = c.class_id`
        //     );
        //     console.log("Joined tables records: ",students);
        // }catch(error){
        //     console.error("Error trying to join the tables:", error);
        // }

        res.status(200).json(results);
    }else{
        throw new Error('Failed to fetch students from database or the records might not exist');
    }
}catch(error){
    console.error(error);
    return res.status(500).send(error.message);
}
}


const getStudentByAdmnoController = async(request, response) => {
    try{
    const parsedAdmno = parseInt(request.params.admission_number);
    console.log(parsedAdmno);

    if(isNaN(parsedAdmno)){
        return response.status(400).send({msg: "Bad Request. Invalid Id."});
    }else{
        const sql = "SELECT * FROM students WHERE admission_number=?";
        const admnoParams = parsedAdmno;

        const results = await dbConnectionLogic(sql, admnoParams);

        if(results.length>0){
            console.log(results);
            response.json(results);
        }else{
            console.log("A student by that admission number is not in our databases");
            response.json({msg: "A student by that admission number is not in our databases"});
        }   
    }
}catch(error){
    console.error(error);
}
}

export { addStudentController, getStudentController, getStudentByAdmnoController}; // Export the addStudent function for use in the routes