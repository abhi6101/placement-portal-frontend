// Declare a flag variable outside the event listener
let isSubmitting = false; 

document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is fully loaded
    const registrationForm = document.getElementById("registrationForm");
    const submitButton = registrationForm.querySelector("button[type='submit']");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const roleSelect = document.getElementById("role");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Function to check if all fields are valid and enable/disable button
    const checkFormValidity = () => {
        const isUsernameFilled = usernameInput.value.trim() !== '';
        const isEmailFilled = emailInput.value.trim() !== '';
        const isRoleSelected = roleSelect.value !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        const isConfirmPasswordFilled = confirmPasswordInput.value.trim() !== '';

        // For initial enabling, we only check if fields are *filled*, not necessarily valid
        // Full validation happens on submit, but this prevents submitting an empty form.
        const allFieldsFilled = isUsernameFilled && isEmailFilled && isRoleSelected && isPasswordFilled && isConfirmPasswordFilled;
        
        submitButton.disabled = !allFieldsFilled; // Disable if any required field is empty
    };

    // Add event listeners to all input fields
    usernameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    roleSelect.addEventListener('change', checkFormValidity); // 'change' for select elements
    passwordInput.addEventListener('input', checkFormValidity);
    confirmPasswordInput.addEventListener('input', checkFormValidity);

    // Initial check on page load (in case browser auto-fills some fields)
    checkFormValidity();


    // --- Existing Form Submission Logic ---
    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Check the flag here first
        if (isSubmitting) {
            return; // If already submitting, do nothing
        }

        // Set the flag to true to indicate submission is in progress
        isSubmitting = true; 

        // Store original text for potential re-enabling
        const originalButtonText = submitButton.textContent; 

        // Change button text (it's already disabled by checkFormValidity or initially)
        submitButton.textContent = 'Registering...'; 

        // Hide any previous messages
        document.getElementById("error-message").style.display = 'none';
        document.getElementById("success-message").style.display = 'none';

        const userData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            role: roleSelect.value,
        };

        // --- Client-side Validation ---
        const confirmPassword = confirmPasswordInput.value;

        // Reset button state and isSubmitting flag if validation fails
        const resetFormOnError = (message) => {
            document.getElementById("error-message").textContent = message;
            document.getElementById("error-message").style.display = 'block';
            isSubmitting = false; 
            submitButton.disabled = false; // Re-enable button
            submitButton.textContent = originalButtonText; // Reset text
            checkFormValidity(); // Re-run validity check after error
        };

        // 1. Password confirmation check
        if (userData.password !== confirmPassword) {
            resetFormOnError("Passwords do not match!");
            return; 
        }

        // 2. Basic password strength check (minimum 8 characters, at least 1 number, 1 special character)
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(userData.password)) {
            resetFormOnError("Password must be at least 8 characters, contain a number, and a special character.");
            return; 
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

            const result = await response.json();

            if (response.ok && result.status === "success") {
                localStorage.setItem('userData', JSON.stringify({
                    username: userData.username,
                    role: userData.role
                }));
                
                document.getElementById("success-message").textContent = result.message;
                document.getElementById("success-message").style.display = 'block';
                
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                // API error
                resetFormOnError(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            // Network error
            resetFormOnError("An error occurred during registration. Please check your internet connection.");
            console.error("Error during fetch:", error);
        }
    });
});