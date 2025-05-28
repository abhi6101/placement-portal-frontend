document.addEventListener('DOMContentLoaded', () => {
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const identifierInput = document.getElementById('identifier');
    const verificationCodeInput = document.getElementById('verificationCode');
    const errorMessageDiv = document.getElementById('error-message');
    const successMessageDiv = document.getElementById('success-message');
    const verifyButton = document.querySelector("#verifyCodeForm button[type='submit']");

    // Attempt to pre-fill email if passed as a URL parameter from register.js
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
        identifierInput.value = decodeURIComponent(emailFromUrl);
    }

    verifyCodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';
        successMessageDiv.textContent = '';

        const identifier = identifierInput.value.trim();
        const code = verificationCodeInput.value.trim();

        if (identifier === "") {
            errorMessageDiv.textContent = "Please enter your email or username.";
            errorMessageDiv.style.display = 'block';
            return;
        }

        if (code === "" || code.length !== 6 || !/^\d+$/.test(code)) {
            errorMessageDiv.textContent = "Please enter a valid 6-digit verification code.";
            errorMessageDiv.style.display = 'block';
            return;
        }

        if (verifyButton) {
            verifyButton.classList.add('is-loading');
            verifyButton.disabled = true;
            verifyButton.innerHTML = 'Verifying... <i class="fas fa-spinner fa-spin"></i>';
        }

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
                successMessageDiv.textContent = result.message || "Account verified successfully! Redirecting to login...";
                successMessageDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to login page after success
                }, 3000);
            } else {
                errorMessageDiv.textContent = result.message || "Verification failed. Please check your code or try again.";
                errorMessageDiv.style.display = 'block';
            }
        } catch (error) {
            console.error("Verification error:", error);
            errorMessageDiv.textContent = "Network error. Could not verify account. Please try again.";
            errorMessageDiv.style.display = 'block';
        } finally {
            if (verifyButton) {
                verifyButton.classList.remove('is-loading');
                verifyButton.disabled = false;
                verifyButton.innerHTML = 'Verify Account <i class="fas fa-check-circle"></i>';
            }
        }
    });
});