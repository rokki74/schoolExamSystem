import { dbConnectionLogic, dbLogicTwo } from "../config/database.mjs";
import { hash, compare } from "bcrypt";
import comparePasswords from "../auth/comparePasswords.mjs";
import { generateRandomSecretKey } from "../auth/crypto.mjs";
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "../auth/auth.mjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const access_secret_key = process.env.ACCESS_TOKEN_SECRET;
const refresh_secret_key = process.env.REFRESH_TOKEN_SECRET;

const loginAdminController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const admin = await dbConnectionLogic("SELECT * FROM admin WHERE email=?", [
      email,
    ]);
    console.log(admin);

    if (!admin || admin.length === 0) {
      response.status(404).json({
        message: "Please check that your credentials match our databases",
      });
    } else {
      console.log(admin[0]);

      const isPasswordValid = await comparePasswords(
        password,
        admin[0].password
      );
      try {
        if (isPasswordValid) {
          // Generate JWT or create session
          const userId = admin[0].id; // Extract the ID from the first admin object
          const adminUser = admin[0].name;
          const userImage = admin[0].image;
          const userName = admin[0].name;
          const emailAddress = admin[0].email;
          const phoneNumber = admin[0].phonenumber;

          const userData = {
            id: userId,
            name: userName,
            email: emailAddress,
            phone: phoneNumber,
          };

          //create accessToken
          const accessToken = createAccessToken(userData, access_secret_key);
          const refreshToken = createRefreshToken(userData, refresh_secret_key);
          console.log("AccessToken: ", accessToken);
          console.log("RefreshToken: ", refreshToken);
          const token = accessToken;
          console.log("The jwt access token is: ", token);

          console.log(
            `user:${userData}`,
            `role: ${userData}`,
            `token: ${token}`
          );
          console.log(
            `user:${userData}`,
            `role: ${userData}`,
            `token: ${token}`
          );

          // 3. Set HTTP-only cookie

          return response
            .cookie("auth_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // Use HTTPS in production
              sameSite: "Strict", // Or 'lax' if needed
              maxAge: 3600000, // 1 hour
            })
            .status(200)
            .json({ message: "Login successful, details: ", userData });
        }
        if (!isPasswordValid)
          return response.json({
            message: "Your credentials are invalid, try again!",
          });
      } catch (error) {
        response.status(500).json({ message: "Error processing your request" });
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
    return response.status(500).send(error.message);
  }
};

const addAdminController = async (request, response) => {
  try {
    const { name, phonenumber, email, class_name, subject_name, password } =
      request.body;

    console.log(
      "Received details: ",
      name,
      email,
      phonenumber,
      class_name,
      subject_name
    );

    try {
      const hashedPassword = await hash(password, 10);
      console.log(hashedPassword);
      if (hashedPassword) {
        console.log("password hashed successfully!");

        try {
          console.log(
            name,
            phonenumber,
            email,
            class_name,
            subject_name,
            hashedPassword
          );
          const classSql = "SELECT * FROM classes WHERE class_name=?";
          const classParams = class_name;
          const [classExists] = await dbConnectionLogic(classSql, classParams);

          //check if subject exists
          const subjectSql = "SELECT * FROM subjects WHERE subject_name=?";
          const subjectParams = subject_name;
          const [subjectExists] = await dbConnectionLogic(
            subjectSql,
            subjectParams
          );
          console.log("SubjectId: ", subjectExists.subject_id);
          console.log("class_id: ", classExists.class_id);

          const sql =
            "INSERT INTO admin(name, phonenumber, email, class_id, subject_id, password) VALUES(?, ?, ?, ?, ?, ?)";
          const params = [
            name,
            phonenumber,
            email,
            classExists.class_id,
            subjectExists.subject_id,
            hashedPassword,
          ];

          const results = await dbConnectionLogic(sql, params);

          if (results.affectedRows > 0) {
            console.log(
              `Admin inserted successfully, insertId: ${results.insertId}, affectedRows: ${results.affectedRows}`
            );
            response.json({
              message: "Admin registered successfully",
              authData: request.user,
            });
          } else {
            throw new Error("Failed to insert the admin"); // Handle the case where no teacher was inserted
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Sorry but we couldn't hash your password");
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).send(error.message);
  }
};

const getAdminController = async (request, response) => {
  try {
    const sql = "SELECT * FROM admin";

    const results = await dbLogicTwo(sql);

    if (results.length > 0) {
      response.json(results);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send(error.message);
  }
};

export { addAdminController, getAdminController, loginAdminController }; // Export the addTeacherController function for use in the routes
