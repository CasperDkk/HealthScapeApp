// app.js
document.addEventListener("DOMContentLoaded", function() {
    
    const mainContent = document.getElementById('mainContent');

    // Function to load content based on navigation
    function loadContent(content) {
        mainContent.innerHTML = `<h2>${content}</h2><p>This is the ${content.toLowerCase()} section.</p>`;
        // Here you can add logic to load specific components or data
    }

    // Event listeners for navigation links
    document.getElementById('dashboardLink').addEventListener('click', function() {
        loadContent('Dashboard');
        // Prevent default link behavior
        event.preventDefault();
    });

    document.getElementById('profileLink').addEventListener('click', function() {
        loadContent('Profile');
        event.preventDefault();
    });

   // Add similar event listeners for other links...

});