// Global variables for chart data
let dailyStepsData = [];
let waterIntakeData = [];

// Function to initialize the dashboard
function initDashboard() {
    // Sample data for demonstration (replace with actual data fetching)
    const dailySteps = 5000; // Example: Replace with actual data fetching
    const waterIntake = 2; // Example: Replace with actual data fetching

    // Update the dashboard metrics
    document.getElementById('dailySteps').innerText = `${dailySteps} steps`;
    document.getElementById('waterIntake').innerText = `${waterIntake} liters`;

    // Initialize chart data
    dailyStepsData.push(dailySteps);
    waterIntakeData.push(waterIntake);

    // Create the chart
    createProgressChart();
}

// Function to create a progress chart
function createProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Clear previous chart if it exists
    if (window.progressChart) {
        window.progressChart.destroy();
    }

    window.progressChart = new Chart(ctx, {
        type: 'bar', // Change this to 'line' if you prefer line charts
        data: {
            labels: ['Daily Steps', 'Water Intake'], // Add more labels as needed
            datasets: [{
                label: 'Metrics',
                data: [
                    dailyStepsData.reduce((a, b) => a + b, 0), 
                    waterIntakeData.reduce((a, b) => a + b, 0)
                ], // Sum of metrics for display
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update daily steps
async function updateSteps() {
    const newSteps = document.getElementById('editDailySteps').value;
    
    if (newSteps) {
        document.getElementById('dailySteps').innerText = `${newSteps} steps`;
        
        // Send updated steps to the server
        await sendMetricsToServer({ dailySteps: newSteps });

        // Update chart data and re-render chart
        dailyStepsData.push(parseInt(newSteps)); // Add new value to array
        createProgressChart(); // Recreate chart with updated data

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

        // Update chart data and re-render chart
        waterIntakeData.push(parseFloat(newWaterIntake)); // Add new value to array
        createProgressChart(); // Recreate chart with updated data

        // Optionally clear the input field after updating
        document.getElementById('editWaterIntake').value = '';
        
        console.log(`Updated water intake: ${newWaterIntake}`);
    } else {
        alert("Please enter a valid amount of water.");
    }
}

// Function to update mood status (you can add similar logic for mood tracking)
async function updateMood() {
    const newMood = document.getElementById('editMoodStatus').value;
    
    if (newMood) {
        document.getElementById('moodStatus').innerText = newMood;

        console.log(`Updated mood status: ${newMood}`);
        
        // Optionally clear the dropdown after updating
        document.getElementById('editMoodStatus').value = '';
        
    } else {
        alert("Please select a valid mood.");
    }
}

// Function to add a new exercise log (you may want to track exercise logs separately)
async function addExerciseLog() {
   const newLog = document.getElementById('newExerciseLog').value;
   
   if (newLog) {
       const exerciseLogContainer = document.getElementById('exerciseLogs');
       
       const listItem = document.createElement('li');
       listItem.innerText = newLog;
       
       exerciseLogContainer.appendChild(listItem);
       
       // Send updated exercise logs to the server (you may want to implement this)
       const currentLogs = Array.from(exerciseLogContainer.children).map(li => li.innerText);
       await sendMetricsToServer({ exerciseLogs: [...currentLogs, newLog] });

       // Optionally clear the input field after adding the log
       document.getElementById('newExerciseLog').value = '';
       
       console.log(`Added new exercise log: ${newLog}`);
   } else {
       alert("Please enter a valid exercise log.");
   }
}

// Function to send metrics to the server
async function sendMetricsToServer(metrics) {
   try {
       const userId = sessionStorage.getItem('userId'); 

       if (!userId) {
           console.error('User ID not found. Please log in again.');
           return;
       }

       const response = await fetch('/api/users/metrics', {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ userId, ...metrics }) 
       });

       if (!response.ok) {
           throw new Error('Failed to update metrics');
       }

       const data = await response.json();
       console.log(data.message); 

   } catch (error) {
       console.error('Error sending metrics to server:', error);
   }
}

// Call the initDashboard function when the window loads
async function initDashboard() {
    try {
        const response = await fetch('/api/users/metrics'); // Assuming this endpoint returns user metrics
        
        if (!response.ok) throw new Error('Failed to fetch user metrics');

        const { dailySteps, waterIntake } = await response.json(); // Adjust according to your API response structure
        
        document.getElementById('dailySteps').innerText = `${dailySteps} steps`;
        document.getElementById('waterIntake').innerText = `${waterIntake} liters`;

        dailyStepsData.push(dailySteps);
        waterIntakeData.push(waterIntake);

        createProgressChart();
        
    } catch (error) {
        console.error(error);
    }
}