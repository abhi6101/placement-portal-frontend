document.addEventListener('DOMContentLoaded', function () {
    // --- 1. AUTHENTICATION GUARD ---
    // This code runs immediately to protect the page.

    // Get the token from the browser's local storage.
    const token = localStorage.getItem("authToken");

    // Check if the token exists.
    if (!token) {
        // If no token is found, the user is not logged in.
        // Show an alert and redirect them to the login page.
        alert("You must be logged in to view this page.");
        window.location.href = "login.html";
        return; // Stop the script from executing further.
    }

    // --- (Optional but Recommended) Token Expiration Check ---
    // This part checks if the token is still valid (not expired).
    try {
        // The token is in three parts separated by dots: header.payload.signature
        // We need the middle part (payload), which contains the expiration date.
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp; // Expiration time in seconds

        // Compare the expiration time with the current time.
        if (expirationTime < Date.now() / 1000) {
            // If the token is expired, throw an error to be caught below.
            throw new Error("Token expired");
        }
    } catch (e) {
        // If there's an error parsing the token or it's expired...
        alert("Your session has expired. Please log in again.");
        // Clear any leftover bad data from storage.
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        // Redirect to login.
        window.location.href = "login.html";
        return; // Stop the script.
    }

    // If the script reaches this point, the user is authenticated and the token is valid.
    // The rest of the page's functionality can now run.
    console.log("Authentication successful. Welcome to the papers page!");

    // You can add any future JavaScript functionality for this page below.
    // For example, if you wanted to add filtering or search functionality.
});