/**
 * ============================================
 *  Hack-2-Hired: Main Application Script
 * ============================================
 *  Handles user authentication, UI updates,
 *  dropdowns, and scroll animations.
 */

const App = {
    // --- 1. Configuration & State ---
    config: {
        apiBaseUrl: 'https://placement-portal-backend-nwaj.onrender.com/api/auth',
    },
    elements: {
        loginBtn: null,
        logoutBtn: null,
        adminPanelLink: null,
        registerBtn: null,
        userWelcome: null,
        displayUsername: null,
        displayRole: null,
        heroSubtitle: null,
        resourcesDropdown: null, // MODIFIED: Renamed for clarity
    },

    // --- 2. Initialization ---
    init() {
        this.cacheDOMElements();
        this.initEventListeners();
        this.ui.update();
        this.animations.init();
        console.log("Hack-2-Hired App Initialized.");
    },

    cacheDOMElements() {
        this.elements.loginBtn = document.getElementById('loginBtn');
        this.elements.logoutBtn = document.getElementById('logoutBtn');
        this.elements.adminPanelLink = document.getElementById('adminPanelLink');
        this.elements.registerBtn = document.getElementById('registerBtn');
        this.elements.userWelcome = document.getElementById('userWelcome');
        this.elements.displayUsername = document.getElementById('displayUsername');
        this.elements.displayRole = document.getElementById('displayRole');
        this.elements.heroSubtitle = document.getElementById('heroSubtitle');
        this.elements.resourcesDropdown = document.querySelector('.dropdown'); // MODIFIED: Get the parent dropdown element
    },

    initEventListeners() {
        this.elements.logoutBtn?.addEventListener('click', () => this.auth.handleLogout());

        // NEW: Event listener for the dropdown menu
        this.elements.resourcesDropdown?.addEventListener('click', (event) => {
            // This prevents the link from trying to navigate anywhere
            event.preventDefault();
            // Toggle an 'is-open' class on the dropdown parent element
            this.elements.resourcesDropdown.classList.toggle('is-open');
        });

        // NEW: Listener to close the dropdown if user clicks outside of it
        document.addEventListener('click', (event) => {
            if (this.elements.resourcesDropdown && !this.elements.resourcesDropdown.contains(event.target)) {
                this.elements.resourcesDropdown.classList.remove('is-open');
            }
        });
    },

    // --- 3. Functional Modules (auth, ui, etc.) ---
    // The rest of your JS file (auth, ui, animations) remains the same.
    // I am including it here for completeness.

    auth: {
        _parseJwt(token) {
            try {
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
            if (!payload || payload.exp < Date.now() / 1000) {
                localStorage.clear();
                return { isLoggedIn: false };
            }
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
                    fetch(`${App.config.apiBaseUrl}/logout`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
            } catch (error) {
                console.warn('Logout notification to backend failed.', error);
            } finally {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole');
                App.ui.update();
            }
        }
    },

    ui: {
        update() {
            const userData = App.auth.getUserData();
            const { elements } = App;
            const loggedIn = userData.isLoggedIn;
            const toggle = (el, show) => el && (el.style.display = show ? (el.tagName === 'BUTTON' || el.classList.contains('btn') ? 'inline-flex' : 'block') : 'none');
            if (loggedIn) {
                elements.displayUsername && (elements.displayUsername.textContent = userData.username);
                elements.displayRole && (elements.displayRole.textContent = userData.role);
            }
            toggle(elements.userWelcome, loggedIn);
            toggle(elements.logoutBtn, loggedIn);
            toggle(elements.adminPanelLink, loggedIn && userData.isAdmin);
            toggle(elements.heroSubtitle, !loggedIn);
            toggle(elements.registerBtn, !loggedIn);
            toggle(elements.loginBtn, !loggedIn);
        }
    },

    animations: {
        init() {
            const sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
            if (sectionsToAnimate.length > 0) {
                this.setupScrollObserver(sectionsToAnimate);
            }
        },
        setupScrollObserver(elements) {
            const observerOptions = { root: null, threshold: 0.1, };
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observerInstance.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            elements.forEach(el => {
                el.classList.add('fade-in-on-scroll');
                observer.observe(el);
            });
        }
    }
};

const animationStyles = `
    .fade-in-on-scroll { opacity: 0; transform: translateY(50px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
    .fade-in-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => App.init());