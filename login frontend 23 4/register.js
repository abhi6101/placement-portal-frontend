document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const registerSection = document.querySelector(".register"); // Reference to the parent <section>

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    const persistentAlertMessageDiv = document.getElementById("persistent-alert-message");
    const instructionContentDiv = document.getElementById("instruction-content");
    const instructionErrorMessageDiv = document.getElementById("instruction-error-message");

    const readInstructionsCheckbox = document.getElementById("readInstructionsCheckbox");
    const proceedToRegisterBtn = document.getElementById("proceedToRegisterBtn");

    const registerButton = document.querySelector("#registrationForm button[type='submit']");
    const buttonText = registerButton.querySelector(".button-text");
    const spinner = registerButton.querySelector(".spinner");

    // Helper function to display messages
    function showMessage(element, message, type) {
        if (element.id === 'persistent-alert-message' || element.id === 'instruction-content') {
            element.innerHTML = message;
        } else {
            element.textContent = message;
        }
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    // Helper function to hide specific message elements
    function hideElement(element) {
        element.style.display = "none";
        element.textContent = "";
        element.innerHTML = "";
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
            <li>You must register with an active email address because account verification via an OTP sent to your email is required after registration.</li>
            <li>Choose a memorable password as there is no 'Forgot Password' option.</li>
            <li>If you ever need to change your password, you will have to contact the administrator directly.</li>
        </ul>
    `;

    // --- Initial Page Load Logic ---
    // Removed window.onload with alert()
    // Now, the persistent message is shown directly on DOMContentLoaded
    showMessage(instructionContentDiv, persistentAlertHTML, "info"); // Populate the inner div with content
    persistentAlertMessageDiv.style.display = 'block'; // Ensure the instruction container is visible
    registerSection.style.display = 'none'; // Ensure the main form section is hidden initially

    hideElement(errorMessageDiv);
    hideElement(successMessageDiv);

    // --- Logic for "Proceed to Registration" button ---
    proceedToRegisterBtn.addEventListener('click', () => {
        if (readInstructionsCheckbox.checked) {
            hideElement(instructionErrorMessageDiv);

            persistentAlertMessageDiv.style.display = 'none';
            registerSection.style.display = 'block'; // Show the entire registration section

            registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            showMessage(instructionErrorMessageDiv, "Please confirm you have read and understood the instructions to proceed.", "error");
        }
    });

    // --- Registration Form Submission Logic ---
    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        hideElement(errorMessageDiv);
        hideElement(successMessageDiv);

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = roleInput.value;

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

        showLoadingState();

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
                registrationForm.reset();

                setTimeout(() => {
                    window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
                }, 3000);
            } else {
                showMessage(errorMessageDiv, result.message || "Registration failed. Please try again.", "error");
            }
        } catch (error) {
            showMessage(errorMessageDiv, "Registration failed. Please check your network connection and try again.", "error");
            console.error("Registration error:", error);
        } finally {
            hideLoadingState();
        }
    });
});