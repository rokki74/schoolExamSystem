import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; // Assuming your database connection logic is in a separate file
import {hash, compare} from 'bcrypt';
import comparePasswords from '../auth/comparePasswords.mjs';
import jwt from 'jsonwebtoken';
import { generateRandomSecretKey } from '../auth/crypto.mjs';
import cookieParser from 'cookie-parser'; 

const loginAdminController = async(req, res) =>{
    try{
        const {email, password} = req.body;
        console.log("Received email: ",email, "Password: ", password);

        const identifyAdminSql = "SELECT * FROM admin WHERE email=?";
        const identifyAdminParams = [email];
        const admin = await dbConnectionLogic(identifyAdminSql, identifyAdminParams);
            
            if(admin.length>0){
                console.log(admin[0]);
                console.log(admin[0].password);
                try{
                    const isPasswordValid = await comparePasswords( password, admin[0].password);
            
                    if (isPasswordValid) {
                      // Generate JWT or create session
                    const userId = admin[0].id; // Extract the ID from the first admin object
                    
                    let secret_key = generateRandomSecretKey();
                    
                    const token = jwt.sign({ userId}, secret_key, { expiresIn: '1h' }); 
                    console.log("The jwt token is: ", token);
                    
                    res.cookie('jwt', token, { 
                        httpOnly: true, 
                        secure: false, // Use HTTPS in production
                        sameSite: 'strict' // For enhanced security
                        });

                    //res.status(200).json({ token: token, message: "Login successful, you're good to go!" }); 
                
                    } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                    }
                }catch(error){
                    console.error(error);
                }
            }else{
                res.status(401).send("Your email or password is incorrect, you're unauthorised!");
                console.log("No such records for admin found");
            }

    }catch(error){
        console.error(error);
        return res.status(500).send(error.message);
    }
}

const addAdminController = async (req, res) => {
try {
    const { name, phonenumber, email, class_name, subject_name, password } = req.body;
    
    console.log("Received details: ", name, email, phonenumber, class_name, subject_name);

        try{
            const hashedPassword = await hash(password, 10);
            console.log(hashedPassword);
            if(hashedPassword){
            console.log("password hashed successfully!");
            
            try{  

                console.log(name,phonenumber, email, class_name, subject_name, hashedPassword);
                const classSql = "SELECT * FROM classes WHERE class_name=?";
                const classParams = class_name;
                const [classExists] = await dbConnectionLogic(classSql, classParams);
                
               //check if subject exists
                const subjectSql = "SELECT * FROM subjects WHERE subject_name=?";
                const subjectParams = subject_name;
                const [subjectExists] = await dbConnectionLogic(subjectSql, subjectParams);
                console.log("SubjectId: ",subjectExists.subject_id);
                console.log("class_id: ", classExists.class_id);
            
                const sql = "INSERT INTO admin(name, phonenumber, email, class_id, subject_id, password) VALUES(?, ?, ?, ?, ?, ?)";
                const params = [name, phonenumber, email, classExists.class_id, subjectExists.subject_id, hashedPassword];
            
                const results = await dbConnectionLogic(sql, params);
                
                if (results.affectedRows > 0) {
                    console.log(`Admin inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
                    res.json({ message: "Admin registered successfully" });
                } else {
                  throw new Error('Failed to insert the admin'); // Handle the case where no teacher was inserted
                }
            }
            catch(error){
                console.error(error);
            }

        }else{
                console.log("Sorry but we couldn't hash your password");
            }
        }catch(error){
            console.error(error);
        }

} catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
}
};

const getAdminController = async(req, res)=>{

    try{
    const sql = "SELECT * FROM admin";

    const results = await dbLogicTwo(sql);

    if(results.length > 0){
        
        res.json(results);
    }
}catch(error){
    console.error(error);
    res.status(500).send(error.message);
}
}

export { addAdminController, getAdminController, loginAdminController}; // Export the addTeacherController function for use in the routes