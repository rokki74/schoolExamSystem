import mysql from 'mysql2/promise';
import pRetry from 'p-retry';

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'rokki74',
    password: 'rokki74',
    database: 'school2',
    waitForConnections: true,
    connectionLimit: 10, // Limit to 10 simultaneous connections
    queueLimit: 0 // No queueing, reject additional connections
});

const teachersSql = `
    SELECT phonenumber, name, email,subject_id, class_id, COUNT(*) AS count 
    FROM teachers 
    GROUP BY phonenumber, name, email, subject_id, class_id 
    HAVING COUNT(*) > 1
`;

const [teachersResults] = await dbPool.query(teachersSql);
console.log(teachersResults);

if (teachersResults.length > 0) {
    console.log("Duplicate records found:");
    console.log(teachersResults); 
} else {
    console.log("No duplicate records found.");
}

