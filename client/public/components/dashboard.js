//dashboard.js

// Function to update daily steps
async function updateSteps() {
    const newSteps = document.getElementById('editDailySteps').value;
    
    if (newSteps) {
        document.getElementById('dailySteps').innerText = `${newSteps} steps`;
        
        // Send updated steps to the server
        await sendMetricsToServer({ dailySteps: newSteps });

        // Optionally clear the input field after updating
        document.getElementById('editDailySteps').value = '';
        
        console.log(`Updated daily steps: ${newSteps}`);
    } else {
        alert("Please enter a valid number of steps.");
    }
}

// Function to update water intake
async function updateWaterIntake() {
    const newWaterIntake = document.getElementById('editWaterIntake').value;
    
    if (newWaterIntake) {
        document.getElementById('waterIntake').innerText = `${newWaterIntake} liters`;
        
        // Send updated water intake to the server
        await sendMetricsToServer({ waterIntake: newWaterIntake });

        // Optionally clear the input field after updating
        document.getElementById('editWaterIntake').value = '';
        
        console.log(`Updated water intake: ${newWaterIntake}`);
    } else {
        alert("Please enter a valid amount of water.");
    }
}

// Function to update mood status
async function updateMood() {
    const newMood = document.getElementById('editMoodStatus').value;
    
    if (newMood) {
        document.getElementById('moodStatus').innerText = newMood;
        
        // Send updated mood status to the server
        await sendMetricsToServer({ moodStatus: newMood });

        // Optionally clear the dropdown after updating
        document.getElementById('editMoodStatus').value = '';
        
        console.log(`Updated mood status: ${newMood}`);
    } else {
        alert("Please select a valid mood.");
    }
}

// Function to add a new exercise log
async function addExerciseLog() {
    const newLog = document.getElementById('newExerciseLog').value;
    
    if (newLog) {
        const exerciseLogContainer = document.getElementById('exerciseLogs');
        
        const listItem = document.createElement('li');
        listItem.innerText = newLog;
        
        exerciseLogContainer.appendChild(listItem);
        
        // Send updated exercise logs to the server
        await sendMetricsToServer({ exerciseLogs: [...exerciseLogs, newLog] });

        // Optionally clear the input field after adding the log
        document.getElementById('newExerciseLog').value = '';
        
        console.log(`Added new exercise log: ${newLog}`);
    } else {
        alert("Please enter a valid exercise log.");
    }
}

// Function to send metrics to the server
async function sendMetricsToServer(metrics) {
    // Assume you have stored userId in session storage after login
    const userId = sessionStorage.getItem('userId'); // Replace with actual method of retrieving user ID

    if (!userId) {
        console.error('User ID not found. Please log in again.');
        return;
    }

    try {
        const response = await fetch('/api/users/metrics', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ...metrics }) // Send metrics along with userId
        });

        if (!response.ok) {
            throw new Error('Failed to update metrics');
        }

        const data = await response.json();
        console.log(data.message); // Log success message

    } catch (error) {
        console.error('Error sending metrics to server:', error);
    }
}

// Call the initDashboard function when the window loads
window.onload = initDashboard;
