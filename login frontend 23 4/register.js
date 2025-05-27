// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get references to form elements and message displays
    const registrationForm = document.getElementById("registrationForm");
    const registerButton = document.getElementById("registerButton");
    const loadingIndicator = document.getElementById("loadingIndicator");

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    // Add an event listener for the form submission
    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Clear any previously displayed messages
        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';
        successMessageDiv.textContent = '';

        // --- Client-side Validation ---
        let isValid = true;
        let messages = [];

        const usernameValue = usernameInput.value.trim(); // Get and trim username

        // Username validation: Required and no spaces
        if (usernameValue === "") {
            messages.push("Full Name is required.");
            isValid = false;
        } else if (usernameValue.includes(" ")) {
            messages.push("Full Name cannot contain spaces. Please use a continuous name or hyphens/underscores if needed.");
            isValid = false;
        }

        const emailValue = emailInput.value.trim(); // Get and trim email

        // Email validation: Required and basic format check
        if (emailValue === "") {
            messages.push("Email Address is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) { // Basic regex for email format
            messages.push("Please enter a valid email address (e.g., example@domain.com).");
            isValid = false;
        }

        // Role validation: Required
        if (roleInput.value === "") {
            messages.push("Please select a role.");
            isValid = false;
        }

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Password complexity validation
        if (password.length < 8) {
            messages.push("Password must be at least 8 characters long.");
            isValid = false;
        }
        if (!/[0-9]/.test(password)) {
            messages.push("Password must contain at least one number.");
            isValid = false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            messages.push("Password must contain at least one special character.");
            isValid = false;
        }
        if (!/[A-Z]/.test(password)) {
            messages.push("Password must contain at least one uppercase letter.");
            isValid = false;
        }
        if (!/[a-z]/.test(password)) {
            messages.push("Password must contain at least one lowercase letter.");
            isValid = false;
        }

        // Confirm Password validation: Must match password
        if (password !== confirmPassword) {
            messages.push("Passwords do not match. Please re-enter.");
            isValid = false;
        }

        // If validation fails, display errors and stop
        if (!isValid) {
            errorMessageDiv.innerHTML = messages.join("<br>"); // Join messages with line breaks
            errorMessageDiv.style.display = 'block';
            return; // Stop the function here
        }

        // --- UI Feedback: Hide button and show loading indicator ---
        registerButton.style.display = 'none'; // Hide the "Register Now" button
        registerButton.disabled = true;       // Disable it to prevent multiple clicks
        loadingIndicator.style.display = 'block'; // Show the "Registering..." message

        // Prepare user data for API call
        const userData = {
            username: usernameValue,
            email: emailValue,
            password: password,
            role: roleInput.value,
        };

        try {
            // Send registration data to the backend API
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            // Parse the JSON response from the backend
            const result = await response.json();

            // Check if the HTTP response was successful (status 200-299)
            if (response.ok) {
                // Store minimal user data in localStorage (consider security if this affects auth)
                localStorage.setItem('userData', JSON.stringify({
                    username: userData.username,
                    role: userData.role
                }));

                successMessageDiv.textContent = result.message || "Registration successful! Redirecting to login...";
                successMessageDiv.style.display = 'block';

                e.target.reset(); // Clear all form fields

                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);

            } else {
                // Handle errors returned from the API (e.g., duplicate email)
                errorMessageDiv.textContent = result.message || "Registration failed. An unknown error occurred.";
                errorMessageDiv.style.display = 'block';
            }
        } catch (error) {
            // Handle network errors (e.g., server unreachable, no internet)
            errorMessageDiv.textContent = "Network error. Registration failed. Please check your internet connection and try again.";
            errorMessageDiv.style.display = 'block';
            console.error("Fetch Error:", error);
        } finally {
            // --- UI Feedback: Always reset button state after API call completes ---
            // Only re-show/re-enable if not already redirecting (as redirect reloads the page)
            if (!successMessageDiv.textContent.includes("Redirecting")) {
                registerButton.style.display = 'block'; // Show the button again
                registerButton.disabled = false;       // Re-enable the button
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        }
    });
});