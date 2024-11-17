// server/models/Mood.js

const pool = require('../config/db'); // Import the database pool

class Mood {
    constructor(id, userId, mood, notes, createdAt) {
        this.id = id;
        this.userId = userId;
        this.mood = mood;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    // Method to log a new mood entry
    static async logMood(userId, mood, notes) {
        const [result] = await pool.query(
            'INSERT INTO mood_logs (user_id, mood, notes) VALUES (?, ?, ?)',
            [userId, mood, notes]
        );
        return new Mood(result.insertId, userId, mood, notes);
    }

    // Method to get all moods for a specific user
    static async getMoodsByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM mood_logs WHERE user_id = ?', [userId]);
        return rows.map(row => new Mood(row.id, row.user_id, row.mood, row.notes));
    }
}

module.exports = Mood;