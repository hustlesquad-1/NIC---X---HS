document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const selectBtns = document.querySelectorAll('.select-btn');
    const otpModal = document.getElementById('otp-modal');
    const closeBtn = otpModal.querySelector('.close-btn');

    form.addEventListener('submit', (event) => {
        let formValid = true;

        // Check if all required select options have been selected
        selectBtns.forEach(btn => {
            const content = document.getElementById(btn.id.replace('-btn', '-content'));
            if (!content.querySelector('li.selected')) {
                formValid = false;
                btn.classList.add('error');
            } else {
                btn.classList.remove('error');
            }
        });

        if (!formValid) {
            event.preventDefault(); // Prevent form submission
            alert('Please select options from all dropdowns.');
        } else {
            event.preventDefault(); // Prevent default form submission
            showOtpModal(); // Show OTP modal
        }
    });

    function showOtpModal() {
        if (otpModal) {
            otpModal.style.display = 'block';
            otpModal.setAttribute('aria-hidden', 'false');
        }
    }

    function hideOtpModal() {
        if (otpModal) {
            otpModal.style.display = 'none';
            otpModal.setAttribute('aria-hidden', 'true');
        }
    }

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        hideOtpModal();
    });

    // Optionally, close the modal when clicking outside of the modal content
    otpModal.addEventListener('click', (event) => {
        if (event.target === otpModal) {
            hideOtpModal();
        }
    });
});
