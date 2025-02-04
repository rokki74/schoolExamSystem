import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addClassTeacherController = async (req, res) => {
try {
    const { name, phonenumber, email, class_name,subject_name, password } = req.body;
    
        try{
            const hashedPassword = await hash(password, 10);
            console.log(hashedPassword);
            if(hashedPassword){
            console.log("password hashed successfully!");
            }else{
                console.log("Sorry but we couldn't hash your password");
            }
        }catch(error){
            console.error(error);
        }
    const classSql = "SELECT * FROM classes WHERE class_name=?";
    const classParams = class_name;
    const [classExists] = await dbConnectionLogic(classSql, classParams);
    
       //check if subject exists
        const subjectSql = "SELECT * FROM subjects WHERE subject_name=?";
        const subjectParams = subject_name;
        const [subjectExists] = await dbConnectionLogic(subjectSql, subjectParams);
        console.log("SubjectId: ",subjectExists.subject_id);
        console.log("class_id: ", classExists.class_id);

        const sql = "INSERT INTO class_teachers(name, phonenumber, email, class_id, subject_id, password) VALUES(?, ?, ?, ?, ?, ?)";
        const params = [name, phonenumber, email, classExists.class_id, subjectExists.subject_id, hashedPassword];

    // const sql = "INSERT INTO class_teachers(name, phonenumber, email, class_id, password) VALUES(?, ?, ?, ?, ?)";
    // const params = [name, phonenumber, email, class_id, password];

    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0){
        console.log(`Class teacher inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Class teacher registered successfully" });
        }else{
      throw new Error('Failed to insert the class teacher'); // Handle the case where no teacher was inserted
    }
}catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getClassTeacherController = async(req,res)=>{
    try{
      const sql = "SELECT * FROM class_teachers";

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

export {addClassTeacherController, getClassTeacherController}; // Export the addTeacherController function for use in the routes