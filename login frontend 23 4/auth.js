document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    // The key to our authentication system: the token in localStorage
    const authToken = localStorage.getItem('authToken');

    const handleLogout = () => {
        // Clear the token and redirect to the login page
        localStorage.removeItem('authToken');
        // Optionally clear other user-related localStorage items like username
        localStorage.removeItem('username'); 
        window.location.href = '/login.html';
    };

    // Define common navigation links
    const commonNavItems = [
        { href: '/index.html', icon: 'fas fa-home', text: 'Home' },
        { href: '/gallery.html', icon: 'fas fa-images', text: 'Gallery' },
        { href: '/videos.html', icon: 'fas fa-video', text: 'Study Videos' },
        { href: '/courses.html', icon: 'fas fa-book', text: 'Courses' },
        { href: '/blog.html', icon: 'fas fa-blog', text: 'Blog' },
        { href: '/contact.html', icon: 'fas fa-envelope', text: 'Contact' }
    ];

    // Function to render navigation links
    const renderNav = (isLoggedInUser) => {
        if (!navLinksContainer) return; // Exit if nav container not found

        let navHtml = '';

        // Add common links first
        commonNavItems.forEach(item => {
            const isActive = window.location.pathname === item.href;
            navHtml += `<li><a href="${item.href}" ${isActive ? 'class="active"' : ''}><i class="${item.icon}"></i> ${item.text}</a></li>`;
        });

        if (isLoggedInUser) {
            // Add logged-in specific links
            const isDashboardActive = window.location.pathname === '/dashboard.html';
            navHtml += `<li><a href="/dashboard.html" ${isDashboardActive ? 'class="active"' : ''}><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>`;
            
            // Assuming admin panel link depends on a role, which would be part of your token payload or user data
            // For now, it's just commented out as a reminder. You'd check a user's role here.
            // if (userHasAdminRole()) { 
            // navHtml += `<li id="adminPanelLink"><a href="/admin-dashboard.html"><i class="fas fa-user-shield"></i> Admin Panel</a></li>`;
            // }
            
            navHtml += `
                <li class="nav-btns">
                    <button id="logout-button" class="btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
                </li>
            `;
            
            // Update welcome message on index.html if user is logged in
            const userWelcome = document.getElementById('userWelcome');
            const displayUsername = document.getElementById('displayUsername');
            const heroHeading = document.getElementById('heroHeading');
            const heroSubtitle = document.getElementById('heroSubtitle');
            const registerBtn = document.getElementById('registerBtn');
            const dashboardUsername = document.getElementById('dashboardUsername'); // For dashboard.html

            if (userWelcome && displayUsername) {
                // Assuming you store username in localStorage upon login
                displayUsername.textContent = localStorage.getItem('username') || 'Buddy'; 
                userWelcome.style.display = 'block';
                if (heroHeading) heroHeading.style.display = 'none'; 
                if (heroSubtitle) heroSubtitle.style.display = 'none'; 
                if (registerBtn) registerBtn.style.display = 'none'; 
            }
            if (dashboardUsername) {
                dashboardUsername.textContent = localStorage.getItem('username') || 'User';
            }


        } else {
            // Add logged-out specific links
            const isLoginActive = window.location.pathname === '/login.html';
            const isRegisterActive = window.location.pathname === '/register.html';
            navHtml += `
                <li class="nav-btns">
                    <a href="/login.html" id="loginBtn" class="btn ${isLoginActive ? 'active' : ''}"><i class="fas fa-sign-in-alt"></i> Login</a>
                    <a href="/register.html" id="registerBtn" class="btn btn-outline ${isRegisterActive ? 'active' : ''}"><i class="fas fa-user-plus"></i> Register</a>
                </li>
            `;
            // Ensure welcome message is hidden if logged out
            const userWelcome = document.getElementById('userWelcome');
            const heroHeading = document.getElementById('heroHeading');
            const heroSubtitle = document.getElementById('heroSubtitle');
            const registerBtn = document.getElementById('registerBtn');

            if (userWelcome) userWelcome.style.display = 'none';
            if (heroHeading) heroHeading.style.display = 'block';
            if (heroSubtitle) heroSubtitle.style.display = 'block';
            if (registerBtn) registerBtn.style.display = 'block';
        }

        navLinksContainer.innerHTML = navHtml;

        // Attach event listener for logout button if it exists
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    };

    // Authentication and Redirection Logic
    if (authToken) {
        // User is LOGGED IN
        if (window.location.pathname.includes('/login.html') || window.location.pathname.includes('/register.html') || window.location.pathname === '/') {
            // Redirect to dashboard if logged in and trying to access login, register, or root
            window.location.href = '/dashboard.html';
            return; 
        }
        renderNav(true); // Render navigation for logged-in user
    } else {
        // User is LOGGED OUT
        const protectedPages = ['/dashboard.html']; // Add other protected pages here
        if (protectedPages.some(page => window.location.pathname.includes(page))) {
            // Redirect to login if logged out and trying to access a protected page
            window.location.href = '/login.html';
            return;
        }
        renderNav(false); // Render navigation for logged-out user
    }

    // Mobile menu toggle (assuming this logic is in your index.js, but good to keep in mind)
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
        });
    }
});

// IMPORTANT: You'll need to set the 'authToken' in localStorage upon successful login.
// Example (in your login form submission handler):
/*
fetch('/api/login', { // Replace with your actual login endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail, password: userPassword })
})
.then(response => response.json())
.then(data => {
    if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.username); // Store username for display
        window.location.href = '/dashboard.html';
    } else {
        alert('Login failed: ' + data.message);
    }
})
.catch(error => console.error('Login error:', error));
*/