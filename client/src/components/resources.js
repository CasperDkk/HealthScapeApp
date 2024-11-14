// resources.js

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

// Example function to filter resources (if needed)
function filterResources(type) {
    // This is a placeholder function. You can implement filtering logic here.
}

// Add event listeners if you have buttons or other interactive elements
// For example, if you had a filter button:
// document.getElementById('filterButton').addEventListener('click', function() {
//     const selectedType = document.getElementById('resourceTypeSelect').value;
//     filterResources(selectedType);
// });