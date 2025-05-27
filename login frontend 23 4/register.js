document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get a reference to the submit button
    const submitButton = document.querySelector("#registrationForm button[type='submit']");
    const originalButtonText = submitButton.textContent; // Store original text

    // 1. Disable the button immediately to prevent multiple clicks
    submitButton.disabled = true;
    submitButton.textContent = 'Registering...'; // Indicate loading

    // Hide any previous messages
    document.getElementById("error-message").style.display = 'none';
    document.getElementById("success-message").style.display = 'none';

    const userData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
    };

    // --- Client-side Validation ---
    // (Existing validation logic here)
    if (userData.password !== confirmPassword) {
        // ... (Error message and)
        submitButton.disabled = false; // Re-enable button on validation failure
        submitButton.textContent = originalButtonText; // Reset text
        return;
    }

    if (!passwordRegex.test(userData.password)) {
        // ... (Error message and)
        submitButton.disabled = false; // Re-enable button on validation failure
        submitButton.textContent = originalButtonText; // Reset text
        return;
    }

    // --- API Call ---
    try {
        const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
            // ... (Your fetch options)
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
            // Registration successful
            localStorage.setItem('userData', JSON.stringify({ username: userData.username, role: userData.role }));
            document.getElementById("success-message").textContent = result.message;
            document.getElementById("success-message").style.display = 'block';
            
            // The button REMAINS DISABLED here because of the redirect
            // It won't be re-enabled since the page is changing.
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            // Registration failed (backend error)
            document.getElementById("error-message").textContent = result.message || "Registration failed. Please try again.";
            document.getElementById("error-message").style.display = 'block';
            submitButton.disabled = false; // Re-enable button on API error
            submitButton.textContent = originalButtonText; // Reset text
        }
    } catch (error) {
        // Network error or other unexpected issues
        document.getElementById("error-message").textContent = "An error occurred during registration. Please check your internet connection.";
        document.getElementById("error-message").style.display = 'block';
        console.error("Error during fetch:", error);
        submitButton.disabled = false; // Re-enable button on network error
        submitButton.textContent = originalButtonText; // Reset text
    }
});