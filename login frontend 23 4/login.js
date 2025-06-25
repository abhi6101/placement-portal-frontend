document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessageDiv = document.getElementById("error-message");
    const loginButton = document.getElementById("loginButton");
    const togglePasswordBtn = document.getElementById('togglePassword');

    // Password visibility toggle logic
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            // Update ARIA label for accessibility
            togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            
            // Toggle icon
            const icon = togglePasswordBtn.querySelector('.fas');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    const showMessage = (message, type = "error") => {
        errorMessageDiv.textContent = message;
        errorMessageDiv.className = `alert alert-${type}`;
        errorMessageDiv.style.display = "block";
    };

    const hideMessage = () => {
        errorMessageDiv.style.display = "none";
    };

    const setLoadingState = (isLoading) => {
        loginButton.disabled = isLoading;
        loginButton.classList.toggle('is-loading', isLoading);
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

        setLoadingState(true);

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok && result.token) {
                // ENHANCEMENT: Store token and user role
                localStorage.setItem("authToken", result.token);
                localStorage.setItem("userRole", result.role); // Assuming backend sends role

                showMessage("Login successful! Redirecting...", "success");

                // ENHANCEMENT: Role-based redirection
                setTimeout(() => {
                    if (result.role === 'ADMIN') {
                        window.location.href = "admin-dashboard.html";
                    } else {
                        window.location.href = "dashboard.html";
                    }
                }, 1500);

            } else {
                showMessage(result.message || "Invalid credentials. Please try again.");
                setLoadingState(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            showMessage("An error occurred. Please check your network and try again.");
            setLoadingState(false);
        }
        /*
        SECURITY NOTE (Advanced): Storing tokens in localStorage is common but vulnerable to XSS attacks.
        The most secure method is for the backend to set a secure, HttpOnly cookie. The token would then be
        sent automatically by the browser on subsequent requests, and it would be inaccessible to client-side
        JavaScript, mitigating XSS risks.
        */
    });
});