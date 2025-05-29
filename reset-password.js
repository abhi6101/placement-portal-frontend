document.addEventListener("DOMContentLoaded", () => {
    // 1. Get DOM Elements
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const tokenInput = document.getElementById("token");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const submitResetButton = document.getElementById("submitResetButton");
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    // Unified function to show messages with animation (re-used from login.js concept)
    const showAlert = (element, message, type) => {
        element.textContent = message;
        element.className = `alert alert-${type}`; // Assumes 'alert-error' or 'alert-success' classes exist
        element.style.display = "block";
        element.offsetHeight; // Trigger reflow for animation
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
        }, 300); // Matches CSS transition duration
    };

    // Function to show the spinner and disable the button
    const showLoadingState = () => {
        submitResetButton.disabled = true;
        submitResetButton.classList.add('loading'); // Add 'loading' class for spinner display
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);
    };

    // Function to hide the spinner and enable the button
    const hideLoadingState = () => {
        submitResetButton.disabled = false;
        submitResetButton.classList.remove('loading'); // Remove 'loading' class
    };

    // 2. Extract Token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Get the token from the URL query parameter

    if (token) {
        tokenInput.value = token; // Populate the hidden token input field
    } else {
        // If no token is found, display an error and prevent form submission
        showAlert(errorMessageDiv, "No reset token found. Please use the link from your email.", "error");
        submitResetButton.disabled = true; // Disable the button
        submitResetButton.style.cursor = 'not-allowed';
    }

    // 3. Add Event Listener for Form Submission
    resetPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear any previous messages
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);

        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const resetToken = tokenInput.value; // Get the token from the hidden input

        // Client-side Validation
        if (!resetToken) {
            showAlert(errorMessageDiv, "Password reset token is missing. Please refresh the page or request a new link.", "error");
            return;
        }

        if (!newPassword) {
            showAlert(errorMessageDiv, "Please enter your new password.", "error");
            return;
        }

        if (newPassword.length < 8) {
            showAlert(errorMessageDiv, "Password must be at least 8 characters long.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert(errorMessageDiv, "Passwords do not match. Please try again.", "error");
            return;
        }

        showLoadingState(); // Show loading spinner

        try {
            // API Endpoint for Resetting Password
            // Ensure this matches your backend's endpoint for password reset confirmation
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: resetToken, newPassword: newPassword }),
            });

            const data = await response.json(); // Parse the JSON response

            if (response.ok) {
                showAlert(successMessageDiv, data.message || "Your password has been successfully reset. You can now log in.", "success");
                // Optionally, clear the password fields
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
                // Redirect to login page after a short delay for user to read success message
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to your login page
                }, 3000); // Redirect after 3 seconds
            } else {
                // Handle non-2xx responses (errors from backend)
                showAlert(errorMessageDiv, data.message || "Failed to reset password. The link might be invalid or expired.", "error");
            }
        } catch (error) {
            // Handle network errors or other unexpected issues
            console.error("Reset password network error:", error);
            showAlert(errorMessageDiv, "Network error. Please check your internet connection and try again.", "error");
        } finally {
            hideLoadingState(); // Always hide loading spinner, regardless of success or failure
        }
    });

    // Clear messages when user starts typing again
    newPasswordInput.addEventListener('input', () => {
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);
    });

    confirmPasswordInput.addEventListener('input', () => {
        hideAlert(errorMessageDiv);
        hideAlert(successMessageDiv);
    });
});