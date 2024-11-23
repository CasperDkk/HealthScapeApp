// community-forum.js

// Function to handle form submission
document.getElementById('forumPostForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    // Validate inputs (basic validation)
    if (!postTitle || !postContent) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Create a new thread element
    const threadDiv = document.createElement('div');
    threadDiv.classList.add('thread');

    // Add title and content to the thread
    threadDiv.innerHTML = `<h4>${postTitle}</h4><p>${postContent}</p>`;

    // Append the new thread to the discussion container
    document.getElementById('discussionThreadsContainer').appendChild(threadDiv);

    // Display success message
    displayFeedback('Discussion posted successfully!', 'success');

    // Optionally, clear the form fields after submission
    document.getElementById('forumPostForm').reset();
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