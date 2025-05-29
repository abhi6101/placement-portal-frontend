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

    // Get the persistent alert message div
    const persistentAlertMessageDiv = document.getElementById("persistent-alert-message");

    // Get the span elements for button text and spinner
    const buttonText = registerButton.querySelector(".button-text");
    const spinner = registerButton.querySelector(".spinner");

    // Helper function to display messages (error/success/info)
    function showMessage(element, message, type) {
        // For the persistent message, we'll set innerHTML to support bullet points
        if (element.id === 'persistent-alert-message') {
            element.innerHTML = message; // Use innerHTML for HTML content
        } else {
            element.textContent = message; // Use textContent for plain text
        }
        element.className = `alert alert-${type}`; // Dynamically set class
        element.style.display = "block"; // Show the alert

        // Ensure only one primary message type is shown at a time (error/success)
        // Persistent alert should remain unless form is submitted successfully
        if (type === 'success') {
            errorMessageDiv.style.display = 'none';
            // ONLY HIDE PERSISTENT ALERT ON SUCCESSFUL REGISTRATION
            persistentAlertMessageDiv.style.display = 'none';
        } else if (type === 'error') {
            successMessageDiv.style.display = 'none';
            // Keep persistent alert visible on error
        }
    }

    // Helper function to hide all messages (except persistent for now)
    function hideMessages() {
        errorMessageDiv.style.display = "none";
        errorMessageDiv.textContent = "";
        successMessageDiv.style.display = "none";
        successMessageDiv.textContent = "";
    }

    // Function to show loading state (spinner)
    function showLoadingState() {
        if (registerButton) {
            registerButton.disabled = true;
            registerButton.classList.add('is-loading');
            if (buttonText) buttonText.style.display = "none";
            if (spinner) spinner.style.display = "block";
        }
    }

    // Function to hide loading state
    function hideLoadingState() {
        if (registerButton) {
            registerButton.disabled = false;
            registerButton.classList.remove('is-loading');
            if (buttonText) buttonText.style.display = "inline";
            if (spinner) spinner.style.display = "none";
        }
    }

    // Enhanced message for the persistent alert, formatted for bullet points
    const persistentAlertHTML = `
        <strong>Important Registration Notice:</strong>
        <ul>
            <li>Before you register, please read these instructions carefully.</li>
            <li>You <strong>must</strong> register with an <strong>active email address</strong> because account verification via an OTP sent to your email is required after registration.</li>
            <li>Choose a <strong>memorable password</strong> as there is <strong>no 'Forgot Password' option</strong>.</li>
            <li>If you ever need to change your password, you will have to <strong>contact the administrator</strong> directly.</li>
        </ul>
    `;

    // Step 1: Show the initial JS alert()
    window.onload = function() {
        alert("Before registering, please read the instructions carefully. Click OK to continue.");
        // After OK is clicked, display the persistent message
        showMessage(persistentAlertMessageDiv, persistentAlertHTML, "info");
    };

    // REMOVED: The event listener to hide the persistent alert on input focus
    /*
    const formInputs = registrationForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            persistentAlertMessageDiv.style.display = 'none';
        });
    });
    */

    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        hideMessages(); // Clear any previous error/success messages
        // REMOVED: Hiding persistent message on form submission, it will only hide on success
        // persistentAlertMessageDiv.style.display = 'none';

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

        if (role === "" || role === "--Select Role--") {
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