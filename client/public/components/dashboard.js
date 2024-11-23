// dashboard.js

// Function to initialize the dashboard
function initDashboard() {
    // Sample data for demonstration (replace with actual data fetching)
    const dailySteps = 5000; // Example: Replace with actual data fetching
    const waterIntake = 2; // Example: Replace with actual data fetching
    const moodStatus = 'Happy'; // Example: Replace with actual data fetching
    const exerciseLogs = ['30 min run', '15 min yoga']; // Example: Replace with actual data fetching

    // Update the dashboard metrics
    document.getElementById('dailySteps').innerText = `${dailySteps} steps`;
    document.getElementById('waterIntake').innerText = `${waterIntake} liters`;
    document.getElementById('moodStatus').innerText = moodStatus;

    // Update exercise logs
    const exerciseLogContainer = document.getElementById('exerciseLogs');
    exerciseLogContainer.innerHTML = ''; // Clear existing logs
    if (exerciseLogs.length > 0) {
        exerciseLogs.forEach(log => {
            const listItem = document.createElement('li');
            listItem.innerText = log;
            exerciseLogContainer.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.innerText = 'No logs yet.';
        exerciseLogContainer.appendChild(listItem);
    }
}

// Call the initDashboard function when the window loads
window.onload = initDashboard;