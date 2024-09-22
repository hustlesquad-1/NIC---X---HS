document.addEventListener('DOMContentLoaded', function () {
    const validUsername = "doctor";
    const validPassword = "password";
    let showSuccessModalAfterLogin = false;  // Flag to track whether the success modal should be shown after login

    // Predefined wards for selection
    const wards = ["Ward 1", "Ward 2", "Ward 3", "Ward 4"];

    // Populate the ward dropdown on page load
    function populateWardSelect() {
        const wardSelect = document.getElementById('update-ward-select');
        wardSelect.innerHTML = '<option value="">Select Ward</option>';

        wards.forEach(ward => {
            const option = document.createElement('option');
            option.value = ward;
            option.textContent = ward;
            wardSelect.appendChild(option);
        });
    }

    // Handle Create New Ward button click
    document.getElementById('create-ward-btn').addEventListener('click', function () {
        document.getElementById('new-ward-form').style.display = 'block';
        document.getElementById('create-ward-btn').style.display = 'none';
    });

    // Handle Submit New Ward form
    document.getElementById('new-ward-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const newWardName = document.getElementById('new-ward-name').value;
        const totalBeds = document.getElementById('new-ward-total-beds').value;
        const availableBeds = document.getElementById('new-ward-available-beds').value;

        if (newWardName && totalBeds && availableBeds) {
            // Show confirmation modal for new ward creation
            document.getElementById('confirmation-modal').style.display = 'block';

            // Handle Confirm action in confirmation modal
            document.getElementById('confirm-btn').onclick = function () {
                document.getElementById('confirmation-modal').style.display = 'none';

                // Add the new ward to the dropdown
                wards.push(newWardName);
                populateWardSelect();

                // Set flag to show success modal after next login
                showSuccessModalAfterLogin = true;

                // Navigate to login page
                document.getElementById('new-ward-form').style.display = 'none';
                document.getElementById('management-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
            };
        }
    });

    // Handle Update Beds form submission
    document.getElementById('update-beds-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Show confirmation modal for updating beds
        document.getElementById('confirmation-modal').style.display = 'block';

        // Handle Confirm action in confirmation modal
        document.getElementById('confirm-btn').onclick = function () {
            document.getElementById('confirmation-modal').style.display = 'none';

            // Set flag to show success modal after next login
            showSuccessModalAfterLogin = true;

            // Navigate to login page
            document.getElementById('management-section').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
        };
    });

    // Handle cancel button in confirmation modal
    document.getElementById('cancel-btn').addEventListener('click', function () {
        document.getElementById('confirmation-modal').style.display = 'none';
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('management-section').style.display = 'block';

            // Show success modal only if the flag is set after confirming an action
            if (showSuccessModalAfterLogin) {
                document.getElementById('success-modal').style.display = 'block';
                showSuccessModalAfterLogin = false;  // Reset the flag after showing the modal
            }
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });

    // Handle success modal "OK" button
    document.getElementById('success-ok-btn').addEventListener('click', function () {
        document.getElementById('success-modal').style.display = 'none';
    });

    // Initialize ward dropdown
    populateWardSelect();
});
