document.addEventListener('DOMContentLoaded', function() {
    const approveBtn = document.getElementById('approve-btn');
    const rejectBtn = document.getElementById('reject-btn');

    approveBtn.addEventListener('click', function() {
        // Logic for approving the appointment
        alert('Appointment Approved!');
        // You can add more logic here, such as sending data to a server
    });

    rejectBtn.addEventListener('click', function() {
        // Logic for rejecting the appointment
        alert('Appointment Rejected!');
        // You can add more logic here, such as sending data to a server
    });
});
