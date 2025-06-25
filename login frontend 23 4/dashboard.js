document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AUTHENTICATION CHECK ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        // If no token is found, redirect the user to the login page immediately.
        window.location.href = '/login.html';
        return; // Stop the script from running further.
    }

    // --- 2. ELEMENT REFERENCES ---
    const logoutButton = document.getElementById('logout-button-sidebar');
    const welcomeMessage = document.getElementById('welcome-message');
    const userFullName = document.getElementById('user-fullname');
    const userHandle = document.getElementById('user-handle');
    const userInitial = document.getElementById('user-initial');

    // --- 3. LOGOUT FUNCTIONALITY ---
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        window.location.href = '/login.html';
    };

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // --- 4. DISPLAY USER DATA ---
    // This function populates the dashboard with the user's information.
    const displayUserData = () => {
        // Retrieve data saved during login.
        const username = localStorage.getItem('username');
        
        if (username) {
            // In a real app, you might have a full name. Here we use the username.
            userFullName.textContent = username;
            userHandle.textContent = `@${username.toLowerCase()}`;
            welcomeMessage.textContent = `Welcome back, ${username}!`;
            userInitial.textContent = username.charAt(0).toUpperCase();
        }
    };
    
    // Run the function to display user data as soon as the page loads.
    displayUserData();
});