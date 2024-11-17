// server/server.js

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/db'); // Import the database pool
const userRoutes = require('./routes/userRoutes'); // Import user routes
const activityRoutes = require('./routes/activityRoutes'); // Import activity routes
const errorHandler = require('./utils/errorHandler'); // Import custom error handler

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day in milliseconds
    }
}));

// Define API routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/activities', activityRoutes); // Activity-related routes

// Error handling middleware
app.use(errorHandler); // Custom error handler for centralized error management

// Function to initialize the database schema and seed data
const initializeDatabase = async () => {
    const schemaSQL = `
        CREATE DATABASE IF NOT EXISTS healthscape;
        USE healthscape;

        -- Users table
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Hydration Logs table
        CREATE TABLE IF NOT EXISTS hydration_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            amount DECIMAL(5, 2) NOT NULL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        -- Sleep Logs table
        CREATE TABLE IF NOT EXISTS sleep_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            duration DECIMAL(4, 2) NOT NULL,
            quality ENUM('good', 'fair', 'poor') NOT NULL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        -- Mood Logs table
        CREATE TABLE IF NOT EXISTS mood_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            mood ENUM('happy', 'neutral', 'sad', 'angry') NOT NULL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

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
        );

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
        );
    `;

    const seedSQL = `
        USE healthscape;

        -- Insert sample users
        INSERT INTO users (username, email, password)
        VALUES 
            ('john_doe', 'john@example.com', 'hashed_password_1'),
            ('jane_smith', 'jane@example.com', 'hashed_password_2')
        ON DUPLICATE KEY UPDATE id=id; -- Prevent duplicate entry errors

        -- Insert sample hydration logs
        INSERT INTO hydration_logs (user_id, amount, notes)
        VALUES 
            (1, 2.5, 'Drank water during workout'),
            (1, 1.0, 'Morning hydration'),
            (2, 3.0, 'Daily goal reached');

        -- Insert sample sleep logs
        INSERT INTO sleep_logs (user_id, duration, quality, notes)
        VALUES 
            (1, 7.5, 'good', 'Felt rested in the morning'),
            (2, 6.0, 'fair', 'Woke up several times');

        -- Insert sample mood logs
        INSERT INTO mood_logs (user_id, mood, notes)
        VALUES 
            (1, 'happy', 'Great day at work!'),
            (2, 'neutral', 'Just an average day');

        -- Insert sample nutrition logs
        INSERT INTO nutrition_logs (user_id, food_item, calories, serving_size, notes)
        VALUES 
            (1, 'Chicken Salad', 350, '1 bowl', 'Healthy lunch option'),
            (2, 'Pasta', 600, '1 plate', 'Dinner with friends');

        -- Insert sample activity logs
        INSERT INTO activity_logs (user_id, activity, duration, intensity, notes)
        VALUES 
            (1, 'Running', 1.0, 'high', 'Ran 5 km in the park'),
            (2, 'Yoga', 0.5, 'moderate', 'Morning yoga session');
    `;

    try {
        const connection = await pool.getConnection(); // Get a connection from the pool
        
        await connection.query(schemaSQL); // Execute schema creation queries
        
        await connection.query(seedSQL); // Execute seed data insertion queries
        
        console.log('Database initialized and seeded successfully.');
        
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};

// Initialize the database and start the server after setup is complete.
initializeDatabase().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});