document.addEventListener('DOMContentLoaded', () => {
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const identifierInput = document.getElementById('identifier');
    const alertContainer = document.getElementById('alert-container');
    const verifyButton = verifyCodeForm.querySelector("button[type='submit']");
    
    // Feedback elements
    const identifierFeedback = document.getElementById('identifier-feedback');
    const verificationCodeFeedback = document.getElementById('verificationCode-feedback');
    
    // --- START: New Elements for OTP and Resend ---
    const otpInputs = document.querySelectorAll('.otp-input');
    const resendLink = document.getElementById('resend-otp-link');
    const resendTimerSpan = document.getElementById('resend-timer');
    let resendInterval;
    // --- END: New Elements ---

    const showAlert = (message, type) => {
        alertContainer.innerHTML = '';
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertContainer.appendChild(alertDiv);
    };

    const hideInputFeedback = (feedbackElement) => {
        feedbackElement.textContent = '';
        feedbackElement.style.display = 'none';
    };

    const showInputFeedback = (feedbackElement, message) => {
        feedbackElement.textContent = message;
        feedbackElement.style.display = 'block';
    };

    // Pre-fill email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
        identifierInput.value = decodeURIComponent(emailFromUrl);
    }

    // --- START: OTP Input Handling Logic ---
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            // Move to next input if a digit is entered
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            // Clear feedback on input
            verificationCodeFeedback.style.display = 'none';
            otpInputs.forEach(i => i.classList.remove('is-invalid'));
        });

        input.addEventListener('keydown', (e) => {
            // Move to previous input on backspace if current is empty
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Paste handling
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            if (pasteData.length === otpInputs.length && /^\d+$/.test(pasteData)) {
                otpInputs.forEach((box, i) => {
                    box.value = pasteData[i];
                });
                verifyButton.focus(); // Move focus to the button after paste
            }
        });
    });
    // --- END: OTP Input Handling Logic ---

    // --- START: Resend OTP Logic ---
    const startResendTimer = (duration) => {
        resendLink.classList.add('disabled');
        resendLink.style.display = 'none';
        resendTimerSpan.style.display = 'inline';
        
        let timer = duration;
        resendInterval = setInterval(() => {
            const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
            const seconds = String(timer % 60).padStart(2, '0');
            resendTimerSpan.textContent = `in ${minutes}:${seconds}`;
            
            if (--timer < 0) {
                clearInterval(resendInterval);
                resendTimerSpan.style.display = 'none';
                resendLink.style.display = 'inline';
                resendLink.classList.remove('disabled');
            }
        }, 1000);
    };

    resendLink.addEventListener('click', async (e) => {
        e.preventDefault();
        if (resendLink.classList.contains('disabled')) return;

        const identifier = identifierInput.value.trim();
        if (!identifier) {
            showInputFeedback(identifierFeedback, "Please enter your email/username to resend the code.");
            return;
        }
        hideInputFeedback(identifierFeedback);
        showAlert("Sending a new code...", "success");

        try {
            // **NOTE**: You need a backend endpoint for this!
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/resend-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier })
            });
            
            const result = await response.json();
            if (response.ok) {
                showAlert(result.message || "A new code has been sent to your email.", "success");
                startResendTimer(30); // Start a 30-second timer
            } else {
                showAlert(result.message || "Failed to resend code. Please try again.", "error");
            }
        } catch (error) {
            showAlert("Network error. Could not resend code.", "error");
        }
    });

    // Start the timer on page load
    startResendTimer(30);
    // --- END: Resend OTP Logic ---

    verifyCodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alertContainer.innerHTML = '';
        hideInputFeedback(identifierFeedback);
        hideInputFeedback(verificationCodeFeedback);

        const identifier = identifierInput.value.trim();
        const code = Array.from(otpInputs).map(input => input.value).join('');

        let isValid = true;
        if (identifier === "") {
            showInputFeedback(identifierFeedback, "Email or username is required.");
            isValid = false;
        }
        if (code.length !== 6) {
            showInputFeedback(verificationCodeFeedback, "Please enter the complete 6-digit code.");
            otpInputs.forEach(i => i.classList.add('is-invalid'));
            isValid = false;
        }

        if (!isValid) return;

        verifyButton.disabled = true;
        verifyButton.innerHTML = 'Verifying... <i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, code })
            });
            const result = await response.json();

            if (response.ok) {
                showAlert(result.message || "Account verified successfully! Redirecting...", "success");
                setTimeout(() => { window.location.href = "login.html"; }, 3000);
            } else {
                showAlert(result.message || "Verification failed.", "error");
                otpInputs.forEach(i => i.classList.add('is-invalid')); // Shake animation on error
            }
        } catch (error) {
            showAlert("Network error. Please try again.", "error");
        } finally {
            verifyButton.disabled = false;
            verifyButton.innerHTML = 'Verify Account <i class="fas fa-check-circle"></i>';
        }
    });
});