document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton"); // Get the button
    const buttonText = loginButton.querySelector(".button-text"); // Get the text span
    const spinner = loginButton.querySelector(".spinner"); // Get the spinner span
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");
    const loginButton = document.getElementById("loginButton"); // Get the button
    const buttonText = loginButton.querySelector(".button-text"); // Get the text span
    const spinner = loginButton.querySelector(".spinner"); // Get the spinner span


    // Helper function to show messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
        // Optionally, hide the message after a few seconds
        // setTimeout(() => {
        //     element.style.display = "none";
        //     element.textContent = "";
        // }, 5000);
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
        loginButton.classList.add('loading'); // Add loading class
        spinner.style.display = "block"; // Show spinner
        buttonText.style.display = "none"; // Hide button text
    }

    // Function to hide the spinner and enable the button
    function hideLoadingState() {
        loginButton.disabled = false;
        loginButton.classList.remove('loading'); // Remove loading class
        spinner.style.display = "none"; // Hide spinner
        buttonText.style.display = "inline-block"; // Show button text (inline-block to keep icon alignment)
    }

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        hideMessages(); // Clear any previous messages

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic client-side validation
        if (!username || !password) {
            showMessage(errorElement, "Please enter both username and password.", "error");
            return;
        }

        showLoadingState(); // Show spinner and disable button

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
                        showMessage(errorElement, "Login successful, but an error occurred processing user data. Please try again or contact support.", "error");
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
            // Always hide the spinner and enable the button, regardless of success or failure
            hideLoadingState();
        }
    });
});

    // Helper function to show messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = "block";
        // Optionally, hide the message after a few seconds
        // setTimeout(() => {
        //     element.style.display = "none";
        //     element.textContent = "";
        // }, 5000);
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
        loginButton.classList.add('loading'); // Add loading class
        spinner.style.display = "block"; // Show spinner
        buttonText.style.display = "none"; // Hide button text
    }

    // Function to hide the spinner and enable the button
    function hideLoadingState() {
        loginButton.disabled = false;
        loginButton.classList.remove('loading'); // Remove loading class
        spinner.style.display = "none"; // Hide spinner
        buttonText.style.display = "inline-block"; // Show button text (inline-block to keep icon alignment)
    }

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        hideMessages(); // Clear any previous messages

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic client-side validation
        if (!username || !password) {
            showMessage(errorElement, "Please enter both username and password.", "error");
            return;
        }

        showLoadingState(); // Show spinner and disable button

        try {
            // !!! IMPORTANT: CHANGE THIS URL TO YOUR BACKEND API URL !!!
            const response = await fetch("https://hack-2-hired.onrender.com/api/auth/login", { // Corrected URL
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
                        showMessage(errorElement, "Login successful, but an error occurred processing user data. Please try again or contact support.", "error");
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
            // Always hide the spinner and enable the button, regardless of success or failure
            hideLoadingState();
        }
    });
});