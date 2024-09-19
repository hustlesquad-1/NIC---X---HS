document.addEventListener('DOMContentLoaded', () => {
    const otpModal = document.getElementById('otp-modal');
    const submitOtpBtn = document.getElementById('submit-otp-btn');
    const otpSuccessMsg = document.getElementById('otp-success-msg');
    const otpInputs = document.querySelectorAll('.otp-input');
    const countdownElement = document.getElementById('countdown');
    const resendOtpButton = document.getElementById('resend-otp-btn');
    let countdown = 59;
    let countdownInterval;

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

    // Handle OTP input navigation
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

    // OTP Submit Button Click Handler
    submitOtpBtn.addEventListener('click', function(event) {
        let otp = Array.from(otpInputs).map(input => input.value).join('');
        
        // Assuming '123456' is the correct OTP for demo purposes
        if (otp === '123456') {
            // Show success message
            otpSuccessMsg.style.display = 'block';

            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to index.html
            }, 2000);
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    });

    // Countdown timer for resend OTP button
    const startCountdown = () => {
        countdown = 59; 
        updateResendOtpButton(false); // Initially disable the button
        countdownElement.textContent = `${countdown}s`;
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `${countdown}s`;
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

    // Handle resend OTP button click
    resendOtpButton.addEventListener('click', () => {
        if (!resendOtpButton.disabled) {
            console.log('Resending OTP...');
            startCountdown(); // Restart countdown when OTP is resent
        }
    });

    // Show the OTP modal (you can trigger this from somewhere else if needed)
    // showOtpModal();
});
