document.addEventListener("DOMContentLoaded", () => {
    // --- Element Caching ---
    const registrationForm = document.getElementById("registrationForm");
    const registerFormCard = document.getElementById("register-form-card");
    const instructionsCard = document.getElementById("instructions-card");

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const instructionContentDiv = document.getElementById("instruction-content");
    const instructionErrorMessageDiv = document.getElementById("instruction-error-message");

    const readInstructionsCheckbox = document.getElementById("readInstructionsCheckbox");
    const proceedToRegisterBtn = document.getElementById("proceedToRegisterBtn");
    const registerButton = document.getElementById("registerButton");

    // --- Helper Functions ---
    const showMessage = (element, message, type) => {
        element.innerHTML = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    };

    const hideElement = (element) => {
        element.style.display = "none";
        element.innerHTML = "";
    };

    const setLoadingState = (isLoading) => {
        if (registerButton) {
            registerButton.disabled = isLoading;
            isLoading ? registerButton.classList.add('is-loading') : registerButton.classList.remove('is-loading');
        }
    };

    // --- Initial Page Setup ---
    const instructionsHTML = `
        <strong>Important Registration Instructions:</strong>
        <ul>
            <li>You must register with an active email for account verification (OTP).</li>
            <li>Choose a memorable password, as there is no 'Forgot Password' feature.</li>
            <li>To change your password later, you must contact an administrator.</li>
        </ul>
    `;
    showMessage(instructionContentDiv, instructionsHTML, "info");
    registerFormCard.style.display = 'none';

    // --- Event Listeners ---
    proceedToRegisterBtn.addEventListener('click', () => {
        if (readInstructionsCheckbox.checked) {
            hideElement(instructionErrorMessageDiv);
            instructionsCard.classList.add('blur-hide');
            
            // Wait for the transition to finish before swapping displays
            setTimeout(() => {
                instructionsCard.style.display = 'none';
                registerFormCard.style.display = 'block';
            }, 500); // Matches the CSS transition duration
        } else {
            showMessage(instructionErrorMessageDiv, "Please confirm you have read the instructions.", "error");
        }
    });

    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideElement(errorMessageDiv);
        hideElement(successMessageDiv);

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = roleInput.value;

        // --- Client-Side Validation ---
        if (!username.startsWith('@') || username.includes(" ") || username.substring(1).toLowerCase() !== username.substring(1)) {
            showMessage(errorMessageDiv, "Username must start with '@', be lowercase, and contain no spaces.", "error");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(errorMessageDiv, "Please enter a valid email address.", "error");
            return;
        }
        if (!role) {
            showMessage(errorMessageDiv, "Please select a role.", "error");
            return;
        }
        if (password.length < 8 || !/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/.test(password)) {
            showMessage(errorMessageDiv, "Password must be at least 8 characters with 1 number and 1 special character.", "error");
            return;
        }
        if (password !== confirmPassword) {
            showMessage(errorMessageDiv, "Passwords do not match.", "error");
            return;
        }

        setLoadingState(true);

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, role }),
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(successMessageDiv, result.message || "Registration successful! Redirecting to email verification...", "success");
                registrationForm.reset();
                setTimeout(() => {
                    window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
                }, 3000);
            } else {
                showMessage(errorMessageDiv, result.message || "Registration failed.", "error");
                setLoadingState(false);
            }
        } catch (error) {
            showMessage(errorMessageDiv, "Network error. Please try again.", "error");
            setLoadingState(false);
        }
    });
});