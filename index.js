document.addEventListener('DOMContentLoaded', function() {
    // Login form redirection
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            // Here you can add validation or other logic if needed
            
            // Redirect to module.html
            window.location.href = "module.html";
        });
    }
});
