// index.js - COMPLETE SCRIPT (Without Sound)

const App = {
    // --- 1. Properties & Elements ---
    config: {
        apiBaseUrl: 'https://placement-portal-backend-nwaj.onrender.com/api/auth',
    },
    elements: {
        loginBtn: null, logoutBtn: null, adminPanelLink: null, registerBtn: null,
        userWelcome: null, displayUsername: null, displayRole: null,
        heroHeading: null, heroSubtitle: null,
        slideshowContainer: null, sectionsToAnimate: null,
        membersFeaturesSection: null,
    },

    // --- 2. Initialization ---
    init() {
        this.cacheDOMElements();
        this.initEventListeners();
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
        this.elements.slideshowContainer = document.querySelector('.slideshow-container');
        this.elements.sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
        this.elements.membersFeaturesSection = document.getElementById('members-features');
    },

    initEventListeners() {
        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => this.auth.handleLogout());
        }
    },

    // --- 3. Functional Modules ---
    auth: {
        _parseJwt(token) {
            try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; }
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
            return {
                isLoggedIn: true,
                username: payload.sub || 'User',
                role: roles.includes("ROLE_ADMIN") ? 'Admin' : 'Student',
                isAdmin: roles.includes("ROLE_ADMIN"),
            };
        },
        async handleLogout() {
            if (!confirm('Are you sure you want to log out?')) return;
            const token = localStorage.getItem('authToken');
            try {
                if (token) {
                    await fetch(`${App.config.apiBaseUrl}/logout`, {
                        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
            } catch (e) { console.warn('Logout notification to backend failed:', e); }
            finally {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole'); // Ensure all keys are removed
                localStorage.removeItem('username');
                window.location.reload(); // Reload to reflect changes
            }
        }
    },

    ui: {
        update() {
            const userData = App.auth.getUserData();
            const { elements } = App;
            if (userData.isLoggedIn) {
                if (elements.userWelcome) {
                    elements.userWelcome.style.display = 'block';
                    elements.displayUsername.textContent = userData.username;
                    elements.displayRole.textContent = userData.role;
                }
                if (elements.heroHeading) elements.heroHeading.style.display = 'none';
                if (elements.heroSubtitle) elements.heroSubtitle.style.display = 'none';
                if (elements.registerBtn) elements.registerBtn.style.display = 'none';
                if (elements.loginBtn) elements.loginBtn.style.display = 'none';
                if (elements.logoutBtn) elements.logoutBtn.style.display = 'inline-flex';
                if (elements.adminPanelLink) elements.adminPanelLink.style.display = userData.isAdmin ? 'block' : 'none';
            } else {
                // Logged-out state
                if (elements.userWelcome) elements.userWelcome.style.display = 'none';
                if (elements.heroHeading) elements.heroHeading.style.display = 'block';
                if (elements.heroSubtitle) elements.heroSubtitle.style.display = 'block';
                if (elements.registerBtn) elements.registerBtn.style.display = 'inline-flex';
                if (elements.loginBtn) elements.loginBtn.style.display = 'inline-flex';
                if (elements.logoutBtn) elements.logoutBtn.style.display = 'none';
                if (elements.adminPanelLink) elements.adminPanelLink.style.display = 'none';
            }
        }
    },

    slideshow: {
        slideIndex: 0,
        init() {
            if (App.elements.slideshowContainer) this.run();
        },
        run() {
            const slides = App.elements.slideshowContainer.getElementsByClassName("mySlides");
            if (slides.length === 0) return;
            for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
            this.slideIndex++;
            if (this.slideIndex > slides.length) { this.slideIndex = 1; }
            slides[this.slideIndex - 1].style.display = "block";
            setTimeout(() => this.run(), 4000);
        }
    },

    animations: {
        init() {
            const sections = document.querySelectorAll('section:not(.hero)');
            if (sections.length > 0) this.setupScrollObserver(sections);
        },
        setupScrollObserver(sections) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(section);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());