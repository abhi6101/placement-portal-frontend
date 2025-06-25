document.addEventListener("DOMContentLoaded", () => {
    // Select all elements at the start
    const instructionCard = document.getElementById("persistent-alert-message");
    const registerCard = document.querySelector(".register-card");
    const proceedToRegisterBtn = document.getElementById("proceedToRegisterBtn");
    const readInstructionsCheckbox = document.getElementById("readInstructionsCheckbox");
    const instructionErrorMessageDiv = document.getElementById("instruction-error-message");
    const instructionContentDiv = document.getElementById("instruction-content");
    const registrationForm = document.getElementById("registrationForm");
    
    // --- HELPER FUNCTIONS ---
    function showMessage(element, message, type) {
        element.innerHTML = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    function hideElement(element) {
        element.style.display = "none";
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

    // --- PROCEED BUTTON LOGIC ---
    proceedToRegisterBtn.addEventListener('click', () => {
        if (!readInstructionsCheckbox.checked) {
            showMessage(instructionErrorMessageDiv, "Please confirm you have read the instructions.", "error");
            return;
        }
        
        hideElement(instructionErrorMessageDiv);
        instructionCard.classList.add('blur-hide');
        
        setTimeout(() => {
            hideElement(instructionCard);
            // The CSS class will now handle making the form visible
            registerCard.classList.add('show-form');
        }, 600);
    });
    
    // --- FORM SUBMISSION LOGIC ---
    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const usernameInput = document.getElementById("username");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");
            const errorMessageDiv = document.getElementById("error-message");
            const successMessageDiv = document.getElementById("success-message");
            const registerButton = document.getElementById("registerButton");

            hideElement(errorMessageDiv);
            hideElement(successMessageDiv);

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validation checks...
            if (!username.startsWith('@') || username.substring(1) !== username.substring(1).toLowerCase() || username.includes(" ")) {
                showMessage(errorMessageDiv, "Username must start with '@', be lowercase, and have no spaces.", "error"); return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage(errorMessageDiv, "Please enter a valid email address.", "error"); return;
            }
            if (password.length < 8 || !/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/.test(password)) {
                showMessage(errorMessageDiv, "Password must be 8+ characters with a number and special character.", "error"); return;
            }
            if (password !== confirmPassword) {
                showMessage(errorMessageDiv, "Passwords do not match.", "error"); return;
            }

            registerButton.classList.add('loading');
            registerButton.disabled = true;

            try {
                const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password, role: 'USER' }),
                });
                const result = await response.json();
                if (response.ok) {
                    showMessage(successMessageDiv, "Registration successful! Redirecting...", "success");
                    registrationForm.reset();
                    setTimeout(() => { window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`; }, 3000);
                } else {
                    showMessage(errorMessageDiv, result.message || "Registration failed.", "error");
                }
            } catch (error) {
                showMessage(errorMessageDiv, "Network error. Please try again.", "error");
            } finally {
                registerButton.classList.remove('loading');
                registerButton.disabled = false;
            }
        });
    }

    // --- PASSWORD VISIBILITY TOGGLE ---
    document.querySelectorAll('.toggle-password-visibility').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input) {
                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            }
        });
    });
});