import { dbConnectionLogic } from "../config/database.mjs";
import axios from 'axios';
import {check, validationResult} from 'express-validator';

const getStudentsByClassController = async(request,response)=>{
    try{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }else{

        const className = (request.params.class_name).toLowerCase().toString();
        console.log(className);

        if(isNaN(className)){
            const classExistsSql = "SELECT * FROM classes WHERE class_name=?";
            const classParams = className;

            try{
            const [classExists] = await dbConnectionLogic(classExistsSql, classParams);
            console.log("classExists obj: ",classExists);

                if(classExists){
                    const sql = "SELECT * FROM students WHERE class_id=?";

                    const results = await dbConnectionLogic(sql, classExists.class_id);
                        if(results.length>0){
                            console.log(results);
                            response.json(results);
                        }else{
                            response.json({msg: "That class name might not exist"});
                        }
                }else{
                    console.error("Hey good developer, that class id doesn't exist try another class name");
                }

            }catch(error){
                console.error("Error finding if class exists: ", error);
            }
        }else{
            response.json({msg: "Bad request, Invalid name for the class"});
        }
    }

    }catch(error){
        console.error(error);
    }
}

const getClassListsController = async(request,response)=>{

    const result = await axios.get('http://localhost:5174/api/classes');
    console.log("classList result: ",result.data);
    response.json(result.data);
    }

export {getStudentsByClassController, getClassListsController};