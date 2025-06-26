document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton");
    
    // Spinner logic might not be in your provided HTML, but the JS handles it
    const spinner = loginButton ? loginButton.querySelector(".spinner") : null;

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
        // Use a single class to control loading state
        isLoading ? loginButton.classList.add('is-loading') : loginButton.classList.remove('is-loading');
    }

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
                    // --- THE FIX IS HERE ---
                    // Step 1: Store the authentication token
                    localStorage.setItem("authToken", data.token);

                    // Step 2: Decode the token to get user roles
                    const payload = JSON.parse(atob(data.token.split(".")[1]));
                    const roles = payload.roles || payload.authorities || [];
                    const isAdmin = roles.includes("ROLE_ADMIN");

                    // Step 3: Store the role string in localStorage
                    localStorage.setItem("userRole", isAdmin ? "ADMIN" : "USER");
                    // --- END OF FIX ---

                    showMessage(successElement, "Login successful! Redirecting...", "success");

                    // Redirect based on the isAdmin flag
                    setTimeout(() => {
                        window.location.href = isAdmin ? "admin-dashboard.html" : "index.html";
                    }, 700);

                } else {
                    showMessage(errorElement, data.message || "Invalid username or password.", "error");
                    setLoadingState(false);
                }
            } catch (error) {
                console.error("Login network error:", error);
                showMessage(errorElement, "Network error. Please check your connection.", "error");
                setLoadingState(false);
            }
        });
    }
});