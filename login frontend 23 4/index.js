document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- AUTHENTICATION & UI LOGIC ---
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');
    const registerBtn = document.getElementById('registerBtn');
    const userWelcome = document.getElementById('userWelcome');
    const displayUsername = document.getElementById('displayUsername');
    const heroHeading = document.getElementById('heroHeading');

    const parseJwt = (token) => {
        try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; }
    };

    const updateUI = () => {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        if (isLoggedIn) {
            const payload = parseJwt(token);
            if (payload) {
                if (displayUsername) displayUsername.textContent = payload.sub || 'User';
                if (payload.roles?.includes("ROLE_ADMIN")) {
                    if (adminPanelLink) adminPanelLink.style.display = 'block';
                }
            }
            if (userWelcome) userWelcome.style.display = 'block';
            if (heroHeading) heroHeading.style.display = 'none';
        }
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'flex';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'flex' : 'none';
        if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'flex';
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (!confirm('Are you sure you want to log out?')) return;
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = 'logout-confirmation.html';
        });
    }
    updateUI();

    // --- REVEAL ON SCROLL ANIMATION ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- ANIMATED STATS COUNTER ---
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const increment = target / 100;
                        if(count < target) {
                            counter.innerText = `${Math.ceil(count + increment)}`;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // --- AUTOMATIC SLIDESHOW FOR GALLERY ---
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    function showSlides() {
        if (slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000); // Change image every 4 seconds
    }
    showSlides();
});