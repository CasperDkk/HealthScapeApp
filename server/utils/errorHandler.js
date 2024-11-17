// server/utils/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace for debugging

    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = errorHandler; // Export the error handler