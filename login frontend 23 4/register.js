document.addEventListener("DOMContentLoaded", () => {
    // --- Element Caching ---
    const registrationForm = document.getElementById("registrationForm");
    
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const registerButton = document.getElementById("registerButton");

    // --- Helper Functions ---
    const showMessage = (element, message, type) => {
        element.innerHTML = message; // Use innerHTML for potential formatting
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

    // --- Main Form Submission Logic ---
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