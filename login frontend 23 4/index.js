document.addEventListener('DOMContentLoaded', () => {
    // --- Get all relevant elements ---
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const displayRole = document.getElementById('displayRole');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const loginForm = document.getElementById('loginForm'); // This will only exist on login.html

    // --- Helper function to decode JWT token ---
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.error("Error decoding JWT token:", e);
            return null;
        }
    };

    // --- Function to update UI based on authentication state ---
    const updateUI = () => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        let isAdmin = false;
        let username = '';
        let userRole = 'Student'; // Default role for display

        if (isLoggedIn) {
            const payload = parseJwt(token);
            if (payload) {
                username = payload.sub || payload.username || 'User';
                // Assuming 'roles' or 'authorities' array in JWT payload
                const roles = payload.roles || payload.authorities || [];
                isAdmin = roles.includes("ROLE_ADMIN");
                userRole = isAdmin ? 'Admin' : 'Student';

                // Display welcome section and hide generic hero content
                if (userWelcome) {
                    userWelcome.style.display = 'block';
                    displayUsername.textContent = username;
                    displayRole.textContent = userRole;
                }
                if (heroHeading) heroHeading.style.display = 'none';
                if (heroSubtitle) heroSubtitle.textContent = 'Ready to launch your career? Explore new opportunities or continue your learning journey!';

            } else {
                // Token exists but is invalid, force logout
                console.warn("Invalid token found, logging out.");
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                // Don't redirect immediately, let the UI update to logged out state
                // This ensures the updateUI function runs correctly for the logged-out state.
                updateUI(); // Re-run updateUI to reflect the logged-out state
                return; // Exit to prevent further logic with an invalid token
            }
        } else {
            // User is logged out
            // Hide welcome section and show generic hero content
            if (userWelcome) userWelcome.style.display = 'none';
            if (heroHeading) heroHeading.style.display = 'block';
            if (heroSubtitle) heroSubtitle.textContent = 'Your comprehensive platform for job placements, resume building, interview preparation, and career growth.';
        }

        // Update button visibility (these elements might be on different pages)
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
        // For adminPanelLink (which is likely an <li>), use 'list-item' display property
        if (adminPanelLink) adminPanelLink.style.display = isAdmin ? 'list-item' : 'none';
        if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    };

    // --- Initial UI update when the page loads ---
    updateUI();

    // --- Handle login form submission (only if on login.html) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('error-message');
            const successElement = document.getElementById('success-message');

            if (errorElement) errorElement.style.display = 'none';
            if (successElement) successElement.style.display = 'none';

            try {
                const response = await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('authToken', data.token);

                    // Store user data from login response for immediate UI updates
                    const payload = parseJwt(data.token);
                    if (payload) {
                        const roles = payload.roles || payload.authorities || [];
                        const userRoleForStorage = roles.includes("ROLE_ADMIN") ? "Admin" : "Student";
                        localStorage.setItem('userData', JSON.stringify({
                            username: payload.sub || username,
                            role: userRoleForStorage
                        }));
                    }

                    if (successElement) {
                        successElement.textContent = 'Login successful! Redirecting...';
                        successElement.style.display = 'block';
                    }

                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = payload && payload.roles?.includes("ROLE_ADMIN")
                            ? 'admin-dashboard.html'
                            : 'index.html';
                    }, 500);
                } else {
                    // Login failed
                    if (errorElement) {
                        errorElement.textContent = data.message || 'Invalid username or password';
                        errorElement.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                if (errorElement) {
                    errorElement.textContent = 'Network error. Please try again.';
                    errorElement.style.display = 'block';
                }
            }
        });
    }

    // --- Handle logout ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (!confirm('Are you sure you want to log out?')) {
                return; // Stop if user cancels
            }

            const token = localStorage.getItem('authToken');

            try {
                // Attempt to notify backend of logout (optional, but good practice for session invalidation)
                await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (e) {
                console.warn('Logout notification to backend failed (may be due to expired token or network issue):', e);
                // Continue with client-side logout even if backend notification fails
            } finally {
                // Clear all auth-related data from client-side storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');

                // Update UI immediately to reflect logged-out state
                updateUI();

                // Redirect to home page or a logout confirmation page
                window.location.href = 'index.html'; // Changed to index.html for a common landing
            }
        });
    }

    // --- Slideshow functionality for the HOME PAGE ---
    let slideIndex = 0; // Initialize slideIndex within the main DCL scope
    let autoSlideInterval; // Declare interval variable

    const slides = document.getElementsByClassName("mySlides"); // Get slides once

    function showSlides() {
        // Only run if slides exist on the page
        if (slides.length === 0) {
            console.warn("No slideshow elements found on this page.");
            return;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
    }

    function startAutoSlide() {
        // Clear any existing interval to prevent multiple intervals running
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(showSlides, 4000); // Change image every 4 seconds
    }

    // Initialize slideshow if elements exist on the page
    if (slides.length > 0) {
        showSlides(); // Show the first slide immediately
        startAutoSlide(); // Start automatic progression
    }
});