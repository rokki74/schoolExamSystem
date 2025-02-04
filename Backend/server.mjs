import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';
import pRetry from 'p-retry';

const app=express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());

    //Start of my dbConnectionLogic function that's still at test
async function dbConnectionLogic(query, params) {
    // The pool configuration nested inside it
    const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'rokki74',
    password: 'rokki74',
    database: 'library-simplified',
    waitForConnections: true,
    connectionLimit: 10, // Limit to 10 simultaneous connections
    queueLimit: 0 // No queueing, reject additional connections
});

    try {
        const [rows] = await pRetry(async () => {
        return await dbPool.query(query, params);
        }, {
        retries: 5,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000
        });

        return rows;
    } catch (error) {
        console.error('Error querying database:', error);
         throw error; // Re-throw the error to be handled by the calling function
    } finally {
      dbPool.end(); // Close the pool to release resources
    }
}//End of my dbConnectonLogic function that's still at test!


//The GET REQUESTS.....

//Endpoint to get users
app.get('/api/users', async (request,response)=>{
    const sql = "SELECT * FROM users";
    try{
        const results = await dbConnectionLogic(sql);
        console.log(results);
        response.json(results);
        //console.log("Url: ",request.url,"Method: ",request.method);
        //console.log(results);

    }catch(error){
        return response.status(500).send(error);
    }
});

//Endpoint to get user according to username
app.get('/api/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase();
    console.log("The username searched for is: ", username);

    try {
        const userSearchSql = "SELECT * FROM users WHERE username = ?";
        const result = await dbConnectionLogic(userSearchSql, [username]);

        if (result && result.length > 0) {
            console.log("The user's email is: ", result[0].email)
        res.json(result[0]);
        } else {
        res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});


//The POST REQUESTS.....


//Endpoint to post users
app.post('/api/users', async(req,res)=>{
    const {username, name, password, email} = req.body;

    const sql="INSERT INTO users(username,name,password,email) VALUES(?, ?, ?, ?)";
    const params = [username, name, password, email];
    const userExistsSql = "SELECT * FROM users WHERE username=?"
    try{
    const results = await dbConnectionLogic(sql,params);
    console.log(results);
    if(results.affectedRows>0 && results.insertId>0) {
        console.log(`userId inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
    }
    res.json({message:"User registered successfully"});
    }
    catch(error){
        console.error(error);
        const messageText = "Couldn't register user!";
        return res.status(500).send(error.message);
    }
});

app.post('/api/users', async(req,res)=>{
    const {username, name, password, email} = req.body;

    const sql="INSERT INTO users(username,name,password,email) VALUES(?, ?, ?, ?)";
    const params = [username, name, password, email];
    const userExistsSql = "SELECT * FROM users WHERE username=?"
    try{
    const results = await dbConnectionLogic(sql,params);
    console.log(results);
    if(results.affectedRows>0 && results.insertId>0) {
        console.log(`userId inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`);
    }
    res.json({message:"User registered successfully"});
    }
    catch(error){
        console.error(error);
        const messageText = "Couldn't register user!";
        return res.status(500).send(error.message);
    }
});


//Run the server
app.listen(PORT, ()=>{
    console.log(`The server for hotel-app is running on port ${PORT}`);
});
