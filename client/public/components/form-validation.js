// client/src/js/form-validation.js

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");

    // Registration Form Submission
    if (registrationForm) {
        registrationForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Prevent form submission

            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Send POST request to register user
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                const errorData = await response.json();
                showError("registrationError", errorData.message);
            }
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Prevent form submission

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Send POST request to login user
            const response = await fetch('/api/users/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const text = await response.text(); // Get response as text for debugging
                console.error('Login failed:', text); // Log the response text
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store JWT in local storage
            sessionStorage.setItem('userId', data.userId); // Store user ID in session storage
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard page
        });
}
    // Function to display error messages
    function showError(fieldId, message) {
        const errorField = document.getElementById(fieldId);
        if (errorField) {
            errorField.innerText = message; // Display the error message
        }
    }
});