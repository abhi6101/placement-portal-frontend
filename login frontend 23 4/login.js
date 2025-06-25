document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton");
    const spinner = loginButton.querySelector(".spinner");

    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    function hideMessages() {
        errorElement.style.display = "none";
        successElement.style.display = "none";
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            loginButton.disabled = true;
            loginButton.classList.add('loading');
        } else {
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
        }
    }

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
                localStorage.setItem("authToken", data.token);

                const payload = JSON.parse(atob(data.token.split(".")[1]));
                const roles = payload.roles || payload.authorities || [];
                const isAdmin = roles.includes("ROLE_ADMIN");

                showMessage(successElement, "Login successful! Redirecting...", "success");

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
});