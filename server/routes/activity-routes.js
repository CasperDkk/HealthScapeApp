// server/routes/activityRoutes.js

const express = require('express');
const { logActivity, getActivitiesByUserId, deleteActivityById } = require('../controllers/activity-controller'); // Import activity controller functions

const router = express.Router(); // Create a new router instance

// Route for logging a new activity
router.post('/', logActivity);

// Route for fetching all activities for a specific user
router.get('/user/:userId', getActivitiesByUserId);

// Route for deleting an activity by ID
router.delete('/:id', deleteActivityById);

module.exports = router; // Export the router