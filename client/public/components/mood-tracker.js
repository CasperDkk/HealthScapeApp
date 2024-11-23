// mood-tracker.js

// Function to handle form submission
document.getElementById('moodTrackerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value;

    // Validate inputs (basic validation)
    if (!mood) {
        displayFeedback('Please select a mood.', 'error');
        return;
    }

    // Here you can save the data to local storage or send it to an API
    // For demonstration, we'll just log it to the console
    console.log({
        mood,
        notes
    });

    // Display success message
    displayFeedback('Mood logged successfully!', 'success');

    // Optionally, clear the form fields after submission
    document.getElementById('moodTrackerForm').reset();
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