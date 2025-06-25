document.addEventListener("DOMContentLoaded", () => {
    // --- Configuration ---
    const API_BASE_URL = "https://placement-portal-backend-nwaj.onrender.com/api/auth";
    const REDIRECT_DELAY_MS = 1500;

    // --- DOM Elements ---
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageContainer = document.getElementById("message-container");
    const loginButton = document.getElementById("loginButton");
    
    const usernameFeedback = document.getElementById("username-feedback");
    const passwordFeedback = document.getElementById("password-feedback");

    // --- Helper Functions ---

    const showGlobalMessage = (message, type) => {
        messageContainer.textContent = message;
        messageContainer.className = `alert alert-${type}`;
        messageContainer.style.display = "flex";
    };

    const hideGlobalMessage = () => {
        messageContainer.style.display = "none";
    };
    
    const showInputError = (input, feedbackEl, message) => {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        feedbackEl.textContent = message;
        feedbackEl.style.display = 'block';
    };

    const hideInputError = (input, feedbackEl) => {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        feedbackEl.style.display = 'none';
    };

    const setButtonLoading = (isLoading) => {
        loginButton.disabled = isLoading;
        loginButton.classList.toggle('loading', isLoading);
    };

    const handleLoginSuccess = (token) => {
        localStorage.setItem("authToken", token);
        let isAdmin = false;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const roles = payload.roles || payload.authorities || [];
            isAdmin = roles.includes("ROLE_ADMIN");
        } catch (e) {
            console.error("Could not parse JWT payload.", e);
        }
        localStorage.setItem("userRole", isAdmin ? "ADMIN" : "USER");
        
        showGlobalMessage("Login successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = isAdmin ? "admin-dashboard.html" : "index.html";
        }, REDIRECT_DELAY_MS);
    };

    // --- Event Listeners ---

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        hideGlobalMessage();
        hideInputError(usernameInput, usernameFeedback);
        hideInputError(passwordInput, passwordFeedback);

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        if (!username) {
            showInputError(usernameInput, usernameFeedback, "Username is required.");
            isValid = false;
        }
        if (!password) {
            showInputError(passwordInput, passwordFeedback, "Password is required.");
            isValid = false;
        }

        if (!isValid) return;

        setButtonLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                handleLoginSuccess(data.token);
            } else {
                const errorMessage = data.message || "Invalid credentials. Please try again.";
                showGlobalMessage(errorMessage, "error");
                setButtonLoading(false);
            }
        } catch (error) {
            console.error("Login network error:", error);
            showGlobalMessage("Network error. Please check your connection.", "error");
            setButtonLoading(false);
        }
    });

    // Clear validation error on input for better UX
    usernameInput.addEventListener('input', () => hideInputError(usernameInput, usernameFeedback));
    passwordInput.addEventListener('input', () => hideInputError(passwordInput, passwordFeedback));
});