document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const authToken = localStorage.getItem('authToken');

    // This function will fetch user data from a protected backend endpoint
    const fetchUserProfile = async () => {
        if (!authToken) {
            // This is a fallback, auth.js should have already redirected
            console.error('No auth token found.');
            return;
        }

        try {
            // **IMPORTANT**: You need to create this backend endpoint
            const response = await fetch('https://placement-portal-backend-nwaj.onrender.com/api/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // The token is sent in the Authorization header
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                // Personalize the welcome message
                welcomeMessage.textContent = `Welcome, ${user.username}!`;
            } else {
                // If token is invalid or expired, backend will likely return 401/403
                console.error('Failed to fetch user profile:', response.statusText);
                // The auth.js script should handle redirecting on token failure,
                // but we can also force it here.
                localStorage.removeItem('authToken');
                window.location.href = '/login.html';
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            welcomeMessage.textContent = 'Welcome!'; // Fallback message
        }
    };

    // Run the function to get user data when the page loads
    fetchUserProfile();
});