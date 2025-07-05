/**
 * ============================================
 *  Hack-2-Hired: Main Application Script
 * ============================================
 *  Handles user authentication, UI updates,
 *  slideshows, and scroll animations.
 */

// Encapsulate all logic within a single App object to avoid global scope pollution.
const App = {

    // --- 1. Configuration & State ---

    config: {
        // Centralized API endpoint for easy updates.
        apiBaseUrl: 'https://placement-portal-backend-nwaj.onrender.com/api/auth',
    },

    // Cache for DOM elements to avoid repeated queries.
    elements: {
        loginBtn: null,
        logoutBtn: null,
        adminPanelLink: null,
        registerBtn: null,
        userWelcome: null,
        displayUsername: null,
        displayRole: null,
        heroSubtitle: null,
        slideshowContainer: null,
    },

    // --- 2. Initialization ---

    /**
     * The entry point of the application.
     * Runs when the DOM is fully loaded.
     */
    init() {
        this.cacheDOMElements();
        this.initEventListeners();
        this.ui.update();
        this.slideshow.init();
        this.animations.init();
        console.log("Hack-2-Hired App Initialized.");
    },

    /**
     * Finds and stores references to key DOM elements.
     * Optional chaining (?.) is used to prevent errors if an element is not on the page.
     */
    cacheDOMElements() {
        this.elements.loginBtn = document.getElementById('loginBtn');
        this.elements.logoutBtn = document.getElementById('logoutBtn');
        this.elements.adminPanelLink = document.getElementById('adminPanelLink');
        this.elements.registerBtn = document.getElementById('registerBtn');
        this.elements.userWelcome = document.getElementById('userWelcome');
        this.elements.displayUsername = document.getElementById('displayUsername');
        this.elements.displayRole = document.getElementById('displayRole');
        this.elements.heroSubtitle = document.getElementById('heroSubtitle');
        this.elements.slideshowContainer = document.querySelector('.platform-preview'); // Changed from gallery
    },

    /**
     * Attaches event listeners to interactive elements.
     */
    initEventListeners() {
        // Use optional chaining to safely add event listener
        this.elements.logoutBtn?.addEventListener('click', () => this.auth.handleLogout());
    },


    // --- 3. Functional Modules ---

    /**
     *  Handles all authentication-related logic.
     */
    auth: {
        _parseJwt(token) {
            try {
                // Decode the payload part of the JWT
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            } catch (e) {
                console.error("Failed to parse JWT:", e);
                return null;
            }
        },

        getUserData() {
            const token = localStorage.getItem('authToken');
            if (!token) return { isLoggedIn: false };

            const payload = this._parseJwt(token);
            // Check for payload existence and expiration
            if (!payload || payload.exp < Date.now() / 1000) {
                localStorage.clear(); // Clear invalid/expired token
                return { isLoggedIn: false };
            }
            // Handle different possible role keys from backend
            const roles = payload.roles || payload.authorities || [];
            const isAdmin = roles.includes("ROLE_ADMIN");

            return {
                isLoggedIn: true,
                username: payload.sub || 'Valued User',
                role: isAdmin ? 'Admin' : 'Student',
                isAdmin: isAdmin,
            };
        },

        async handleLogout() {
            if (!confirm('Are you sure you want to log out?')) return;

            const token = localStorage.getItem('authToken');
            try {
                if (token) {
                    // Inform the backend about the logout. No need to wait for response.
                    fetch(`${App.config.apiBaseUrl}/logout`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
            } catch (error) {
                console.warn('Logout notification to backend failed. This is non-critical.', error);
            } finally {
                // Always clear local storage and update UI regardless of backend response
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole'); // If you use this, clear it too.
                App.ui.update();
                // Optionally redirect to home or login page
                // window.location.href = 'index.html'; 
            }
        }
    },

    /**
     *  Manages all UI updates based on application state.
     */
    ui: {
        update() {
            const userData = App.auth.getUserData();
            const { elements } = App;

            const loggedIn = userData.isLoggedIn;

            // Toggle visibility using a helper function
            const toggle = (el, show) => el && (el.style.display = show ? (el.tagName === 'BUTTON' || el.classList.contains('btn') ? 'inline-flex' : 'block') : 'none');

            // Set UI for logged-in users
            if (loggedIn) {
                elements.displayUsername && (elements.displayUsername.textContent = userData.username);
                elements.displayRole && (elements.displayRole.textContent = userData.role);
            }
            
            toggle(elements.userWelcome, loggedIn);
            toggle(elements.logoutBtn, loggedIn);
            toggle(elements.adminPanelLink, loggedIn && userData.isAdmin);

            // Set UI for logged-out users
            toggle(elements.heroSubtitle, !loggedIn);
            toggle(elements.registerBtn, !loggedIn);
            toggle(elements.loginBtn, !loggedIn);
        }
    },

    /**
     *  Controls the image slideshow.
     *  NOTE: The HTML for a slideshow was replaced with a static grid.
     *  This module can be removed if no slideshow exists, or adapted for the new grid.
     *  I will keep it here in case you want to reuse it elsewhere.
     */
    slideshow: {
        slideIndex: 0,
        init() {
            // This function will not find '.mySlides' in the new HTML, so it will do nothing.
            // This is safe. If you add a slideshow back, it will work automatically.
            const slides = document.querySelectorAll(".mySlides");
            if (slides.length > 0) {
                this.run(slides);
            }
        },
        run(slides) {
            slides.forEach(slide => slide.style.display = "none");
            this.slideIndex++;
            if (this.slideIndex > slides.length) { this.slideIndex = 1; }
            slides[this.slideIndex - 1].style.display = "block";
            setTimeout(() => this.run(slides), 4000); // Loop
        }
    },

    /**
     *  Handles the "fade-in-on-scroll" animations.
     */
    animations: {
        init() {
            // Select all sections except the hero, which is visible on load.
            const sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
            if (sectionsToAnimate.length > 0) {
                this.setupScrollObserver(sectionsToAnimate);
            }
        },
        setupScrollObserver(elements) {
            const observerOptions = {
                root: null, // observes intersections relative to the viewport
                threshold: 0.1, // trigger when 10% of the element is visible
            };

            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observerInstance.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, observerOptions);

            // Set initial state on elements to be animated and start observing.
            elements.forEach(el => {
                el.classList.add('fade-in-on-scroll');
                observer.observe(el);
            });
        }
    }
};

// Add CSS for the animation directly here or in your CSS file.
// This ensures the animation styles are available.
const animationStyles = `
    .fade-in-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-in-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
// Inject styles into the head
const styleSheet = document.createElement("style");
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);


// Start the application once the document is ready.
document.addEventListener('DOMContentLoaded', () => App.init());