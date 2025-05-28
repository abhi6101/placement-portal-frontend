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
    errorMessageDiv.textContent = ''; // Clear previous error text content

    // Form validation
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const role = roleInput.value;

    // --- Start Form Validations ---
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessageDiv.textContent = "Please enter a valid email address.";
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

    // --- Start Loading State for Registration ---
    if (registerButton) {
        registerButton.classList.add('is-loading');
        registerButton.disabled = true;
        registerButton.innerHTML = 'Registering... <i class="fas fa-spinner fa-spin"></i>';
    }
    // --- End Loading State ---

    // --- Start Registration Request ---
    const userData = {
        username: username,
        email: email,
        password: password,
        role: role,
    };

    try {
        const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            successMessageDiv.textContent = result.message || "Registration successful! Please check your email for the verification code.";
            successMessageDiv.style.display = 'block';

            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
            }

            // NEW: Redirect to the verification page, passing the email for convenience
            setTimeout(() => {
                window.location.href = `verify-account.html?email=${encodeURIComponent(email)}`;
            }, 3000); // Give user time to read success message
        } else {
            errorMessageDiv.textContent = result.message || "Registration failed. Please try again.";
            errorMessageDiv.style.display = 'block';
            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
            }
        }
    } catch (error) {
        errorMessageDiv.textContent = "Registration failed. Please check your network connection and try again.";
        errorMessageDiv.style.display = 'block';
        console.error("Registration error:", error);
        if (registerButton) {
            registerButton.classList.remove('is-loading');
            registerButton.disabled = false;
            registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
        }
    }
    // --- End Registration Request ---
});
