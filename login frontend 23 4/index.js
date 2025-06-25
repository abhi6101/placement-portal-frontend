document.addEventListener('DOMContentLoaded', () => {

    // --- AUTHENTICATION & UI LOGIC --- //

    // 1. Get all relevant elements from the page
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const displayRole = document.getElementById('displayRole');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const loginForm = document.getElementById('loginForm'); // This will only be found on login.html

    // 2. Helper function to decode JWT token
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.error("Error decoding JWT token:", e);
            return null;
        }
    };

    // 3. Function to update the entire UI based on auth state
    const updateAuthUI = () => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        let isAdmin = false;

        if (isLoggedIn) {
            const payload = parseJwt(token);
            if (payload) {
                const username = payload.sub || 'User';
                isAdmin = (payload.roles || []).includes("ROLE_ADMIN");
                const userRole = isAdmin ? 'Admin' : 'Student';

                // Show the personalized welcome message
                userWelcome.classList.remove('hidden');
                heroHeading.classList.add('hidden');
                heroSubtitle.classList.add('hidden');
                displayUsername.textContent = username;
                displayRole.textContent = userRole;
            }
        } else {
            // Show the default hero content for logged-out users
            userWelcome.classList.add('hidden');
            heroHeading.classList.remove('hidden');
            heroSubtitle.classList.remove('hidden');
        }

        // Toggle button visibility using CSS classes for a cleaner approach
        loginBtn.classList.toggle('hidden', isLoggedIn);
        registerBtn.classList.toggle('hidden', isLoggedIn);
        logoutBtn.classList.toggle('hidden', !isLoggedIn);
        adminPanelLink.classList.toggle('hidden', !isAdmin);
    };

    // 4. Handle login form submission (This code only runs if the loginForm exists)
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

                if (response.ok && data.token) {
                    localStorage.setItem('authToken', data.token);
                    const payload = parseJwt(data.token);
                    
                    if (successElement) {
                        successElement.textContent = 'Login successful! Redirecting...';
                        successElement.style.display = 'block';
                    }

                    // Redirect after a short delay
                    setTimeout(() => {
                        const isAdmin = payload && (payload.roles || []).includes("ROLE_ADMIN");
                        window.location.href = isAdmin ? 'admin-dashboard.html' : 'index.html';
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

    // 5. Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (!confirm('Are you sure you want to log out?')) {
                return; // Stop if user cancels
            }

            const token = localStorage.getItem('authToken');
            
            try {
                // Optional: Notify backend of logout for session invalidation
                await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (e) {
                console.warn('Backend logout notification failed:', e);
            } finally {
                // Always clear local data and redirect
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = 'logout-confirmation.html'; // Or 'index.html'
            }
        });
    }
    
    // --- ADDITIONAL PAGE FEATURES --- //

    // 6. Slideshow functionality (if a slideshow exists on the page)
    const slides = document.querySelectorAll(".mySlides");
    if (slides.length > 0) {
        let slideIndex = 0;
        const showSlides = () => {
            slides.forEach(slide => slide.style.display = "none");
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000); // Change image every 4 seconds
        };
        showSlides();
    }

    // 7. Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 8. Scroll-In Animations
    const animatedElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    animatedElements.forEach(el => observer.observe(el));

    // --- INITIALIZATION --- //
    
    // 9. Run the UI update function once on page load to set the initial state
    updateAuthUI();
});