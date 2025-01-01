import mysql from 'mysql2/promise';
import pRetry from 'p-retry';

async function dbConnectionLogic(query, params){
  // The pool configuration nested inside it
  const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'rokki74',
  password: 'rokki74',
  database: 'school2',
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
      
      console.log("Connected to the database succesfully!");
      return rows;
  } catch (error) {
      console.error('Error querying database:', error);
       throw error; // Re-throw the error to be handled by the calling function
  } finally {
      dbPool.end(); // Close the pool to release resources
  }
}//End of my dbConnectonLogic function that's still at test!


async function dbLogicTwo(query){
  // The pool configuration nested inside it
  const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'rokki74',
  password: 'rokki74',
  database: 'school2',
  waitForConnections: true,
  connectionLimit: 10, // Limit to 10 simultaneous connections
  queueLimit: 0 // No queueing, reject additional connections
});

  try {
      const [rows] = await pRetry(async () => {
      return await dbPool.query(query);
      }, {
      retries: 5,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000
      });
      
      console.log("Connected to the database successfully!");
      return rows;
  } catch (error) {
      console.error('Error querying database:', error);
       throw error; // Re-throw the error to be handled by the calling function
  } finally {
      dbPool.end(); // Close the pool to release resources
  }
}//End of my dbConnectonLogic2 function that's still at test!


export  {dbConnectionLogic, dbLogicTwo};