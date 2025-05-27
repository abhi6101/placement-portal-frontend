document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const roleInput = document.getElementById("role");

    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    // Clear previous messages
    errorMessageDiv.style.display = 'none';
    successMessageDiv.style.display = 'none';

    // Form validation
    const username = usernameInput.value.trim(); // Trim whitespace from username
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const role = roleInput.value;

    if (username === "") {
        errorMessageDiv.textContent = "Full Name cannot be empty.";
        errorMessageDiv.style.display = 'block';
        return;
    }

    // Validate username for spaces <--- THIS IS THE CODE THAT CHECKS FOR SPACES
    if (username.includes(" ")) {
        errorMessageDiv.textContent = "Username cannot contain spaces. Please enter a single-word username.";
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

    // Password strength check (at least 1 number and 1 special character)
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

        if (response.ok) { // Check for successful HTTP status (2xx)
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify({
                username: userData.username,
                role: userData.role
            }));

            // Show success message
            successMessageDiv.textContent = result.message || "Registration successful!";
            successMessageDiv.style.display = 'block';

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            // Handle server-side errors
            errorMessageDiv.textContent = result.message || "Registration failed. Please try again.";
            errorMessageDiv.style.display = 'block';
        }
    } catch (error) {
        errorMessageDiv.textContent = "Registration failed. Please check your network connection and try again.";
        errorMessageDiv.style.display = 'block';
        console.error("Error:", error);
    }
});