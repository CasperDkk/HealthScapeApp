// app.js

// Function to load content based on navigation
function loadContent(content) {
    const mainContent = document.getElementById('mainContent');
    
    // Clear existing content
    mainContent.innerHTML = '';

    // Load new content based on the selected page
    switch(content) {
        case 'Dashboard':
            mainContent.innerHTML = `<h2>Dashboard</h2><p>This is the dashboard section.</p>`;
            break;
        case 'Profile':
            mainContent.innerHTML = `<h2>Profile</h2><p>This is the profile section.</p>`;
            break;
        case 'Activity Log':
            mainContent.innerHTML = `<h2>Activity Log</h2><p>This is the activity log section.</p>`;
            break;
        case 'Mood Tracker':
            mainContent.innerHTML = `<h2>Mood Tracker</h2><p>This is the mood tracker section.</p>`;
            break;
        case 'Nutrition Log':
            mainContent.innerHTML = `<h2>Nutrition Log</h2><p>This is the nutrition log section.</p>`;
            break;
        case 'Hydration':
            mainContent.innerHTML = `<h2>Hydration</h2><p>This is the hydration section.</p>`;
            break;
        case 'Sleep Tracker':
            mainContent.innerHTML = `<h2>Sleep Tracker</h2><p>This is the sleep tracker section.</p>`;
            break;
        case 'Resources':
            mainContent.innerHTML = `<h2>Resources</h2><p>This is the resources section.</p>`;
            break;
        case 'Community':
            mainContent.innerHTML = `<h2>Community</h2><p>This is the community section.</p>`;
            break;
        default:
            mainContent.innerHTML = `<h2>Welcome!</h2><p>Select a section from the menu.</p>`;
    }
}

// Event listeners for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        const contentName = this.textContent; // Get the link text
        loadContent(contentName); // Load corresponding content
        event.preventDefault(); // Prevent default link behavior
    });
});

// Event listener for Go to Dashboard button
document.getElementById('goToDashboardButton').addEventListener('click', function() {
    loadContent('Dashboard'); // Load dashboard content dynamically
});