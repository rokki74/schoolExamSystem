import jwt from 'jsonwebtoken';
import 'dotenv/config';

const access_secret_key = process.env.ACCESS_TOKEN_SECRET;
const refresh_secret_key = process.env.REFRESH_TOKEN_SECRET;

const createAccessToken = (user, secret_key) => {

    const expireTime = '10m';

    const token = jwt.sign({ user}, secret_key, { expiresIn: expireTime });

    return token;
}

const createRefreshToken = (userId, secret_key) => {

    const expireTime = '7d';

    const token = jwt.sign({ userId}, secret_key, { expiresIn: expireTime });

    return token;
}

const verifyToken = (request, response, next) =>{
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        request.token =bearerToken;
        next();
    }else{
        response.sendStatus(403);
    }
}

//Authentication middlewware for protected routes
const authenticate = (request, response, next) => {
  const token = request.cookies.auth_token;

  if (!token) {
    return response.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // Use env variable
    if (err) {
      return response.status(403).json({ message: 'Invalid token' });
    }
    request.tokenuser = decoded;
    next();
  });
};

const adminRoleGuard = (request, response, next) =>{
  const userRole = request.tokenuser.user.role;
  console.log("userRole is: ",userRole, "tokenuser: ", request.tokenuser.user);

  if(userRole === 'admin'){
    next();
  }
  else{
    return response.status(401).json({message: `Your role is ${userRole}, only admin role are allowed, try logging in as admin`});
  }

}

export {createAccessToken, createRefreshToken, verifyToken, authenticate, adminRoleGuard};



