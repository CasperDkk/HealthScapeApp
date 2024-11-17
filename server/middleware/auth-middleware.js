// server/middleware/authMiddleware.js

const pool = require('../config/db'); // Import the database pool

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    const userId = req.session.userId; // Get user ID from session

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }

    try {
        // Check if the user exists in the database
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized access. User not found.' });
        }

        // Attach user information to the request object
        req.user = rows[0];
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware; // Export the middleware