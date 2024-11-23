// sleep-tracker.js

// Function to handle form submission
document.getElementById('sleepLogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const sleepDuration = parseFloat(document.getElementById('sleepDuration').value);
    const sleepQuality = document.getElementById('sleepQuality').value;
    const notes = document.getElementById('notes').value;

    // Validate inputs (basic validation)
    if (!sleepDuration || sleepDuration <= 0) {
        displayFeedback('Please enter a valid sleep duration.', 'error');
        return;
    }

    // Create a new sleep entry element
    const sleepEntryDiv = document.createElement('div');
    sleepEntryDiv.classList.add('sleep-entry');

    // Add sleep duration, quality, and notes to the entry
    sleepEntryDiv.innerHTML = `<strong>${sleepDuration} hours (${sleepQuality})</strong><br>${notes}`;

    // Append the new entry to the logged sleep container
    const loggedSleepContainer = document.getElementById('loggedSleepContainer');
    
    // Clear placeholder text if it exists
    if (loggedSleepContainer.querySelector('p')) {
        loggedSleepContainer.innerHTML = '';
    }

    loggedSleepContainer.appendChild(sleepEntryDiv);

    // Display success message
    displayFeedback('Sleep entry logged successfully!', 'success');

    // Clear the form fields after submission
    document.getElementById('sleepLogForm').reset();
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

    // Remove feedback message after a few seconds
    setTimeout(() => {
        feedbackMessageDiv.innerText = '';
    }, 3000);
}