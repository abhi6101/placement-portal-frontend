// Wrap the entire application logic in a single object (Module Pattern)
const App = {
    // --- 1. Properties & Elements ---
    config: {
        // Centralized configuration for easy updates
        apiBaseUrl: 'https://placement-portal-backend-nwaj.onrender.com/api/auth',
    },
    elements: {
        // A cache for frequently accessed DOM elements to improve performance
        loginBtn: null, logoutBtn: null, adminPanelLink: null, registerBtn: null,
        userWelcome: null, displayUsername: null, displayRole: null,
        heroHeading: null, heroSubtitle: null,
        slideshowContainer: null, sectionsToAnimate: null,
        membersFeaturesSection: null,
    },

    // --- 2. Initialization ---
    init() {
        this.cacheDOMElements();     // Find and store all necessary DOM elements
        this.initEventListeners();   // Set up event listeners (like the logout button)
        this.ui.update();            // Update the UI based on the initial auth state
        this.slideshow.init();       // Start the image slideshow
        this.animations.init();      // Initialize scroll-triggered animations
    },

    // Finds all required elements on the page and stores them in App.elements
    cacheDOMElements() {
        this.elements.loginBtn = document.getElementById('loginBtn');
        this.elements.logoutBtn = document.getElementById('logoutBtn');
        this.elements.adminPanelLink = document.getElementById('adminPanelLink');
        this.elements.registerBtn = document.getElementById('registerBtn');
        this.elements.userWelcome = document.getElementById('userWelcome');
        this.elements.displayUsername = document.getElementById('displayUsername');
        this.elements.displayRole = document.getElementById('displayRole');
        this.elements.heroHeading = document.getElementById('heroHeading');
        this.elements.heroSubtitle = document.getElementById('heroSubtitle');
        this.elements.slideshowContainer = document.querySelector('.slideshow-container');
        this.elements.sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
        this.elements.membersFeaturesSection = document.getElementById('members-features');
    },

    // Attaches event listeners to interactive elements
    initEventListeners() {
        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => this.auth.handleLogout());
        }
    },

    // --- 3. Functional Modules ---

    // Handles all authentication-related logic
    auth: {
        // Helper function to decode a JWT token payload
        _parseJwt(token) {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) { return null; }
        },
        // Checks localStorage for a valid token and returns user data
        getUserData() {
            const token = localStorage.getItem('authToken');
            if (!token) return { isLoggedIn: false };

            const payload = this._parseJwt(token);
            // If token is invalid or expired, clear storage and log out
            if (!payload || payload.exp < Date.now() / 1000) {
                localStorage.clear();
                return { isLoggedIn: false };
            }
            // Determine user role (supports different token structures)
            const roles = payload.roles || payload.authorities || [];
            return {
                isLoggedIn: true,
                username: payload.sub || 'User',
                role: roles.includes("ROLE_ADMIN") ? 'Admin' : 'Student',
                isAdmin: roles.includes("ROLE_ADMIN"),
            };
        },
        // Handles the user logout process
        async handleLogout() {
            if (!confirm('Are you sure you want to log out?')) return;
            localStorage.removeItem('authToken'); // Immediately remove token for instant UI update
            localStorage.removeItem('userRole');
            App.ui.update(); // Update the UI to reflect the logged-out state

            // Optional: Notify backend about the logout (can fail gracefully)
            const token = localStorage.getItem('authToken');
            try {
                if (token) {
                    await fetch(`${App.config.apiBaseUrl}/logout`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
            } catch (e) { console.warn('Logout notification to backend failed:', e); }
        }
    },

    // Manages all dynamic UI updates
    ui: {
        update() {
            const userData = App.auth.getUserData();
            const { elements } = App; // Shortcut to access elements

            const isLoggedIn = userData.isLoggedIn;

            // Toggle visibility based on login state
            if (elements.userWelcome) elements.userWelcome.style.display = isLoggedIn ? 'block' : 'none';
            if (elements.heroHeading) elements.heroHeading.style.display = isLoggedIn ? 'none' : 'block';
            if (elements.heroSubtitle) elements.heroSubtitle.style.display = isLoggedIn ? 'none' : 'block';
            if (elements.registerBtn) elements.registerBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
            if (elements.loginBtn) elements.loginBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
            if (elements.logoutBtn) elements.logoutBtn.style.display = isLoggedIn ? 'inline-flex' : 'none';
            if (elements.adminPanelLink) elements.adminPanelLink.style.display = isLoggedIn && userData.isAdmin ? 'block' : 'none';
            
            // This logic hides the "members features" teaser section if the user is already a member (logged in)
            if (elements.membersFeaturesSection) elements.membersFeaturesSection.style.display = isLoggedIn ? 'none' : 'block';
            
            // If logged in, update the welcome message
            if (isLoggedIn) {
                if (elements.displayUsername) elements.displayUsername.textContent = userData.username;
                if (elements.displayRole) elements.displayRole.textContent = userData.role;
            }
        }
    },

    // Controls the image slideshow in the gallery
    slideshow: {
        slideIndex: 0,
        init() {
            if (App.elements.slideshowContainer) this.run();
        },
        run() {
            const slides = App.elements.slideshowContainer.getElementsByClassName("mySlides");
            if (slides.length === 0) return;
            // Hide all slides
            for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
            // Increment index and loop back if necessary
            this.slideIndex++;
            if (this.slideIndex > slides.length) { this.slideIndex = 1; }
            // Display the current slide
            slides[this.slideIndex - 1].style.display = "block";
            // Call this function again after a delay
            setTimeout(() => this.run(), 4000);
        }
    },

    // Manages the "fade in on scroll" animations
    animations: {
        init() {
            const sections = App.elements.sectionsToAnimate;
            if (sections.length > 0) this.setupScrollObserver(sections);
        },
        setupScrollObserver(sections) {
            // The Intersection Observer is an efficient way to detect when elements enter the viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // If the section is intersecting (visible)
                    if (entry.isIntersecting) {
                        // Trigger the animation by changing styles
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        // Stop observing the element once it has been animated
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 }); // Trigger when 15% of the section is visible

            // Set initial styles for all sections to be animated (hidden)
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(section); // Start observing the section
            });
        }
    }
};

// Wait for the DOM to be fully loaded before initializing the application
document.addEventListener('DOMContentLoaded', () => App.init());