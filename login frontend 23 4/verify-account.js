document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching ---
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const identifierInput = document.getElementById('identifier');
    const verificationCodeInput = document.getElementById('verificationCode');
    const alertContainer = document.getElementById('alert-container');
    const verifyButton = document.getElementById('verifyButton');
    
    const identifierFeedback = document.getElementById('identifier-feedback');
    const verificationCodeFeedback = document.getElementById('verificationCode-feedback');

    // --- 2. Helper Functions ---
    const showAlert = (message, type) => {
        alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    };

    const clearAlerts = () => {
        alertContainer.innerHTML = '';
    };

    const showInputError = (feedbackEl, message) => {
        feedbackEl.textContent = message;
        feedbackEl.style.display = 'block';
    };

    const clearInputError = (feedbackEl) => {
        feedbackEl.textContent = '';
        feedbackEl.style.display = 'none';
    };
    
    const setLoadingState = (isLoading) => {
        if (verifyButton) {
            verifyButton.disabled = isLoading;
            isLoading ? verifyButton.classList.add('is-loading') : verifyButton.classList.remove('is-loading');
        }
    };

    // --- 3. Initial Setup ---
    // Pre-fill email from URL parameter if available
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
        identifierInput.value = decodeURIComponent(emailFromUrl);
    }

    // Clear feedback when user starts typing
    identifierInput.addEventListener('input', () => clearInputError(identifierFeedback));
    verificationCodeInput.addEventListener('input', () => {
        // Automatically format OTP input
        verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, '').substring(0, 6);
        clearInputError(verificationCodeFeedback);
    });

    // --- 4. Form Submission Logic ---
    verifyCodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAlerts();
        clearInputError(identifierFeedback);
        clearInputError(verificationCodeFeedback);

        const identifier = identifierInput.value.trim();
        const code = verificationCodeInput.value.trim();
        let isValid = true;

        if (!identifier) {
            showInputError(identifierFeedback, "Email or username is required.");
            isValid = false;
        }
        if (!code || !/^\d{6}$/.test(code)) {
            showInputError(verificationCodeFeedback, "Please enter a valid 6-digit code.");
            isValid = false;
        }

        if (!isValid) return;

        setLoadingState(true);

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, code })
            });

            const result = await response.json();

            if (response.ok) {
                showAlert(result.message || "Account verified successfully! Redirecting to login...", "success");
                verifyButton.disabled = true; // Prevent re-submission after success
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            } else {
                showAlert(result.message || "Verification failed. Please check your code or identifier.", "error");
                setLoadingState(false);
            }
        } catch (error) {
            console.error("Verification error:", error);
            showAlert("A network error occurred. Please try again.", "error");
            setLoadingState(false);
        }
    });
});