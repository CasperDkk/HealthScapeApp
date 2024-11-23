// health-journal.js

// Function to handle form submission
document.getElementById('journalEntryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const entryDate = document.getElementById('entryDate').value;
    const entryTitle = document.getElementById('entryTitle').value;
    const entryContent = document.getElementById('entryContent').value;

    // Validate inputs (basic validation)
    if (!entryDate || !entryTitle || !entryContent) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Create a new entry element
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('journal-entry');

    // Add date, title, and content to the entry
    entryDiv.innerHTML = `<h4>${entryTitle} (${entryDate})</h4><p>${entryContent}</p>`;

    // Append the new entry to the journal entries container
    const journalEntriesContainer = document.getElementById('journalEntriesContainer');
    
    // Clear placeholder text if it exists
    if (journalEntriesContainer.querySelector('p')) {
        journalEntriesContainer.innerHTML = '';
    }

    journalEntriesContainer.appendChild(entryDiv);

    // Display success message
    displayFeedback('Journal entry added successfully!', 'success');

    // Optionally, clear the form fields after submission
    document.getElementById('journalEntryForm').reset();
});

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
    document.getElementById('mainContent').insertBefore(feedbackMessageDiv, document.getElementById('journalEntryForm'));

    // Remove feedback message after a few seconds
    setTimeout(() => {
        feedbackMessageDiv.remove();
    }, 3000);
}