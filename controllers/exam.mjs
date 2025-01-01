import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addExamController = async (req, res) => {
try {
    const {exam_name} = req.body;

    const sql = "INSERT INTO exams(exam_name) VALUES(?)";
    const params = [exam_name];
    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0) {
        console.log(`Exam successfully inserted, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Exam registered successfully" });
    } else {
      throw new Error('Failed to insert the exam'); // Handle the case where no student was inserted
    }
    }
catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getExamController = async(req,res)=>{
    try{
      const sql = "SELECT * FROM exams";

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

export {addExamController, getExamController}; // Export the addStudent function for use in the routes