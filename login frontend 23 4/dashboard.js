document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Check ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        // If no token, redirect to login page immediately
        window.location.href = '/login.html';
        return; // Stop script execution
    }

    // --- Element References ---
    const logoutButton = document.getElementById('logout-button-sidebar');
    const welcomeMessage = document.getElementById('welcome-message');
    const userFullName = document.getElementById('user-fullname');
    const userHandle = document.getElementById('user-handle');
    const userInitial = document.getElementById('user-initial');

    // --- Logout Functionality ---
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login.html';
    };

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // --- Fetch User Data (Placeholder) ---
    // In the future, you will fetch user data from your backend here.
    // For now, we'll use mock data.
    const fetchAndDisplayUserData = () => {
        // MOCK USER DATA (Replace with a real API call)
        const mockUser = {
            fullName: "Abhi Jain",
            username: "@abhi21",
            // You would get other details like company, location etc. here
        };

        // Populate the UI with user data
        if (mockUser) {
            welcomeMessage.textContent = `Welcome back, ${mockUser.fullName.split(' ')[0]}!`;
            userFullName.textContent = mockUser.fullName;
            userHandle.textContent = mockUser.username;
            if (mockUser.fullName) {
                userInitial.textContent = mockUser.fullName.charAt(0).toUpperCase();
            }
        }
    };
    
    // Call the function to display user data
    fetchAndDisplayUserData();
});