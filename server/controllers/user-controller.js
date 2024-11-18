// server/controllers/userController.js

const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Import the database pool

// Function to register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
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

    try {
        // Fetch the user from the database
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store user ID in session (if using sessions)
        req.session.userId = user.id;

        res.json({ message: 'Login successful', userId: user.id });
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