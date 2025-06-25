document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- AUTHENTICATION & UI LOGIC (No changes here) ---
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const heroHeading = document.getElementById('heroHeading');

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const updateUI = () => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        let isAdmin = false;
        let username = '';

        if (isLoggedIn) {
            const payload = parseJwt(token);
            if (payload) {
                username = payload.sub || 'User';
                const roles = payload.roles || payload.authorities || [];
                isAdmin = roles.includes("ROLE_ADMIN");
            }
            if (userWelcome) userWelcome.style.display = 'block';
            if (displayUsername) displayUsername.textContent = username;
            if (heroHeading) heroHeading.style.display = 'none';
        } else {
            if (userWelcome) userWelcome.style.display = 'none';
            if (heroHeading) heroHeading.style.display = 'block';
        }

        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'flex';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'flex' : 'none';
        if (adminPanelLink) adminPanelLink.style.display = isAdmin ? 'block' : 'none';
        if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'flex';
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (!confirm('Are you sure you want to log out?')) return;
            localStorage.removeItem('authToken');
            // We should also remove userRole from localStorage on logout
            localStorage.removeItem('userRole'); 
            window.location.href = 'logout-confirmation.html';
        });
    }

    updateUI();

    // --- REVEAL ON SCROLL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- ANIMATED STATS COUNTER ---
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const increment = target / 100; // Animation speed
                        
                        if(count < target) {
                            counter.innerText = `${Math.ceil(count + increment)}`;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };
                    updateCount();
                });
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});