document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // OTP Modal Functionality
    // =====================
    const otpModal = document.getElementById('otp-modal');
    const closeModalBtn = document.querySelector('.close-btn'); // Ensure this class matches your HTML
    const submitOtpBtn = document.getElementById('submit-otp-btn');
    const otpSuccessMsg = document.getElementById('otp-success-msg');
    const otpInputs = document.querySelectorAll('.otp-input');
    const countdownElement = document.getElementById('countdown');
    const resendOtpButton = document.getElementById('resend-otp-btn');
    let countdown = 59;
    let countdownInterval;

    // Mask phone number
    const maskPhoneNumber = (phone) => phone.slice(0, -3).replace(/\d/g, 'X') + phone.slice(-3);

    // Show OTP modal
    const showOtpModal = () => {
        otpModal.style.display = 'block';
        startCountdown();
    };

    // Close OTP modal
    const closeOtpModal = () => {
        otpModal.style.display = 'none';
        resetCountdown();
    };

    // Ensure the close button click event is properly bound
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeOtpModal);
    } else {
        console.error('Close button not found. Ensure it has the class "close-btn"');
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === otpModal) closeOtpModal();
    });

    // Handle OTP input
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && index > 0 && input.value.length === 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    submitOtpBtn.addEventListener('click', () => {
        const otpValue = Array.from(otpInputs).map(input => input.value).join('');
        if (otpValue.length === 6) {
            otpSuccessMsg.style.display = 'block';
            setTimeout(() => {
                closeOtpModal();
                otpSuccessMsg.style.display = 'none';
                // Redirect to verification page
                window.location.href = 'verification-page.html'; // Update with your actual page
            }, 2000);
        } else {
            alert('Please enter a 6-digit OTP');
        }
    });

    // Countdown timer for resend OTP button
    const startCountdown = () => {
        countdown = 59; // Reset countdown
        updateResendOtpButton(false); // Initially disable the button
        countdownElement.textContent = `Resend OTP (${countdown}s)`;
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `Resend OTP (${countdown}s)`;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                updateResendOtpButton(true); // Enable button when countdown is finished
            }
        }, 1000);
    };

    const resetCountdown = () => {
        clearInterval(countdownInterval);
        countdownElement.textContent = '';
        updateResendOtpButton(false); // Disable button when modal is closed
    };

    const updateResendOtpButton = (enabled = false) => {
        resendOtpButton.disabled = !enabled;
        resendOtpButton.classList.toggle('enabled', enabled);
        resendOtpButton.textContent = enabled ? 'Resend OTP' : `Resend OTP (${countdown}s)`;
    };

    // Handle resend OTP
    const handleResendOtp = () => {
        if (!resendOtpButton.disabled) { // Prevent multiple resends before countdown finishes
            console.log('Resending OTP...');
            startCountdown(); // Restart countdown when OTP is resent
        }
    };

    // Attach event listener to resend OTP button
    resendOtpButton.addEventListener('click', handleResendOtp);

    // Optional: Initialize OTP modal if needed
    // showOtpModal();
});
