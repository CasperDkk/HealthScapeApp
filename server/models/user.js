// server/models/User.js

const pool = require('../config/db'); // Import the database pool

class User {
    constructor(id, username, email, password, createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

    // Method to save a new user to the database
    static async create(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return new User(result.insertId, username, email, hashedPassword);
    }

    // Method to find a user by ID
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return new User(rows[0].id, rows[0].username, rows[0].email, rows[0].password, rows[0].created_at);
    }

    // Method to find a user by email
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return null;
        return new User(rows[0].id, rows[0].username, rows[0].email, rows[0].password, rows[0].created_at);
    }
}

module.exports = User;