import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addSubjectController = async (req, res) => {
try {
    const { subject_name, subject_code, subject_category} = req.body;
    
    console.log(subject_name, subject_code, subject_category);

    const sql = "INSERT INTO subjects(subject_name, subject_code, subject_category) VALUES(?, ?, ?)";
    const params = [subject_name, subject_code, subject_category];
    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0) {
        console.log(`Subject successfully inserted, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Subject registered successfully" });
    } else {
      throw new Error('Failed to insert the subject'); // Handle the case where no student was inserted
    }
    }
catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getSubjectController = async(req,res)=>{
    try{
      const sql = "SELECT * FROM subjects";

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

export {addSubjectController, getSubjectController}; // Export the addStudent function for use in the routes