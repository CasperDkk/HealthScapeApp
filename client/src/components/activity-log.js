// activity-log.js

// Function to handle form submission
document.getElementById('activityLogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const activityName = document.getElementById('activityName').value;
    const duration = document.getElementById('duration').value;
    const intensity = document.getElementById('intensity').value;
    const notes = document.getElementById('notes').value;

    // Validate inputs (basic validation)
    if (!activityName || !duration) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Here you can save the data to local storage or send it to an API
    // For demonstration, we'll just log it to the console
    console.log({
        activityName,
        duration,
        intensity,
        notes
    });

    // Display success message
    displayFeedback('Activity logged successfully!', 'success');

    // Optionally, clear the form fields after submission
    document.getElementById('activityLogForm').reset();
});

// Function to display feedback messages
function displayFeedback(message, type) {
    const feedbackMessageDiv = document.getElementById('feedbackMessage');
    
    feedbackMessageDiv.innerText = message;
    
    // Change styling based on message type
    if (type === 'success') {
        feedbackMessageDiv.style.color = 'green';
    } else if (type === 'error') {
        feedbackMessageDiv.style.color = 'red';
    }
}