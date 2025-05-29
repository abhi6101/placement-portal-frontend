document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const registerButton = document.querySelector("#registrationForm button[type='submit']");

    // NEW: Get the initial alert message div
    const initialAlertMessageDiv = document.getElementById("initial-alert-message");

    // Get the span elements for button text and spinner
    const buttonText = registerButton.querySelector(".button-text");
    const spinner = registerButton.querySelector(".spinner");

    // Helper function to display messages (error/success/info)
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `alert alert-${type}`; // Dynamically set class
        element.style.display = "block"; // Show the alert

        // Ensure only one primary message type is shown at a time (error/success)
        // Initial alert can coexist or be hidden based on preference
        if (type === 'success') {
            errorMessageDiv.style.display = 'none';
            initialAlertMessageDiv.style.display = 'none'; // Hide initial alert on success
        } else if (type === 'error') {
            successMessageDiv.style.display = 'none';
            initialAlertMessageDiv.style.display = 'none'; // Hide initial alert on error
        }
    }

    // Helper function to hide all messages
    function hideMessages() {
        errorMessageDiv.style.display = "none";
        errorMessageDiv.textContent = "";
        successMessageDiv.style.display = "none";
        successMessageDiv.textContent = "";
        // Keep initial alert visible unless explicitly hidden by showMessage or user interaction
    }

    // Function to show loading state (spinner)
    function showLoadingState() {
        if (registerButton) { // Ensure button exists before manipulating
            registerButton.disabled = true;
            registerButton.classList.add('is-loading');
            if (buttonText) buttonText.style.display = "none"; // Hide button text
            if (spinner) spinner.style.display = "block"; // Show spinner
        }
    }

    // Function to hide loading state
    function hideLoadingState() {
        if (registerButton) { // Ensure button exists before manipulating
            registerButton.disabled = false;
            registerButton.classList.remove('is-loading');
            if (buttonText) buttonText.style.display = "inline"; // Show button text
            if (spinner) spinner.style.display = "none"; // Hide spinner
        }
    }

    // NEW: Enhanced initial alert message
    const initialAlertText = `
        **Welcome to the Placement Portal! Just a Quick Read Before You Sign Up...**

    We're excited to have you! To make your registration process as smooth as possible and ensure your account stays secure, please keep these important notes in mind:

    * **Your Go-To Email:** We'll send an **OTP (One-Time Password)** to verify your account right after you register. Please use an **active email address** that you can access instantly.
    * **Memorable Password, Please:** This is crucial! We don't have a "Forgot Password" feature, so pick a password you're confident you won't forget.
    * **Admin Support for Changes:** If you ever need to update your password in the future, you'll need to **contact the administrator** directly for assistance.

    Your cooperation helps us maintain a secure and efficient platform. Happy registering!
    `;

    // Display the initial alert message when the page loads
    showMessage(initialAlertMessageDiv, initialAlertText, "info");


    // Optional: Hide the initial alert when the user starts typing in any input field
    const formInputs = registrationForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            initialAlertMessageDiv.style.display = 'none';
        });
    });


    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        hideMessages(); // Clear any previous error/success messages
        initialAlertMessageDiv.style.display = 'none'; // Hide initial message on form submission

        // Form validation
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = roleInput.value;

        // --- Start Form Validations ---
        if (username === "") {
            showMessage(errorMessageDiv, "Username cannot be empty.", "error");
            return;
        }

        if (username.includes(" ")) {
            showMessage(errorMessageDiv, "Username cannot contain spaces.", "error");
            return;
        }

        if (!username.startsWith('@')) {
            showMessage(errorMessageDiv, "Username must start with '@'.", "error");
            return;
        }

        const usernameWithoutAt = username.substring(1);
        if (usernameWithoutAt !== usernameWithoutAt.toLowerCase()) {
            showMessage(errorMessageDiv, "The part of the username after '@' must be in lowercase.", "error");
            return;
        }

        if (email === "") {
            showMessage(errorMessageDiv, "Email Address cannot be empty.", "error");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(errorMessageDiv, "Please enter a valid email address.", "error");
            return;
        }

        if (role === "" || role === "--Select Role--") { // Added check for default select option text
            showMessage(errorMessageDiv, "Please select a role.", "error");
            return;
        }

        if (password.length < 8) {
            showMessage(errorMessageDiv, "Password must be at least 8 characters long.", "error");
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
        if (!passwordRegex.test(password)) {
            showMessage(errorMessageDiv, "Password must contain at least 1 number and 1 special character.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage(errorMessageDiv, "Passwords do not match.", "error");
            return;
        }
        // --- End Form Validations ---

        showLoadingState(); // Show spinner and disable button

        // --- Start Registration Request ---
        const userData = {
            username: username,
            email: email,
            password: password,
            role: role,
        };

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(successMessageDiv, result.message || "Registration successful! Please check your email for the verification code.", "success");
                registrationForm.reset(); // Clear the form on successful registration

                // NEW: Redirect to the verification page, passing the email for convenience
                setTimeout(() => {
                    window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
                }, 3000); // Give user time to read success message
            } else {
                showMessage(errorMessageDiv, result.message || "Registration failed. Please try again.", "error");
            }
        } catch (error) {
            showMessage(errorMessageDiv, "Registration failed. Please check your network connection and try again.", "error");
            console.error("Registration error:", error);
        } finally {
            hideLoadingState(); // Always hide spinner and re-enable button
        }
    });
});