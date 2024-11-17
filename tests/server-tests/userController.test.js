// tests/serverTests/userController.test.js

const request = require('supertest');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const userRoutes = require('../../server/routes/user-routes'); // Adjust the import path as necessary
const pool = require('../../server/config/db'); // Import the database pool

dotenv.config();

const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Use user routes
app.use('/api/users', userRoutes);

// Clean up database before each test
beforeEach(async () => {
    await pool.query('DELETE FROM users'); // Clear users table
});

// Close database connection after all tests
afterAll(async () => {
    await pool.end();
});

describe('User Controller Tests', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'test_user',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user', async () => {
        // First register a new user
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'login_user',
                email: 'login@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.userId).toBeDefined(); // Check if userId is returned
    });

    it('should return 401 for invalid login', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password');
    });
});