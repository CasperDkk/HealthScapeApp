// server/routes/user-routes.js

const express = require('express');
const { registerUser, loginUser, getUserById, updateMetrics } = require('../controllers/user-controller'); // Import user controller functions

const router = express.Router(); // Create a new router instance

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for fetching user data by ID
router.get('/:id', getUserById);

// Route for updating user metrics
router.put('/metrics', updateMetrics); 

module.exports = router; // Export the router