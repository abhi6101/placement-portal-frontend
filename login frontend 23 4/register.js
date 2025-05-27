// Declare a flag variable outside the event listener
// This ensures it retains its state between clicks.
let isSubmitting = false; 

document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check the flag here first
    if (isSubmitting) {
        return; // If already submitting, do nothing
    }

    // Set the flag to true to indicate submission is in progress
    isSubmitting = true; 

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
        
        // IMPORTANT: Reset the flag if validation fails
        isSubmitting = false; 
        submitButton.disabled = false; // Re-enable button on client-side validation error
        submitButton.textContent = originalButtonText; // Reset text
        return; // Stop the submission
    }

    // Basic password strength check (minimum 8 characters, at least 1 number, 1 special character)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        document.getElementById("error-message").textContent = "Password must be at least 8 characters, contain a number, and a special character.";
        document.getElementById("error-message").style.display = 'block';
        
        // IMPORTANT: Reset the flag if validation fails
        isSubmitting = false; 
        submitButton.disabled = false; // Re-enable button on client-side validation error
        submitButton.textContent = originalButtonText; // Reset text
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
            
            // On success, the page will redirect, so no need to reset isSubmitting or re-enable button
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            // Handle API errors (e.g., email already exists, validation errors from backend)
            document.getElementById("error-message").textContent = result.message || "Registration failed. Please try again.";
            document.getElementById("error-message").style.display = 'block';
            
            // IMPORTANT: Reset the flag on API error
            isSubmitting = false; 
            submitButton.disabled = false; // Re-enable button on API error
            submitButton.textContent = originalButtonText; // Reset text
        }
    } catch (error) {
        // Handle network errors (e.g., backend is down, no internet) or other unexpected issues
        document.getElementById("error-message").textContent = "An error occurred during registration. Please check your internet connection.";
        document.getElementById("error-message").style.display = 'block';
        console.error("Error during fetch:", error); // Log the full error for debugging
        
        // IMPORTANT: Reset the flag on network error
        isSubmitting = false; 
        submitButton.disabled = false; // Re-enable button on network error
        submitButton.textContent = originalButtonText; // Reset text
    }
});