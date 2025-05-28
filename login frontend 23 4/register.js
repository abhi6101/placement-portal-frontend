document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");
    const registerButton = document.querySelector("#registrationForm button[type='submit']");


    // Clear previous messages
    errorMessageDiv.style.display = 'none';
    successMessageDiv.style.display = 'none';

    // Form validation
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const role = roleInput.value;

    // --- Form Validations (existing code) ---
    if (username === "") {
        errorMessageDiv.textContent = "Username cannot be empty.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (username.includes(" ")) {
        errorMessageDiv.textContent = "Username cannot contain spaces.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (!username.startsWith('@')) {
        errorMessageDiv.textContent = "Username must start with '@'.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    const usernameWithoutAt = username.substring(1);
    if (usernameWithoutAt !== usernameWithoutAt.toLowerCase()) {
        errorMessageDiv.textContent = "The part of the username after '@' must be in lowercase.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (email === "") {
        errorMessageDiv.textContent = "Email Address cannot be empty.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (role === "") {
        errorMessageDiv.textContent = "Please select a role.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (password.length < 8) {
        errorMessageDiv.textContent = "Password must be at least 8 characters long.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    if (!passwordRegex.test(password)) {
        errorMessageDiv.textContent = "Password must contain at least 1 number and 1 special character.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessageDiv.textContent = "Passwords do not match.";
        errorMessageDiv.style.display = 'block';
        return;
    }
    // --- End Form Validations ---

    const userData = {
        username: username,
        email: email,
        password: password,
        role: role,
    };

    try {
        // Add loading class and disable the button
        if (registerButton) {
            registerButton.classList.add('is-loading');
            registerButton.disabled = true; // Disable the button to prevent multiple clicks
            registerButton.innerHTML = 'Registering... <i class="fas fa-spinner fa-spin"></i>'; // Optional: Add a spinner
        }

        const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('userData', JSON.stringify({
                username: userData.username,
                role: userData.role
            }));

            successMessageDiv.textContent = result.message || "Registration successful!";
            successMessageDiv.style.display = 'block';

            // Remove loading class and re-enable the button if needed before redirect
            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>'; // Reset button text
            }

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            errorMessageDiv.textContent = result.message || "Registration failed. Please try again.";
            errorMessageDiv.style.display = 'block';
            // Remove loading class and re-enable the button on failure
            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>'; // Reset button text
            }
        }
    } catch (error) {
        errorMessageDiv.textContent = "Registration failed. Please check your network connection and try again.";
        errorMessageDiv.style.display = 'block';
        console.error("Error:", error);
        // Remove loading class and re-enable the button on error
        if (registerButton) {
            registerButton.classList.remove('is-loading');
            registerButton.disabled = false;
            registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>'; // Reset button text
        }
    }
});