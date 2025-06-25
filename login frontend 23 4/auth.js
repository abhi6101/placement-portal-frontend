document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    const authToken = localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        // Redirect to login page after logout
        window.location.href = '/login.html';
    };

    if (authToken) {
        // User is logged IN
        // For pages that should NOT be accessible when logged in (like login, register)
        if (window.location.pathname.includes('/login.html') || window.location.pathname.includes('/register.html')) {
            window.location.href = '/dashboard.html'; // Redirect to dashboard
            return;
        }

        // Populate nav with links for logged-in users
        if (navLinksContainer) {
            navLinksContainer.innerHTML = `
                <li><a href="/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="/profile.html"><i class="fas fa-user"></i> Profile</a></li>
                <li><button id="logout-button"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
            `;
            
            const logoutButton = document.getElementById('logout-button');
            if (logoutButton) {
                logoutButton.addEventListener('click', handleLogout);
            }
        }
    } else {
        // User is logged OUT
        // Protect pages that require login
        const protectedPages = ['/dashboard.html', '/profile.html', '/jobs.html', '/applications.html'];
        if (protectedPages.some(page => window.location.pathname.includes(page))) {
            window.location.href = '/login.html'; // Redirect to login
            return;
        }
        
        // Populate nav with links for logged-out users
        if (navLinksContainer) {
            navLinksContainer.innerHTML = `
                <li><a href="/index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                <li><a href="/register.html"><i class="fas fa-user-plus"></i> Register</a></li>
            `;
        }
    }
});