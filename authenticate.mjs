import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'; 
import {hash, compare} from 'bcrypt';
//import bodyParser from 'body-parser';


    const server = express();

    let fakeDB = [
        {   id: 0,
            email: 'me@chatfast.com',
            password: '$2b$10$m5GVrYxzI2kb5Hyzmlkz8Oi.PGU2.ta2244QqhLxK5wPSSnCzKzsa'
        }
    ];

// Define PORT
const PORT = process.env.PORT; 

// Use express middleware
server.use(cookieParser()); 
server.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

//server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/register', async(request, response)=>{
    //const email = request.query.email;
    //const password = request.query.password;
    const{email, password, location, age} = request.query;

    console.log(`Email: ${email}, Password: ${password}, Location: ${location}, Age: ${age}`);

    console.log(password, email);

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

});

server.post('/login', async (request, response)=>{
    const {email, password} = request.query;

    try{
        const user = fakeDB.find(user=> user.email === email);

        if(!user){
            throw new Error("User does not exist")
        }else{
            console.log("That user email is correct");
        }

        const valid = await compare(password, user.password);

        if(!valid){
            throw new Error("Password not correct")
        }else{
            console.log("And yes the password is also correct");
        }

        //jwt 
        const createAccessToken = (userId) =>{
            return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
                expireIn: '15m',
            });
        };
        const createRefreshToken = (userId) =>{
            return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
                expireIn: '7d',
            });
        };

        //refresh and access tokens
        const accesstoken = createAccessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);
        //put the refresh token in the database
        user.refreshtoken = refreshtoken;
        console.log(fakeDB);
        //send token. refreshtoken as a cookie and accesstoken as a reguar response

        const sendAccessToken = (response, request, accesstoken)=>{

        }
    }catch(error){
        console.error(error);
    }
})

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});


