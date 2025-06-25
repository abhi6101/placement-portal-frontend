document.addEventListener('DOMContentLoaded', () => {
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
            if (userWelcome) {
                userWelcome.style.display = 'block';
                displayUsername.textContent = username;
            }
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
            window.location.href = 'logout-confirmation.html';
        });
    }

    updateUI();

    // --- NEW: REVEAL ON SCROLL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- NEW: ANIMATED STATS COUNTER ---
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200; // Speed of the count

        if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target.toLocaleString(); // Add commas for thousands
        }
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    countUp(counter);
                });
                observer.unobserve(statsSection); // Only run the counter animation once
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the stats section is visible
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // --- SLIDESHOW LOGIC (If you have it on the page) ---
    // Your existing slideshow JS can go here.
});