// hydration.js

// Initialize total water intake
let totalWaterIntake = 0;

// Function to handle form submission
document.getElementById('hydrationLogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const waterIntake = parseFloat(document.getElementById('waterIntake').value);
    const notes = document.getElementById('notes').value;

    // Validate inputs (basic validation)
    if (!waterIntake || waterIntake <= 0) {
        displayFeedback('Please enter a valid amount of water intake.', 'error');
        return;
    }

    // Update total water intake
    totalWaterIntake += waterIntake;

    // Update progress indicator
    updateProgress();

    // Optionally, log the notes or save them to local storage or an API
    console.log(`Logged ${waterIntake} liters. Notes: ${notes}`);

    // Display success message
    displayFeedback('Water intake logged successfully!', 'success');

    // Clear the form fields after submission
    document.getElementById('hydrationLogForm').reset();
});

// Function to update the progress indicator
function updateProgress() {
    const progressBar = document.getElementById('hydrationProgress');
    const progressText = document.getElementById('progressText');

    // Update progress bar value (assuming a goal of 10 liters)
    progressBar.value = totalWaterIntake;
    
    // Update displayed text
    progressText.innerText = `${totalWaterIntake.toFixed(1)} liters logged today.`;
}

// Function to display feedback messages
function displayFeedback(message, type) {
    const feedbackMessageDiv = document.createElement('div');
    
    feedbackMessageDiv.innerText = message;
    
    // Change styling based on message type
    if (type === 'success') {
        feedbackMessageDiv.style.color = 'green';
    } else if (type === 'error') {
        feedbackMessageDiv.style.color = 'red';
    }

    // Append feedback message to main content area
    document.getElementById('mainContent').insertBefore(feedbackMessageDiv, document.getElementById('hydrationLogForm'));

    // Remove feedback message after a few seconds
    setTimeout(() => {
        feedbackMessageDiv.remove();
    }, 3000);
}