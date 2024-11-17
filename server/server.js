// server/server.js

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/db'); // Import the database pool
const userRoutes = require('./routes/userRoutes'); // Import user routes
const activityRoutes = require('./routes/activityRoutes'); // Import activity routes
const errorHandler = require('./utils/errorHandler'); // Import custom error handler

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});