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
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    // NEW Regex for username:
    // - Must contain at least one digit (?=.*\d)
    // - Must contain at least one special character from the set !@#$%^&*()_+-=[]{};':"|,.<>/?`~ (?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?`~])
    // - Total length 3 to 20 characters
    // - Can contain alphanumeric, and the specified special characters
    const usernameRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?`~])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?`~]{3,20}$/;


    // Function to check if all fields are valid and enable/disable button
    const checkFormValidity = () => {
        const usernameValue = usernameInput.value.trim();
        const isUsernameValid = usernameValue !== '' && usernameRegex.test(usernameValue);
        
        const isEmailFilled = emailInput.value.trim() !== '';
        const isRoleSelected = roleSelect.value !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        const isConfirmPasswordFilled = confirmPasswordInput.value.trim() !== '';

        const allFieldsFilledAndValid = isUsernameValid && isEmailFilled && isRoleSelected && isPasswordFilled && isConfirmPasswordFilled;
        
        submitButton.disabled = !allFieldsFilledAndValid; 
    };

    // Add event listeners to all input fields
    usernameInput.addEventListener('input', () => {
        checkFormValidity();
        // Clear username error message immediately if user starts typing again
        if (errorMessageDiv.textContent.includes("Username")) {
            errorMessageDiv.style.display = 'none';
            errorMessageDiv.textContent = '';
        }
    });
    emailInput.addEventListener('input', checkFormValidity);
    roleSelect.addEventListener('change', checkFormValidity); 
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
        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';

        const userData = {
            username: usernameInput.value.trim(), // Use trimmed value for API
            email: emailInput.value.trim(),
            password: passwordInput.value,
            role: roleSelect.value,
        };

        // --- Client-side Validation ---
        const confirmPassword = confirmPasswordInput.value;

        // Reset button state and isSubmitting flag if validation fails
        const resetFormOnError = (message) => {
            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
            isSubmitting = false; 
            submitButton.disabled = false; // Re-enable button
            submitButton.textContent = originalButtonText; // Reset text
            checkFormValidity(); // Re-run validity check after error
        };

        // 1. Username format validation 
        if (!usernameRegex.test(userData.username)) {
            resetFormOnError("Username must be 3-20 characters long, contain at least one digit, and at least one special character (e.g., !@#$%^&*).");
            return;
        }

        // 2. Password confirmation check
        if (userData.password !== confirmPassword) {
            resetFormOnError("Passwords do not match!");
            return; 
        }

        // 3. Basic password strength check (minimum 8 characters, at least 1 number, 1 special character)
        // This is your existing password regex
        const passwordStrengthRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordStrengthRegex.test(userData.password)) {
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
                
                successMessageDiv.textContent = result.message;
                successMessageDiv.style.display = 'block';
                
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