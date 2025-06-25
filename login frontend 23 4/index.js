document.addEventListener('DOMContentLoaded', () => {

    // --- AUTHENTICATION UI LOGIC --- //
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const displayRole = document.getElementById('displayRole');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

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

                // Show welcome message
                userWelcome.classList.remove('hidden');
                heroHeading.classList.add('hidden'); // Hide original heading
                heroSubtitle.classList.add('hidden'); // Hide original subtitle
                displayUsername.textContent = username;
                displayRole.textContent = userRole;
            }
        } else {
            // Hide welcome message and show defaults
            userWelcome.classList.add('hidden');
            heroHeading.classList.remove('hidden');
            heroSubtitle.classList.remove('hidden');
        }

        // Toggle button visibility using the .hidden class
        loginBtn.classList.toggle('hidden', isLoggedIn);
        registerBtn.classList.toggle('hidden', isLoggedIn);
        logoutBtn.classList.toggle('hidden', !isLoggedIn);
        adminPanelLink.classList.toggle('hidden', !isAdmin);
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                // We just update the UI, no need to redirect if staying on the same page
                updateAuthUI(); 
            }
        });
    }

    // Initial Auth UI update on page load
    updateAuthUI();

    // --- DYNAMIC COPYRIGHT YEAR --- //
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- SCROLL-IN ANIMATIONS (INTERSECTION OBSERVER) --- //
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
});