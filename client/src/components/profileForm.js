// profileForm.js

// Function to handle form submission
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const preferences = document.getElementById('preferences').value;

    // Validate inputs (basic validation)
    if (!username || !age || !weight || !height) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Here you can save the data to local storage or send it to an API
    // For demonstration, we'll just log it to the console
    console.log({
        username,
        age,
        weight,
        height,
        preferences
    });

    // Display success message
    displayFeedback('Profile updated successfully!', 'success');

    // Optionally, clear the form fields after submission
    document.getElementById('profileForm').reset();
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