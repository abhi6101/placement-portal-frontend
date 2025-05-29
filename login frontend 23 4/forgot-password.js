document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const emailInput = document.getElementById("email");
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const resetPasswordButton = document.getElementById("resetPasswordButton");

    // Unified function to show messages with animation (re-used from login.js concept)
    const showAlert = (element, message, type) => {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
        element.offsetHeight; // Trigger reflow
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    };

    // Unified function to hide messages with animation (re-used from login.js concept)
    const hideAlert = (element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(-10px)";
        setTimeout(() => {
            element.style.display = "none";
            element.textContent = "";
        }, 300); // Matches CSS transition
    };

    // Function to show the spinner and disable the button
    const showLoadingState = () => {
        resetPasswordButton.disabled = true;
        resetPasswordButton.classList.add('loading');
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);
    };

    // Function to hide the spinner and enable the button
    const hideLoadingState = () => {
        resetPasswordButton.disabled = false;
        resetPasswordButton.classList.remove('loading');
    };

    forgotPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);

        if (!email) {
            showAlert(errorMessageDiv, "Please enter your email or username.", "error");
            return;
        }

        showLoadingState();

        try {
            // This is the endpoint your backend should provide for initiating password reset
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }), // Send the email/username
            });

            const data = await response.json();

            if (response.ok) {
                showAlert(successMessageDiv, data.message || "A password reset link has been sent to your email address.", "success");
                // Optionally clear the input field after success
                emailInput.value = '';
            } else {
                showAlert(errorMessageDiv, data.message || "Could not process request. Please check your email/username and try again.", "error");
            }
        } catch (error) {
            console.error("Forgot password network error:", error);
            showAlert(errorMessageDiv, "Network error. Please check your internet connection and try again.", "error");
        } finally {
            hideLoadingState();
        }
    });

    // Clear messages when user starts typing again
    emailInput.addEventListener('input', () => {
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);
    });
});