// server/models/Activity.js

const pool = require('../config/db'); // Import the database pool

class Activity {
    constructor(id, userId, activity, duration, intensity, notes, createdAt) {
        this.id = id;
        this.userId = userId;
        this.activity = activity;
        this.duration = duration;
        this.intensity = intensity;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    // Method to log a new activity
    static async logActivity(userId, activity, duration, intensity, notes) {
        const [result] = await pool.query(
            'INSERT INTO activity_logs (user_id, activity, duration, intensity, notes) VALUES (?, ?, ?, ?, ?)',
            [userId, activity, duration, intensity, notes]
        );
        return new Activity(result.insertId, userId, activity, duration, intensity, notes);
    }

    // Method to get all activities for a specific user
    static async getActivitiesByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM activity_logs WHERE user_id = ?', [userId]);
        return rows.map(row => new Activity(row.id, row.user_id, row.activity, row.duration, row.intensity, row.notes));
    }

    // Method to delete an activity by ID
    static async deleteActivityById(activityId) {
        const [result] = await pool.query('DELETE FROM activity_logs WHERE id = ?', [activityId]);
        return result.affectedRows > 0; // Returns true if an activity was deleted
    }
}

module.exports = Activity;