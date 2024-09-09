import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST ,  
  port: Number(process.env.DB_PORT),                                    // Your MySQL port
  user: process.env.DB_USER ,                                       // Your MySQL username
  password: process.env.DB_PASS,                   // Your MySQL password
  database: process.env.DB_NAME ,                                  // Your database name
  ssl: { rejectUnauthorized: false },                                             // SSL mode for Aiven Cloud
});

export default pool;
