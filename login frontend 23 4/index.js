document.addEventListener('DOMContentLoaded', () => {

    //======================================//
    //== 1. AUTHENTICATION & UI MANAGEMENT ==//
    //======================================//

    // Get all relevant elements (do this once)
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const displayRole = document.getElementById('displayRole');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const loginForm = document.getElementById('loginForm');

    // Helper function to decode JWT token
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.error("Error decoding JWT token:", e);
            return null;
        }
    };

    // Function to update UI based on auth state (adapted for new design)
    const updateUI = () => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        let isAdmin = false;
        let username = '';
        let userRole = 'Student';

        if (isLoggedIn) {
            const payload = parseJwt(token);
            if (payload) {
                username = payload.sub || payload.username || 'User';
                const roles = payload.roles || payload.authorities || [];
                isAdmin = roles.includes("ROLE_ADMIN");
                userRole = isAdmin ? 'Admin' : 'Student';
            }

            // For logged-in users, show the welcome box and hide the generic subtitle
            if (heroSubtitle) heroSubtitle.style.display = 'none';
            if (userWelcome) {
                userWelcome.style.display = 'block';
                displayUsername.textContent = username;
                displayRole.textContent = userRole;
            }
        } else {
            // For logged-out users, show the generic subtitle and hide the welcome box
            if (heroSubtitle) heroSubtitle.style.display = 'block';
            if (userWelcome) userWelcome.style.display = 'none';
        }

        // Update button visibility
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
        if (adminPanelLink) adminPanelLink.style.display = isAdmin ? 'block' : 'none';
        if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    };

    // Initial UI update on page load
    updateUI();

    // Handle login form submission (this will only run on pages with a loginForm)
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
                    
                    const payload = parseJwt(data.token);
                    if (payload) {
                        localStorage.setItem('userData', JSON.stringify({
                            username: payload.sub || username,
                            role: payload.roles?.includes("ROLE_ADMIN") ? "ADMIN" : "USER"
                        }));
                    }
                    
                    if (successElement) {
                        successElement.textContent = 'Login successful! Redirecting...';
                        successElement.style.display = 'block';
                    }

                    setTimeout(() => {
                        window.location.href = payload && payload.roles?.includes("ROLE_ADMIN") 
                            ? 'admin-dashboard.html' 
                            : 'index.html';
                    }, 500);
                } else {
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

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (!confirm('Are you sure you want to log out?')) {
                return; // Stop if user cancels
            }

            const token = localStorage.getItem('authToken');
            
            try {
                await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (e) {
                console.warn('Logout notification to backend failed:', e);
            } finally {
                // Clear all auth-related data from local storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                // Redirect to the homepage to see the logged-out state.
                window.location.href = 'index.html'; 
            }
        });
    }


    //======================================//
    //======= 2. GALLERY SLIDESHOW =========//
    //======================================//

    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");

    function showSlides() {
        // Guard clause in case slideshow isn't on the page
        if (slides.length === 0) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000); // Recursive call for automatic slideshow
    }

    showSlides(); // Start the slideshow


    //======================================//
    //===== 3. ON-SCROLL ANIMATIONS ========//
    //======================================//

    const sectionsToAnimate = document.querySelectorAll('section:not(.hero)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the section is visible
    });

    sectionsToAnimate.forEach(section => {
        // Set initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

});