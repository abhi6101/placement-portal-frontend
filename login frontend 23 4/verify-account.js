document.addEventListener('DOMContentLoaded', () => {
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const identifierInput = document.getElementById('identifier');
    const verificationCodeInput = document.getElementById('verificationCode');
    const alertContainer = document.getElementById('alert-container'); // Container for dynamic alerts
    const verifyButton = document.querySelector("#verifyCodeForm button[type='submit']");

    // Input feedback elements
    const identifierFeedback = document.getElementById('identifier-feedback');
    const verificationCodeFeedback = document.getElementById('verificationCode-feedback');

    // Function to show an alert
    const showAlert = (message, type) => {
        // Clear existing alerts
        alertContainer.innerHTML = ''; 
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertContainer.appendChild(alertDiv);
        alertDiv.style.display = 'block'; // Ensure it's visible
    };

    // Function to hide input feedback
    const hideInputFeedback = (inputElement, feedbackElement) => {
        inputElement.classList.remove('is-invalid');
        feedbackElement.textContent = '';
        feedbackElement.style.display = 'none';
    };

    // Function to show input feedback
    const showInputFeedback = (inputElement, feedbackElement, message) => {
        inputElement.classList.add('is-invalid');
        feedbackElement.textContent = message;
        feedbackElement.style.display = 'block';
    };

    // Attempt to pre-fill email if passed as a URL parameter from register.js
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
        identifierInput.value = decodeURIComponent(emailFromUrl);
    }

    // Event listeners for input validation on change/blur
    identifierInput.addEventListener('input', () => hideInputFeedback(identifierInput, identifierFeedback));
    verificationCodeInput.addEventListener('input', () => {
        // Only allow digits and limit length to 6
        verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, '').substring(0, 6);
        hideInputFeedback(verificationCodeInput, verificationCodeFeedback);
    });

    verifyCodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous alerts and feedback
        alertContainer.innerHTML = '';
        hideInputFeedback(identifierInput, identifierFeedback);
        hideInputFeedback(verificationCodeInput, verificationCodeFeedback);

        const identifier = identifierInput.value.trim();
        const code = verificationCodeInput.value.trim();

        let isValid = true;

        if (identifier === "") {
            showInputFeedback(identifierInput, identifierFeedback, "Email or username is required.");
            isValid = false;
        }

        // Basic validation for OTP
        if (code === "") {
            showInputFeedback(verificationCodeInput, verificationCodeFeedback, "Verification code is required.");
            isValid = false;
        } else if (code.length !== 6 || !/^\d{6}$/.test(code)) {
            showInputFeedback(verificationCodeInput, verificationCodeFeedback, "Please enter a valid 6-digit code.");
            isValid = false;
        }

        if (!isValid) {
            showAlert("Please correct the errors in the form.", "error");
            return;
        }

        // Show loading state
        verifyButton.classList.add('is-loading');
        verifyButton.disabled = true;
        verifyButton.innerHTML = 'Verifying... <i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ identifier, code })
            });

            const result = await response.json();

            if (response.ok) {
                showAlert(result.message || "Account verified successfully! Redirecting to login...", "success");
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to login page after success
                }, 3000);
            } else {
                // Handle specific error messages from the backend
                let errorMessage = "Verification failed. Please check your code or try again.";
                if (result.message) {
                    errorMessage = result.message;
                } else if (result.errors && result.errors.length > 0) {
                    errorMessage = result.errors.map(err => err.msg).join(' ');
                }
                showAlert(errorMessage, "error");
            }
        } catch (error) {
            console.error("Verification error:", error);
            showAlert("Network error. Could not verify account. Please try again.", "error");
        } finally {
            // Revert loading state
            verifyButton.classList.remove('is-loading');
            verifyButton.disabled = false;
            verifyButton.innerHTML = 'Verify Account <i class="fas fa-check-circle"></i>';
        }
    });
});