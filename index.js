document.addEventListener('DOMContentLoaded', function() {
    // =====================
    // Login Form Submission Logic
    // =====================
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            // Add validation or other login logic here if necessary
            
            // Redirect to module.html upon successful login
            window.location.href = "module.html";
        });
    }

    // =====================
    // Registration Form Submission Logic
    // =====================
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent default form submission behavior

            // Optional: Add any validation logic or AJAX requests here
            const name = document.getElementById('register-name').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;

            // Simple validation check
            if (name && phone && password) {
                // Assuming the form data is valid, redirect to login.html
                window.location.href = 'login.html';
            } else {
                alert('Please fill out all fields correctly.');
            }
        });
    }
});
