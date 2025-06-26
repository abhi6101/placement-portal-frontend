document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Element Caching ---
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton");
    const toggleIcon = document.querySelector('.password-toggle-icon');

    // --- 2. Helper Functions ---
    function showMessage(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    function hideMessages() {
        if (errorElement) errorElement.style.display = "none";
        if (successElement) successElement.style.display = "none";
    }

    function setLoadingState(isLoading) {
        if (!loginButton) return;
        loginButton.disabled = isLoading;
        // Use a single class to control loading state, matching the CSS
        loginButton.classList.toggle('loading', isLoading);
    }

    // --- 3. Password Visibility Toggle Logic ---
    if (passwordInput && toggleIcon) {
        toggleIcon.addEventListener('click', () => {
            // Check the current type and toggle it
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle the eye icon
            toggleIcon.classList.toggle('fa-eye');
            toggleIcon.classList.toggle('fa-eye-slash');
        });
    }

    // --- 4. Main Form Submission Event Listener ---
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            hideMessages();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                showMessage(errorElement, "Please enter both username and password.", "error");
                return;
            }

            setLoadingState(true);

            try {
                const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok && data.token) {
                    // Store token and user role upon successful login
                    localStorage.setItem("authToken", data.token);
                    
                    const payload = JSON.parse(atob(data.token.split(".")[1]));
                    const roles = payload.roles || payload.authorities || [];
                    const isAdmin = roles.includes("ROLE_ADMIN");

                    localStorage.setItem("userRole", isAdmin ? "ADMIN" : "USER");

                    showMessage(successElement, "Login successful! Redirecting...", "success");
                    
                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = isAdmin ? "admin-dashboard.html" : "index.html";
                    }, 700);

                } else {
                    // Handle failed login
                    showMessage(errorElement, data.message || "Invalid username or password.", "error");
                    setLoadingState(false);
                }
            } catch (error) {
                // Handle network or other fetch errors
                console.error("Login network error:", error);
                showMessage(errorElement, "Network error. Please check your connection.", "error");
                setLoadingState(false);
            }
        });
    }
});