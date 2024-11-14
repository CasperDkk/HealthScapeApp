// server/config/db.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0 // Unlimited queue limit
});

// Export the pool for use in other modules
module.exports = pool;