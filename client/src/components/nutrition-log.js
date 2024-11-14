// nutrition-log.js

// Function to handle form submission
document.getElementById('nutritionLogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const foodItem = document.getElementById('foodItem').value;
    const calories = parseFloat(document.getElementById('calories').value);
    const servingSize = document.getElementById('servingSize').value;
    const notes = document.getElementById('notes').value;

    // Validate inputs (basic validation)
    if (!foodItem || !calories) {
        displayFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Create a new meal entry element
    const mealEntryDiv = document.createElement('div');
    mealEntryDiv.classList.add('meal-entry');

    // Add food item, calories, serving size, and notes to the entry
    mealEntryDiv.innerHTML = `<strong>${foodItem}</strong> (${servingSize}) - ${calories} calories<br>${notes}`;

    // Append the new entry to the logged meals container
    const loggedMealsContainer = document.getElementById('loggedMealsContainer');
    
    // Clear placeholder text if it exists
    if (loggedMealsContainer.querySelector('p')) {
        loggedMealsContainer.innerHTML = '';
    }

    loggedMealsContainer.appendChild(mealEntryDiv);

    // Display success message
    displayFeedback('Meal logged successfully!', 'success');

    // Clear the form fields after submission
    document.getElementById('nutritionLogForm').reset();
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
    document.getElementById('mainContent').insertBefore(feedbackMessageDiv, document.getElementById('nutritionLogForm'));

    // Remove feedback message after a few seconds
    setTimeout(() => {
        feedbackMessageDiv.remove();
    }, 3000);
}