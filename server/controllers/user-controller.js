// server/controllers/user-controller.js

const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Import the database pool

// Function to register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to log in a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Log incoming login attempt

    try {
        // Fetch the user from the database
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Database response:', rows); // Log database response

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user.id; // Store user ID in session

        res.json({ message: 'Login successful', userId: user.id }); // Return user ID along with success message
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get user data by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const [rows] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update metrics entered by user on dashboard
exports.updateMetrics = async (req, res) => {
    const userId = req.session.userId; // Get user ID from session
    const { dailySteps, waterIntake, moodStatus, exerciseLogs } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await pool.query(
            `UPDATE users SET daily_steps = ?, water_intake = ?, mood_status = ?, exercise_logs = ? WHERE id = ?`,
            [dailySteps, waterIntake, moodStatus, JSON.stringify(exerciseLogs), userId]
        );

        res.json({ message: 'Metrics updated successfully' });
    } catch (error) {
        console.error('Error updating metrics:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};