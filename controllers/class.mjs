import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file

const addClassController = async (req, res) => {
try {
    const { class_name, stream } = req.body;

    const classSql = "SELECT class_name FROM classes WHERE class_name=?";
    const classParams = class_name;
    const classExists = await dbConnectionLogic(classSql, classParams);
    
    if(classExists.length > 0){
          console.log("There's another class with such a name");
          return res.json({error: "There's another class with the same name"});
    }else{   
      
    const sql = "INSERT INTO classes(class_name, stream) VALUES(?, ?)";
    const params = [class_name, stream];
    const results = await dbConnectionLogic(sql, params);
    
    if (results.affectedRows > 0) {
        console.log(`Class successfully inserted, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
        res.json({ message: "Class registered successfully" });
    } else {
      throw new Error('Failed to insert the class'); // Handle the case where no student was inserted
    }
    }
  }catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getClassController = async(req, res)=>{
  
  try{

    const sql = "SELECT * FROM classes";
    const results = await dbLogicTwo(sql);
    if(results.length>0){
      res.json(results);
  }else{
    res.json({error: "we couldn't find such records"});
  }
}catch(error){
  console.error(error);
  res.status(500).send(error.message);
}
}

export {addClassController, getClassController}; // Export the addStudent function for use in the routes