// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = ['admission-section', 'discharge-section', 'transfer-section'];

    // Hide all sections
    sections.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // Show the clicked section
    document.getElementById(sectionId).style.display = 'block';
}

// Function to handle form submission
function handleFormSubmission(formId, successId) {
    document.getElementById(formId).addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Display success message
        const successElement = document.getElementById(successId);
        successElement.style.display = 'block';
        
        // Optionally, hide success message after a delay
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000); // Adjust the delay time as needed (in milliseconds)
        
        // Optionally, you can perform other operations here (e.g., sending data to a server via AJAX)
        
        // Hide the form after submission
        document.getElementById(formId).style.display = 'none';
    });
}

// Initialize form handlers
handleFormSubmission('admission-form', 'admission-success');
handleFormSubmission('discharge-form', 'discharge-success');
handleFormSubmission('transfer-form', 'transfer-success');

// Optional: Function to reset the form (if you need it)
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// Optional: Add event listener to reset buttons (if any)
document.querySelectorAll('.reset-button').forEach(button => {
    button.addEventListener('click', function() {
        const formId = this.getAttribute('data-form-id');
        resetForm(formId);
    });
});
