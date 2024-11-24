-- schema.sql
CREATE DATABASE IF NOT EXISTS healthscape;
USE healthscape;
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    daily_steps INT DEFAULT 0,
    water_intake DECIMAL(5, 2) DEFAULT 0,
    mood_status VARCHAR(50),
    exercise_logs TEXT
);
-- Hydration Logs table
CREATE TABLE IF NOT EXISTS hydration_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(5, 2) NOT NULL,
    -- Amount in liters
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Sleep Logs table
CREATE TABLE IF NOT EXISTS sleep_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    duration DECIMAL(4, 2) NOT NULL,
    -- Duration in hours
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
    -- Duration in hours
    intensity ENUM('low', 'moderate', 'high'),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);