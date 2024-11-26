// Global variables for chart data
let dailyStepsData = [];
let waterIntakeData = [];

// Function to initialize the dashboard
async function initDashboard() {
    try {
        const response = await fetch('/api/users/metrics'); // Assuming this endpoint returns user metrics
        
        if (!response.ok) throw new Error('Failed to fetch user metrics');

        const { dailySteps, waterIntake } = await response.json(); // Adjust according to your API response structure
        
        document.getElementById('dailySteps').innerText = `${dailySteps} steps`;
        document.getElementById('waterIntake').innerText = `${waterIntake} liters`;

        dailyStepsData.push(dailySteps);
        waterIntakeData.push(waterIntake);

        createStepsChart();
        createWaterIntakeChart();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

// Function to create the daily steps chart
function createStepsChart() {
    const ctx = document.getElementById('stepsChart').getContext('2d');

    // Clear previous chart if it exists
    if (window.stepsChart instanceof Chart) {
        window.stepsChart.destroy();
    }

    window.stepsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dailyStepsData.map((_, index) => `Day ${index + 1}`), // Label each entry as a day
            datasets: [{
                label: 'Daily Steps',
                data: dailyStepsData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8000 // Maximum value for steps
                }
            }
        }
    });
}

// Function to create the water intake chart
function createWaterIntakeChart() {
    const ctx = document.getElementById('waterChart').getContext('2d');

    // Clear previous chart if it exists
    if (window.waterChart instanceof Chart) {
        window.waterChart.destroy();
    }

    window.waterChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: waterIntakeData.map((_, index) => `Day ${index + 1}`), // Label each entry as a day
            datasets: [{
                label: 'Water Intake (Liters)',
                data: waterIntakeData,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 7 // Maximum value for water intake
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
        createStepsChart(); // Recreate chart with updated data

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
        createWaterIntakeChart(); // Recreate chart with updated data

        // Optionally clear the input field after updating
        document.getElementById('editWaterIntake').value = '';
        
        console.log(`Updated water intake: ${newWaterIntake}`);
    } else {
        alert("Please enter a valid amount of water.");
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

// Initialize dashboard on page load
window.onload = initDashboard;
