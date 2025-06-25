document.addEventListener('DOMContentLoaded', () => {
    // --- Element References from your new HTML ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    // Welcome message elements
    const userWelcomeDiv = document.getElementById('userWelcome');
    const displayUsernameSpan = document.getElementById('displayUsername');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');

    // Admin-specific link
    const adminPanelLink = document.getElementById('adminPanelLink');
    
    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Authentication Logic ---
    // Check if an authentication token exists in localStorage
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole'); // Assuming you store the role on login

    if (authToken) {
        // --- SCENARIO 1: USER IS LOGGED IN ---

        // 1. Update Navigation Buttons
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block'; // Show the logout button

        // 2. Update Hero Section Content
        if (registerBtn) registerBtn.style.display = 'none'; // Hide "Register Now" button
        
        // You would get the username from a backend call, but we can use a placeholder for now
        const username = localStorage.getItem('username') || 'User'; // Get username if stored, else 'User'
        
        if (userWelcomeDiv) {
            displayUsernameSpan.textContent = username;
            userWelcomeDiv.style.display = 'block'; // Show personalized welcome
            heroHeading.style.display = 'none'; // Hide generic heading
            heroSubtitle.style.display = 'none'; // Hide generic subtitle
        }
        
        // 3. Check for Admin Role
        if (userRole === 'ADMIN' && adminPanelLink) {
            adminPanelLink.style.display = 'block'; // Show the Admin Panel link
        }

    } else {
        // --- SCENARIO 2: USER IS LOGGED OUT ---
        
        // Ensure the default state is visible
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userWelcomeDiv) userWelcomeDiv.style.display = 'none';
        if (adminPanelLink) adminPanelLink.style.display = 'none';
    }

    // --- Logout Button Functionality ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear all user-related data from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('username');
            
            // Redirect to the landing page to refresh the state
            window.location.href = 'index.html';
        });
    }
    
    // --- Slideshow Functionality ---
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) return; // Exit if no slides are present

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000); // Change image every 4 seconds
    }
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150; // Distance from bottom of viewport to trigger animation

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on page load
});