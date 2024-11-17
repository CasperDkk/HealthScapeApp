// server/controllers/activityController.js

const pool = require('../config/db'); // Import the database pool

// Function to log a new activity
exports.logActivity = async (req, res) => {
    const { userId, activity, duration, intensity, notes } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO activity_logs (user_id, activity, duration, intensity, notes) VALUES (?, ?, ?, ?, ?)',
            [userId, activity, duration, intensity, notes]
        );

        res.status(201).json({ message: 'Activity logged successfully', activityId: result.insertId });
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all activities for a specific user
exports.getActivitiesByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const [rows] = await pool.query('SELECT * FROM activity_logs WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No activities found for this user' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete an activity log by ID
exports.deleteActivityById = async (req, res) => {
    const activityId = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM activity_logs WHERE id = ?', [activityId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};