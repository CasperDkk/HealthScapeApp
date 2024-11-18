// server/server.js

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2/promise'); 
const pool = require('./config/db'); 
const userRoutes = require('./routes/user-routes'); 
const activityRoutes = require('./routes/activity-routes'); 
const errorHandler = require('./utils/error-handler'); 


dotenv.config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Session management using MySQLStore
const sessionStore = new MySQLStore({}, pool);

app.use(session({
    key: 'healthscape_session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        httpOnly: true //mitigate against XSS attacks
    }
}));

// Define API routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/activities', activityRoutes); // Activity-related routes

// Error handling middleware
app.use(errorHandler); // Custom error handler for centralized error management

// Function to initialize the database schema and seed data
async function initDatabase() {
    const connection = await pool.getConnection();
    try {
        //Create healthscape db if it does not exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS healthscape`);

        //Create tables in the healthscape db
        await connection.query(`
            -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await connection.query(`
            -- Hydration Logs table
            CREATE TABLE IF NOT EXISTS hydration_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                amount DECIMAL(5, 2) NOT NULL,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        await connection.query(`
            -- Sleep Logs table
            CREATE TABLE IF NOT EXISTS sleep_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                duration DECIMAL(4, 2) NOT NULL,
                quality ENUM('good', 'fair', 'poor') NOT NULL,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        await connection.query(`
            -- Mood Logs table
            CREATE TABLE IF NOT EXISTS mood_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                mood ENUM('happy', 'neutral', 'sad', 'angry') NOT NULL,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        await connection.query(`
            -- Nutrition Logs table
            CREATE TABLE IF NOT EXISTS nutrition_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                food_item VARCHAR(100) NOT NULL,
                calories INT NOT NULL,
                serving_size VARCHAR(50),
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        await connection.query(`
            -- Activity Logs table
            CREATE TABLE IF NOT EXISTS activity_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                activity VARCHAR(100) NOT NULL,
                duration DECIMAL(4, 2),
                intensity ENUM('low', 'moderate', 'high'),
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log("Database and tables created successfully.");
    
        } catch (error) {
            console.error("Error creating database or tables:", error);
        } finally {
            connection.release();
        }
}

// Function to insert sample data
async function insertSampleData() {
    const connection = await pool.getConnection();
    try{
        console.log("Inserting sample data...");

        // Sample users with hashed passwords
        const hashed_password_1 = await bcrypt.hash('password123', 10);
        const hashed_password_2 = await bcrypt.hash('password456', 10);

        await connection.query(
            'INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)',
            ['john_doe', 'john@example.com', hashedPassword1]
        );
        
        await connection.query(
            'INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)',
            ['jane_smith', 'jane@example.com', hashedPassword2]
        );

        // Sample hydration logs
        await connection.query(
            'INSERT IGNORE INTO hydration_logs (user_id, amount, notes) VALUES (?, ?, ?)',
            [1, 2.5, 'Drank water during workout']
        );

        await connection.query(
            'INSERT IGNORE INTO hydration_logs (user_id, amount, notes) VALUES (?, ?, ?)',
            [1, 1.0, 'Morning hydration']
        );

        await connection.query(
            'INSERT IGNORE INTO hydration_logs (user_id, amount, notes) VALUES (?, ?, ?)',
            [2, 3.0, 'Daily goal reached']
        );

        // Sample sleep logs
        await connection.query(
            'INSERT IGNORE INTO sleep_logs (user_id, duration, quality, notes) VALUES (?, ?, ?, ?)',
            [1, 7.5, 'good', 'Felt rested in the morning']
        );

        await connection.query(
            'INSERT IGNORE INTO sleep_logs (user_id, duration, quality, notes) VALUES (?, ?, ?, ?)',
            [2, 6.0, 'fair', 'Woke up several times']
        );

        // Sample mood logs
        await connection.query(
            'INSERT IGNORE INTO mood_logs (user_id, mood, notes) VALUES (?, ?, ?)',
            [1, 'happy', 'Great day at work!']
        );

        await connection.query(
            'INSERT IGNORE INTO mood_logs (user_id, mood, notes) VALUES (?, ?, ?)',
            [2, 'neutral', 'Just an average day']
        );

        // Sample nutrition logs
        await connection.query(
            'INSERT IGNORE INTO nutrition_logs (user_id, food_item, calories, serving_size, notes) VALUES (?, ?, ?, ?, ?)',
            [1, 'Chicken Salad', 350, '1 bowl', 'Healthy lunch option']
        );

        await connection.query(
            'INSERT IGNORE INTO nutrition_logs (user_id, food_item, calories, serving_size, notes) VALUES (?, ?, ?, ?, ?)',
            [2, 'Pasta', 600, '1 plate', 'Dinner with friends']
        );

        // Sample activity logs
        await connection.query(
            'INSERT IGNORE INTO activity_logs (user_id, activity, duration, intensity, notes) VALUES (?, ?, ?, ?, ?)',
            [1, 'Running', 1.0, 'high', 'Ran 5 km in the park']
        );

        await connection.query(
            'INSERT IGNORE INTO activity_logs (user_id, activity, duration, intensity, notes) VALUES (?, ?, ?, ?, ?)',
            [2, 'Yoga', 0.5, 'moderate', 'Morning yoga session']
        );

        console.log("Sample data inserted successfully.");
        
    } catch (error) {
        console.error("Error inserting sample data:", error);
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
}




// Function to initialize db after completing set-up
initDatabase().then(() => {
    insertSampleData();
}).then(() => {
    // Start server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error(err));

