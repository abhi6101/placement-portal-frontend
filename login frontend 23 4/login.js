document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessageDiv = document.getElementById("error-message");
    const loginButton = document.getElementById("loginButton");
    const buttonText = loginButton.querySelector(".button-text");
    const spinner = loginButton.querySelector(".spinner");
    const togglePassword = document.getElementById('togglePassword');

    // Password visibility toggle logic
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Helper functions for UI feedback
    const showMessage = (message, type = "error") => {
        errorMessageDiv.textContent = message;
        errorMessageDiv.className = `alert alert-${type}`;
        errorMessageDiv.style.display = "block";
    };

    const hideMessage = () => {
        errorMessageDiv.style.display = "none";
    };

    const showLoadingState = () => {
        loginButton.disabled = true;
        loginButton.classList.add('is-loading');
        buttonText.style.display = 'none';
        spinner.style.display = 'block';
    };

    const hideLoadingState = () => {
        loginButton.disabled = false;
        loginButton.classList.remove('is-loading');
        buttonText.style.display = 'block';
        spinner.style.display = 'none';
    };

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideMessage();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showMessage("Both email and password are required.");
            return;
        }

        showLoadingState();

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // IMPORTANT: Store the token from the backend
                localStorage.setItem("authToken", result.token);

                // Show success feedback and redirect
                showMessage("Login successful! Redirecting...", "success");
                setTimeout(() => {
                    // Redirect to the dashboard page
                    window.location.href = "dashboard.html";
                }, 2000);

            } else {
                showMessage(result.message || "Invalid credentials. Please try again.");
                hideLoadingState();
            }
        } catch (error) {
            console.error("Login error:", error);
            showMessage("An error occurred. Please check your network and try again.");
            hideLoadingState();
        }
    });
});