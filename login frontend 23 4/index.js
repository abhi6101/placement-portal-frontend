document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ELEMENT REFERENCES ---
    // Get all the necessary elements from the DOM once the page loads.
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const registerBtn = document.getElementById('registerBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');

    // Hero section elements for dynamic content
    const userWelcomeDiv = document.getElementById('userWelcome');
    const displayUsernameSpan = document.getElementById('displayUsername');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');

    // --- 2. AUTHENTICATION LOGIC ---
    // This is the core logic that adapts the page to the user's login state.
    const authToken = localStorage.getItem('authToken');
    // We also check for a user role, which you should save during login.
    const userRole = localStorage.getItem('userRole'); 

    if (authToken) {
        // --- SCENARIO A: USER IS LOGGED IN ---

        // Update navigation buttons: Hide Login, Show Logout.
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';

        // Update hero section: Hide generic content, show personalized welcome.
        if (registerBtn) registerBtn.style.display = 'none'; // Hide "Register" button for logged-in users.
        
        // Retrieve the username. Fallback to 'User' if not found.
        const username = localStorage.getItem('username') || 'User'; 
        
        if (userWelcomeDiv) {
            displayUsernameSpan.textContent = username;
            userWelcomeDiv.style.display = 'block'; // Show the welcome div.
            if(heroHeading) heroHeading.style.display = 'none'; // Hide the generic h1.
            if(heroSubtitle) heroSubtitle.style.display = 'none'; // Hide the generic subtitle.
        }
        
        // Show Admin Panel link only if the user's role is 'ADMIN'.
        if (userRole === 'ADMIN' && adminPanelLink) {
            adminPanelLink.style.display = 'block';
        }

    } else {
        // --- SCENARIO B: USER IS LOGGED OUT ---

        // Ensure the default logged-out state is shown.
        if (loginBtn) loginBtn.style.display = 'inline-flex'; // Use inline-flex for proper alignment
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userWelcomeDiv) userWelcomeDiv.style.display = 'none';
        if (adminPanelLink) adminPanelLink.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
    }

    // --- 3. EVENT LISTENERS ---

    // Mobile menu toggle functionality.
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Logout button functionality.
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear all user-related data from localStorage to log them out.
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('username');
            
            // Reload the page to reflect the logged-out state.
            window.location.reload();
        });
    }
    
    // --- 4. PAGE WIDGETS AND ANIMATIONS ---

    // Image Slideshow logic.
    let slideIndex = 0;
    const runSlideshow = () => {
        const slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) return; // Stop if there are no slides.

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1; // Loop back to the first slide.
        }
        
        slides[slideIndex - 1].style.display = "block"; // Show the current slide.
        setTimeout(runSlideshow, 4000); // Set a timer to call this function again in 4 seconds.
    };
    runSlideshow(); // Start the slideshow.

    // Scroll-reveal animation logic.
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisibleTriggerPoint = 150; // How far from the bottom of the screen to trigger the animation.

            if (elementTop < windowHeight - elementVisibleTriggerPoint) {
                el.classList.add('active'); // Add 'active' class to trigger CSS transition.
            } else {
                el.classList.remove('active'); // Optional: remove class to re-animate if they scroll up.
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on page load to check elements already in view.
});