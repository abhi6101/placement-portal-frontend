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
                heroSubtitle.textContent = 'Ready to find your next opportunity?';
                displayUsername.textContent = username;
                displayRole.textContent = userRole;
            }
        } else {
            // Hide welcome message and show defaults
            userWelcome.classList.add('hidden');
            heroHeading.classList.remove('hidden');
            heroSubtitle.textContent = 'Your comprehensive platform for job placements, resume building, interview preparation, and career growth.';
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
                window.location.href = 'logout-confirmation.html';
            }
        });
    }

    // Initial Auth UI update on page load
    updateAuthUI();


    // --- ENHANCED SLIDESHOW LOGIC --- //
    let slideIndex = 1;
    let autoSlideInterval;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    const slideshowContainer = document.querySelector('.slideshow-container');

    const showSlides = (n) => {
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        slides.forEach(slide => slide.style.display = "none");
        dots.forEach(dot => dot.classList.remove("active"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
    };
    
    const plusSlides = (n) => showSlides(slideIndex += n);
    const currentSlide = (n) => showSlides(slideIndex = n);
    
    const startAutoSlide = () => {
        clearInterval(autoSlideInterval); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            plusSlides(1);
        }, 4000); // Change image every 4 seconds
    };

    if (slides.length > 0) {
        // Set up event listeners for arrows and dots
        document.querySelector('.prev')?.addEventListener('click', () => plusSlides(-1));
        document.querySelector('.next')?.addEventListener('click', () => plusSlides(1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => currentSlide(i + 1)));

        // Pause slideshow on hover
        slideshowContainer?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        slideshowContainer?.addEventListener('mouseleave', startAutoSlide);

        // Initial setup
        showSlides(slideIndex);
        startAutoSlide();
    }


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