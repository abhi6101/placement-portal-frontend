document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Element Caching ---
    // Get all necessary DOM elements once for efficiency.
    const registrationForm = document.getElementById("registrationForm");
    
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const registerButton = document.getElementById("registerButton");

    // --- 2. Helper Functions ---

    /**
     * Displays a message to the user in a styled alert box.
     * @param {HTMLElement} element - The alert div element.
     * @param {string} message - The message to display.
     * @param {'error' | 'success'} type - The type of message.
     */
    const showMessage = (element, message, type) => {
        element.innerHTML = message; // Use innerHTML in case message contains HTML
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    };

    /**
     * Hides a specific message element.
     * @param {HTMLElement} element - The alert div element to hide.
     */
    const hideElement = (element) => {
        element.style.display = "none";
        element.innerHTML = "";
    };

    /**
     * Toggles the loading state of the submit button.
     * @param {boolean} isLoading - True to show spinner, false to show text.
     */
    const setLoadingState = (isLoading) => {
        if (registerButton) {
            registerButton.disabled = isLoading;
            // The 'is-loading' class is handled by CSS to show/hide the spinner
            isLoading ? registerButton.classList.add('is-loading') : registerButton.classList.remove('is-loading');
        }
    };

    // --- 3. Main Form Submission Logic ---
    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the default form submission
        
        // Clear any previous messages before validating again
        hideElement(errorMessageDiv);
        hideElement(successMessageDiv);

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = roleInput.value;

        // --- Client-Side Validation Checks ---
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

        // --- API Request ---
        setLoadingState(true); // Show spinner

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, role }),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle success
                showMessage(successMessageDiv, result.message || "Registration successful! Redirecting to email verification...", "success");
                registrationForm.reset();
                setTimeout(() => {
                    window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
                }, 3000); // Redirect after 3 seconds
            } else {
                // Handle backend errors (e.g., username already exists)
                showMessage(errorMessageDiv, result.message || "Registration failed. Please try again.", "error");
                setLoadingState(false); // Stop spinner on failure
            }
        } catch (error) {
            // Handle network errors
            showMessage(errorMessageDiv, "Network error. Please try again later.", "error");
            setLoadingState(false); // Stop spinner on failure
            console.error("Registration Error:", error);
        }
    });
});