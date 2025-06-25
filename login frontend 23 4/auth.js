// Inside auth.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    const authToken = localStorage.getItem('authToken');

    // ...

    if (authToken) {
        // --- SCENARIO 1: User is LOGGED IN ---

        // ...

        // This is where the dashboard link is created!
        if (navLinksContainer) {
            navLinksContainer.innerHTML = `
                <li><a href="/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#"><i class="fas fa-user"></i> Profile</a></li>
                <li><button id="logout-button"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
            `;
            // ... (logout button logic)
        }
    } else {
        // --- SCENARIO 2: User is LOGGED OUT ---
        
        // The dashboard link is NOT added here.
        if (navLinksContainer) {
            navLinksContainer.innerHTML = `
                <li><a href="/index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                <li><a href="/register.html"><i class="fas fa-user-plus"></i> Register</a></li>
            `;
        }
    }
});