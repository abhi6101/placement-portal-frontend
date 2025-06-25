// index.js - REFACTORED & ENHANCED SCRIPT

const App = {
    // --- 1. Properties & Elements ---
    config: {
        apiBaseUrl: 'https://placement-portal-backend-nwaj.onrender.com/api/auth',
    },
    elements: {
        loginBtn: null, logoutBtn: null, adminPanelLink: null, registerBtn: null,
        userWelcome: null, displayUsername: null, displayRole: null,
        heroHeading: null, heroSubtitle: null, loginForm: null,
        slideshowContainer: null, sectionsToAnimate: null,
    },

    // --- 2. Initialization ---
    init() {
        // Cache DOM elements once
        this.cacheDOMElements();
        // Set up all event listeners
        this.initEventListeners();
        // Initialize functional modules
        this.ui.update();
        this.slideshow.init();
        this.animations.init();
    },

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
        this.elements.loginForm = document.getElementById('loginForm');
        this.elements.slideshowContainer = document.querySelector('.slideshow-container');
        this.elements.sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
    },

    initEventListeners() {
        if (this.elements.loginForm) {
            this.elements.loginForm.addEventListener('submit', (e) => this.auth.handleLogin(e));
        }
        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => this.auth.handleLogout());
        }
    },

    // --- 3. Functional Modules ---

    auth: {
        _parseJwt(token) {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                console.error("Error decoding JWT token:", e);
                return null;
            }
        },

        isLoggedIn() {
            return !!localStorage.getItem('authToken');
        },

        getUserData() {
            const token = localStorage.getItem('authToken');
            if (!token) return { isLoggedIn: false };
            
            const payload = this._parseJwt(token);
            if (!payload) return { isLoggedIn: false };

            const roles = payload.roles || payload.authorities || [];
            const isAdmin = roles.includes("ROLE_ADMIN");

            return {
                isLoggedIn: true,
                username: payload.sub || payload.username || 'User',
                role: isAdmin ? 'Admin' : 'Student',
                isAdmin: isAdmin,
            };
        },

        async handleLogin(event) {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            
            try {
                const response = await fetch(`${App.config.apiBaseUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    const userData = this.getUserData();
                    window.location.href = userData.isAdmin ? 'admin-dashboard.html' : 'index.html';
                } else {
                    alert(data.message || 'Invalid credentials');
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('A network error occurred. Please try again.');
            }
        },

        async handleLogout() {
            if (!confirm('Are you sure you want to log out?')) return;
            
            const token = localStorage.getItem('authToken');
            try {
                await fetch(`${App.config.apiBaseUrl}/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (e) {
                console.warn('Logout notification to backend failed:', e);
            } finally {
                localStorage.removeItem('authToken');
                App.ui.update();
                window.location.href = 'index.html';
            }
        }
    },

    ui: {
        update() {
            const userData = App.auth.getUserData();
            const { elements } = App;

            if (userData.isLoggedIn) {
                if (elements.heroSubtitle) elements.heroSubtitle.style.display = 'none';
                if (elements.userWelcome) {
                    elements.userWelcome.style.display = 'block';
                    elements.displayUsername.textContent = userData.username;
                    elements.displayRole.textContent = userData.role;
                }
            } else {
                if (elements.heroSubtitle) elements.heroSubtitle.style.display = 'block';
                if (elements.userWelcome) elements.userWelcome.style.display = 'none';
            }

            if (elements.loginBtn) elements.loginBtn.style.display = userData.isLoggedIn ? 'none' : 'inline-flex';
            if (elements.logoutBtn) elements.logoutBtn.style.display = userData.isLoggedIn ? 'inline-flex' : 'none';
            if (elements.registerBtn) elements.registerBtn.style.display = userData.isLoggedIn ? 'none' : 'inline-flex';
            if (elements.adminPanelLink) elements.adminPanelLink.style.display = userData.isAdmin ? 'block' : 'none';
        }
    },

    slideshow: {
        slideIndex: 0,
        init() {
            if (App.elements.slideshowContainer) {
                this.run();
            }
        },
        run() {
            const slides = App.elements.slideshowContainer.getElementsByClassName("mySlides");
            if (slides.length === 0) return;

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            this.slideIndex++;
            if (this.slideIndex > slides.length) {
                this.slideIndex = 1;
            }
            slides[this.slideIndex - 1].style.display = "block";
            setTimeout(() => this.run(), 4000);
        }
    },

    animations: {
        init() {
            if (App.elements.sectionsToAnimate.length > 0) {
                this.setupScrollObserver();
            }
        },
        setupScrollObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            App.elements.sectionsToAnimate.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(section);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());