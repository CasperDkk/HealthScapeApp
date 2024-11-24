# # HealthScape Application

HealthScape is a web application designed to help users track their health metrics, including daily steps, water intake, mood status, sleep logs, hydration logs, nutrition logs, and activity logs. This application provides a user-friendly interface to monitor health progress and encourages users to maintain a healthy lifestyle.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login functionality.
- Track daily steps and water intake.
- Log mood status and exercise activities.
- View hydration, sleep, nutrition, and activity logs.
- Visual representation of metrics using charts.
- Responsive design for mobile and desktop users.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Charting Library**: Chart.js
- **Session Management**: express-session
- **Environment Variables**: dotenv

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/healthscape.git
   cd healthscape

   ```

2. Install the required dependencies:

   ```bash
   npm install express express-session cors dotenv mysql2 bcryptjs express-mysql-session chart.js

   ```

3. Create a .env file in the root directory with the following variables:
   - DB_HOST=your_database_host
   - DB_USER=your_database_user
   - DB_PASSWORD=your_database_password
   - SESSION_SECRET=your_session_secret
4. Create the database and tables by running:
   -- Use the following SQL commands to create the database schema.

   - CREATE DATABASE IF NOT EXISTS healthscape;
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

5. Start the server:

   ```bash
   npm start

   ```

6. Access the application at http://localhost:3000.

7. Usage

   - Register a new user to create an account.
   - Log in with your credentials.
   - Update your daily steps and water intake through the dashboard.
   - View your progress in charts that represent your metrics over time.

8. Contributing

   - Contributions are welcome! Please follow these steps to contribute:
   - Fork the repository.
   - Create a new branch (git checkout -b feature/YourFeature).
   - Make your changes and commit them (git commit -m 'Add some feature').
   - Push to the branch (git push origin feature/YourFeature).
   - Open a pull request.

9. License
   This project is licensed under the MIT License - see the LICENSE file for details.
