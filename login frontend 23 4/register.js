document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENT SELECTORS ---
    const registrationForm = document.getElementById("registrationForm");
    const registerCard = document.querySelector(".register-card");
    const instructionCard = document.getElementById("persistent-alert-message");
    
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    
    // Correctly selecting password inputs
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    
    const instructionContentDiv = document.getElementById("instruction-content");
    const instructionErrorMessageDiv = document.getElementById("instruction-error-message");

    const readInstructionsCheckbox = document.getElementById("readInstructionsCheckbox");
    const proceedToRegisterBtn = document.getElementById("proceedToRegisterBtn");

    const registerButton = document.getElementById("registerButton");
    
    // --- HELPER FUNCTIONS ---
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

    // --- EVENT LISTENERS ---

    // Logic for "Proceed to Registration" button
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
        }, 600);
    });
    
    // *** FIX: Corrected Password Visibility Toggle Logic ***
    document.querySelectorAll('.toggle-password-visibility').forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Get the input element this toggle is associated with
            const input = this.previousElementSibling; 
            const isPassword = input.getAttribute('type') === 'password';

            if (isPassword) {
                input.setAttribute('type', 'text');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.setAttribute('type', 'password');
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Registration form submission
    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideElement(errorMessageDiv);
        hideElement(successMessageDiv);

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = 'USER'; // Hardcoded role as per your form

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
                body: JSON.stringify({ username, email, password, role }),
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
});