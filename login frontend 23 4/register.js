document.addEventListener("DOMContentLoaded", () => {
    // --- STEP 1: ELEMENTS FOR THE INSTRUCTION CARD (Always visible at start) ---
    const instructionCard = document.getElementById("persistent-alert-message");
    const instructionContentDiv = document.getElementById("instruction-content");
    const instructionErrorMessageDiv = document.getElementById("instruction-error-message");
    const readInstructionsCheckbox = document.getElementById("readInstructionsCheckbox");
    const proceedToRegisterBtn = document.getElementById("proceedToRegisterBtn");
    const registerCard = document.querySelector(".register-card");

    // --- HELPER FUNCTIONS (Universal) ---
    function showMessage(element, message, type) {
        element.innerHTML = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    function hideElement(element) {
        element.style.display = "none";
    }

    function setLoadingState(button, isLoading) {
        button.disabled = isLoading;
        if (isLoading) {
            button.classList.add('loading');
        } else {
            button.classList.remove('loading');
        }
    }

    // --- INITIAL PAGE SETUP ---
    const instructionHTML = `
        <strong>Important Registration Notice:</strong>
        <ul>
            <li>Please read these instructions carefully before you register.</li>
            <li>Use an active email, as OTP verification is required.</li>
            <li>Choose a memorable password; there is no 'Forgot Password' option.</li>
            <li>Contact the administrator directly if you need to change your password.</li>
        </ul>
    `;
    showMessage(instructionContentDiv, instructionHTML, "info");

    // --- EVENT LISTENER FOR PROCEED BUTTON ---
    proceedToRegisterBtn.addEventListener('click', () => {
        if (!readInstructionsCheckbox.checked) {
            showMessage(instructionErrorMessageDiv, "Please confirm you have read the instructions.", "error");
            return;
        }

        hideElement(instructionErrorMessageDiv);
        instructionCard.classList.add('blur-hide');

        setTimeout(() => {
            hideElement(instructionCard);
            registerCard.classList.add('show-form');
            registerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // *** FIX: INITIALIZE FORM LOGIC *AFTER* IT BECOMES VISIBLE ***
            initializeRegistrationForm();
        }, 600);
    });

    // --- FUNCTION TO SET UP THE REGISTRATION FORM ---
    function initializeRegistrationForm() {
        // Find elements *now* that the card is visible
        const registrationForm = document.getElementById("registrationForm");
        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const errorMessageDiv = document.getElementById("error-message");
        const successMessageDiv = document.getElementById("success-message");
        const registerButton = document.getElementById("registerButton");

        // Attach password visibility toggle listeners
        document.querySelectorAll('.toggle-password-visibility').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });

        // Attach form submission listener
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            hideElement(errorMessageDiv);
            hideElement(successMessageDiv);

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // --- FORM VALIDATION ---
            if (!username.startsWith('@') || username.substring(1) !== username.substring(1).toLowerCase() || username.includes(" ")) {
                showMessage(errorMessageDiv, "Username must start with '@', be lowercase, and have no spaces.", "error");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage(errorMessageDiv, "Please enter a valid email address.", "error");
                return;
            }
            if (password.length < 8 || !/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/.test(password)) {
                showMessage(errorMessageDiv, "Password must be 8+ characters with a number and special character.", "error");
                return;
            }
            if (password !== confirmPassword) {
                showMessage(errorMessageDiv, "Passwords do not match.", "error");
                return;
            }
            // --- END VALIDATION ---

            setLoadingState(registerButton, true);

            try {
                const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password, role: 'USER' }),
                });
                const result = await response.json();

                if (response.ok) {
                    showMessage(successMessageDiv, "Registration successful! Redirecting to verify your account...", "success");
                    registrationForm.reset();
                    setTimeout(() => {
                        window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
                    }, 3000);
                } else {
                    showMessage(errorMessageDiv, result.message || "Registration failed. Please try again.", "error");
                }
            } catch (error) {
                console.error("Registration error:", error);
                showMessage(errorMessageDiv, "Registration failed. Check your network and try again.", "error");
            } finally {
                setLoadingState(registerButton, false);
            }
        });
    }
});