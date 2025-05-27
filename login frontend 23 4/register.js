document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get a reference to the submit button
    const submitButton = document.querySelector("#registrationForm button[type='submit']");
    const originalButtonText = submitButton.textContent; // Store original text

    // IMMEDIATELY DISABLE THE BUTTON AND CHANGE TEXT
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
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (userData.password !== confirmPassword) {
        document.getElementById("error-message").textContent = "Passwords do not match!";
        document.getElementById("error-message").style.display = 'block';
        // IMPORTANT: The button remains disabled as per your request
        return; // Stop the submission
    }

    // Basic password strength check (minimum 8 characters, at least 1 number, 1 special character)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        document.getElementById("error-message").textContent = "Password must be at least 8 characters, contain a number, and a special character.";
        document.getElementById("error-message").style.display = 'block';
        // IMPORTANT: The button remains disabled as per your request
        return; // Stop the submission
    }

    // --- API Call ---
    try {
        const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json(); // Parse the JSON response from the backend

        // Check if the HTTP response status is OK (2xx) and the backend's internal status is 'success'
        if (response.ok && result.status === "success") {
            // Store user data in localStorage (consider not storing sensitive info like password here)
            localStorage.setItem('userData', JSON.stringify({
                username: userData.username,
                role: userData.role
            }));
            
            // Show success message
            document.getElementById("success-message").textContent = result.message;
            document.getElementById("success-message").style.display = 'block';
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
            // The button remains disabled as the page will redirect
        } else {
            // Handle API errors (e.g., email already exists, validation errors from backend)
            // Use the backend's message if available, otherwise a generic one
            document.getElementById("error-message").textContent = result.message || "Registration failed. Please try again.";
            document.getElementById("error-message").style.display = 'block';
            // IMPORTANT: The button remains disabled as per your request
            // You might want to consider showing a "Please Refresh" message or similar if the button stays disabled on error.
        }
    } catch (error) {
        // Handle network errors (e.g., backend is down, no internet) or other unexpected issues
        document.getElementById("error-message").textContent = "An error occurred during registration. Please check your internet connection.";
        document.getElementById("error-message").style.display = 'block';
        console.error("Error during fetch:", error); // Log the full error for debugging
        // IMPORTANT: The button remains disabled as per your request
        // You might want to consider showing a "Please Refresh" message or similar if the button stays disabled on error.
    }
});