document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ELEMENT REFERENCES ---
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessageDiv = document.getElementById("error-message");
    const loginButton = document.getElementById("loginButton");
    const buttonText = loginButton.querySelector(".button-text");
    const spinner = loginButton.querySelector(".spinner");
    const togglePassword = document.getElementById('togglePassword');

    // --- 2. PASSWORD VISIBILITY TOGGLE ---
    // Handles the eye icon to show/hide the password.
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            // Toggles the Font Awesome icon class
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // --- 3. UI HELPER FUNCTIONS ---
    // Functions to show/hide messages and loading states for a better UX.

    const showMessage = (message, type = "error") => {
        errorMessageDiv.textContent = message;
        // The class determines the color (e.g., red for error, green for success)
        errorMessageDiv.className = `alert alert-${type}`;
        errorMessageDiv.style.display = "block";
    };

    const hideMessage = () => {
        errorMessageDiv.style.display = "none";
        errorMessageDiv.textContent = "";
    };

    const showLoadingState = () => {
        loginButton.disabled = true;
        loginButton.classList.add('is-loading'); // CSS class to style the button while loading
        if(buttonText) buttonText.style.display = 'none';
        if(spinner) spinner.style.display = 'block';
    };

    const hideLoadingState = () => {
        loginButton.disabled = false;
        loginButton.classList.remove('is-loading');
        if(buttonText) buttonText.style.display = 'block';
        if(spinner) spinner.style.display = 'none';
    };

    // --- 4. FORM SUBMISSION LOGIC ---
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        hideMessage(); // Clear any previous error messages

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Basic client-side validation
        if (!email || !password) {
            showMessage("Both email and password are required.");
            return;
        }

        showLoadingState(); // Show the spinner on the button

        try {
            // Send the login request to your backend API
            const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json(); // Parse the JSON response from the server

            if (response.ok) {
                // --- SUCCESS SCENARIO ---
                // This is the most important part for your new system.
                // Your backend should return a token and a user object.
                
                localStorage.setItem("authToken", result.token);
                localStorage.setItem("userRole", result.user.role); 
                localStorage.setItem("username", result.user.username);

                // Show a temporary success message
                showMessage("Login successful! Redirecting...", "success");

                // Redirect to the dashboard after a short delay
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500); // 1.5-second delay

            } else {
                // --- ERROR SCENARIO ---
                // Show the error message sent from the backend (e.g., "Invalid credentials")
                showMessage(result.message || "An unknown error occurred. Please try again.");
                hideLoadingState(); // Stop the spinner and re-enable the button
            }
        } catch (error) {
            // --- NETWORK/SERVER ERROR SCENARIO ---
            console.error("Login error:", error);
            showMessage("Could not connect to the server. Please check your network and try again.");
            hideLoadingState(); // Stop the spinner
        }
    });
});