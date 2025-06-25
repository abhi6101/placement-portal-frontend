document.addEventListener('DOMContentLoaded', () => {

    // --- AUTHENTICATION & UI LOGIC (Your Proven Code) ---

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
    const loginForm = document.getElementById('loginForm');

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
                userWelcome.classList.remove('hidden');
                heroHeading.classList.add('hidden');
                heroSubtitle.classList.add('hidden');
                displayUsername.textContent = username;
                displayRole.textContent = userRole;
            }
        } else {
            userWelcome.classList.add('hidden');
            heroHeading.classList.remove('hidden');
            heroSubtitle.classList.remove('hidden');
        }

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
            if (!confirm('Are you sure you want to log out?')) return;
            const token = localStorage.getItem('authToken');
            try {
                await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (e) {
                console.warn('Backend logout notification failed:', e);
            } finally {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = 'logout-confirmation.html';
            }
        });
    }

    // --- ENHANCED INTERACTIVE EFFECTS ---

    // 6. Mouse-Tracking Spotlight Effect for the entire page
    window.addEventListener('mousemove', e => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 7. 3D Interactive Card Tilt Effect
    const interactiveCards = document.querySelectorAll('.features-box, .testimonial-card');
    interactiveCards.forEach(card => {
        // Dynamically add a div for the inner glow effect if it doesn't exist
        if (!card.querySelector('.inner-glow')) {
            const glow = document.createElement('div');
            glow.className = 'inner-glow';
            card.appendChild(glow);
        }
        
        const glow = card.querySelector('.inner-glow');

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            if (glow) {
                glow.style.setProperty('--mouse-card-x', `${x}px`);
                glow.style.setProperty('--mouse-card-y', `${y}px`);
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });


    // --- OTHER PAGE FEATURES ---

    // 8. Slideshow functionality
    const slides = document.querySelectorAll(".mySlides");
    if (slides.length > 0) {
        let slideIndex = 0;
        const showSlides = () => {
            slides.forEach(slide => slide.style.display = "none");
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000);
        };
        showSlides();
    }

    // 9. Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 10. Scroll-In Animations
    const animatedElements = document.querySelectorAll('.fade-in, .features-grid, .testimonial-cards');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));


    // --- INITIALIZATION ---
    
    // 11. Run the UI update function once on page load
    updateAuthUI();
});