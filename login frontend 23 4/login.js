document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton");
    const buttonText = loginButton.querySelector(".button-text");
    const spinner = loginButton.querySelector(".spinner");

    // --- START: New code for Password Visibility Toggle ---
    const togglePassword = document.getElementById('togglePassword');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Check the current type of the password input field
            const isPassword = passwordInput.getAttribute('type') === 'password';

            if (isPassword) {
                // If it's a password, change to text to show it
                passwordInput.setAttribute('type', 'text');
                // Change the icon to the 'eye-slash'
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                // Otherwise, change it back to a password
                passwordInput.setAttribute('type', 'password');
                // Change the icon back to the 'eye'
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }
    // --- END: New code for Password Visibility Toggle ---

    // Helper function to show messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
    }

    // Helper function to hide all messages
    function hideMessages() {
        errorElement.style.display = "none";
        successElement.style.display = "none";
        errorElement.textContent = "";
        successElement.textContent = "";
    }

    // Function to show the spinner and disable the button
    function showLoadingState() {
        loginButton.disabled = true;
        loginButton.classList.add('loading');
        spinner.style.display = "block";
        buttonText.style.display = "none";
    }

    // Function to hide the spinner and enable the button
    function hideLoadingState() {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        spinner.style.display = "none";
        buttonText.style.display = "inline-block";
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

        showLoadingState();

        try {
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem("authToken", data.token);

                    try {
                        const payload = JSON.parse(atob(data.token.split(".")[1]));
                        const roles = payload.roles || payload.authorities || [];
                        const isAdmin = roles.includes("ROLE_ADMIN");

                        localStorage.setItem("userRole", isAdmin ? "ADMIN" : "USER");

                        showMessage(successElement, "Login successful! Redirecting...", "success");

                        setTimeout(() => {
                            window.location.href = isAdmin
                                ? "admin-dashboard.html"
                                : "index.html";
                        }, 700);
                    } catch (jwtError) {
                        console.error("Error parsing JWT token:", jwtError);
                        showMessage(errorElement, "Login successful, but an error occurred processing user data.", "error");
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 700);
                    }
                } else {
                    showMessage(errorElement, data.message || "Login successful, but no authentication token received.", "error");
                }
            } else {
                showMessage(errorElement, data.message || "Invalid username or password. Please try again.", "error");
            }
        } catch (error) {
            console.error("Login network error:", error);
            showMessage(errorElement, "Network error. Please check your internet connection and try again.", "error");
        } finally {
            hideLoadingState();
        }
    });
});