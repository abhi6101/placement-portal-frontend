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

    // --- Start Form Validations (existing code) ---
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

    // --- Start Loading State & Email Validation ---
    // Add loading class and disable the button while validating
    if (registerButton) {
        registerButton.classList.add('is-loading');
        registerButton.disabled = true;
        registerButton.innerHTML = 'Validating Email... <i class="fas fa-spinner fa-spin"></i>';
    }

    const emailValidationKey = "ema_live_V5JJuwa1M4Ny0QO0M9QvKEkxfhwjd5H0SRvhQHVQ"; // Your emailvalidation.io API key
    const emailValidationUrl = `https://api.emailvalidation.io/v1/info?apikey=${emailValidationKey}&email=${email}`;

    try {
        const emailValidationResponse = await fetch(emailValidationUrl);
        const emailValidationResult = await emailValidationResponse.json();

        // Check if the email is valid according to emailvalidation.io
        if (!emailValidationResult.valid) {
            errorMessageDiv.textContent = emailValidationResult.message || "Invalid email address format or not deliverable.";
            errorMessageDiv.style.display = 'block';
            // Reset button state
            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
            }
            return; // Stop further execution if email is invalid
        }
    } catch (error) {
        errorMessageDiv.textContent = "Error during email validation. Please check your network and try again.";
        errorMessageDiv.style.display = 'block';
        console.error("Email validation API error:", error);
        // Reset button state
        if (registerButton) {
            registerButton.classList.remove('is-loading');
            registerButton.disabled = false;
            registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
        }
        return; // Stop further execution on error
    }
    // --- End Email Validation ---

    // --- Start Registration Request (if email validation passes) ---
    const userData = {
        username: username,
        email: email,
        password: password,
        role: role,
    };

    try {
        // Update button text for registration process
        if (registerButton) {
            registerButton.innerHTML = 'Registering... <i class="fas fa-spinner fa-spin"></i>';
        }

        // IMPORTANT: Ensure this URL matches your backend's new /api/auth/register endpoint
        const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            // localStorage.setItem('userData', JSON.stringify({ // You might not need this after registration
            //     username: userData.username,
            //     role: userData.role
            // }));

            // Important: Change success message to reflect email confirmation
            successMessageDiv.textContent = result.message || "Registration successful! Please check your email to verify your account.";
            successMessageDiv.style.display = 'block';

            // Reset button state
            if (registerButton) {
                registerButton.classList.remove('is-loading');
                registerButton.disabled = false;
                registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
            }

            // After registration, guide the user to check their email.
            // Do NOT redirect immediately to login.html, or user won't know to verify.
            setTimeout(() => {
                // You can redirect to a "check your email" page or stay on this page
                // For simplicity, let's redirect to login.html after a delay,
                // but with the understanding that they need to verify.
                window.location.href = "login.html"; // Redirect to login after a delay
            }, 3000); // Give user time to read success message
        } else {
            errorMessageDiv.textContent = result.message || "Registration failed. Please try again.";
            errorMessageDiv.style.display = 'block';
            // Reset button state on failure
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
        // Reset button state on error
        if (registerButton) {
            registerButton.classList.remove('is-loading');
            registerButton.disabled = false;
            registerButton.innerHTML = 'Register Now <i class="fas fa-user-plus"></i>';
        }
    }
    // --- End Registration Request ---
});