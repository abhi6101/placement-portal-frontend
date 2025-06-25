// document.addEventListener('DOMContentLoaded', () => {
//     // Get all relevant elements
//     const loginBtn = document.getElementById('loginBtn');
//     const logoutBtn = document.getElementById('logoutBtn');
//     const adminPanelLink = document.getElementById('adminPanelLink');
//     const registerBtn = document.getElementById('registerBtn');
//     const userWelcome = document.getElementById('userWelcome');
//     const displayUsername = document.getElementById('displayUsername');
//     const displayRole = document.getElementById('displayRole');
//     const heroHeading = document.getElementById('heroHeading');
//     const heroSubtitle = document.getElementById('heroSubtitle');
//     const loginForm = document.getElementById('loginForm'); // Assuming this element exists on login.html

//     // Helper function to decode JWT token
//     const parseJwt = (token) => {
//         try {
//             return JSON.parse(atob(token.split('.')[1]));
//         } catch (e) {
//             console.error("Error decoding JWT token:", e);
//             return null;
//         }
//     };

//     // Function to update UI based on auth state
//     const updateUI = () => {
//         const token = localStorage.getItem('authToken');
//         const isLoggedIn = !!token;
//         let isAdmin = false;
//         let username = '';
//         let userRole = 'Student'; // Default role

//         if (isLoggedIn) {
//             const payload = parseJwt(token);
//             if (payload) {
//                 username = payload.sub || payload.username || 'User';
//                 const roles = payload.roles || payload.authorities || [];
//                 isAdmin = roles.includes("ROLE_ADMIN");
//                 userRole = isAdmin ? 'Admin' : 'Student';
//             }

//             // Show welcome section
//             if (userWelcome) {
//                 userWelcome.style.display = 'block';
//                 displayUsername.textContent = username;
//                 displayRole.textContent = userRole;
//             }

//             // Update hero text
//             //  if (heroHeading) heroHeading.style.display = 'none';
//             if (heroSubtitle) heroSubtitle.textContent = 'Ready to launch your career? Explore new opportunities or continue your learning journey!';

//         } else {
//             // Hide welcome section if not logged in
           
//             // Reset hero text to default
//             if (heroHeading) heroHeading.textContent = 'Launch Your Career with Ease!';
//             if (heroSubtitle) heroSubtitle.textContent = 'Your comprehensive platform for job placements, resume building, interview preparation, and career growth.';
//         }

//         // Update button visibility
//         if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
//         if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
//         if (adminPanelLink) adminPanelLink.style.display = isAdmin ? 'inline-block' : 'none';
//         if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
//     };

//     // Initial UI update
//     updateUI();

//     // Handle login form submission (only if on login.html)
//     if (loginForm) {
//         loginForm.addEventListener('submit', async function(e) {
//             e.preventDefault();

//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;
//             const errorElement = document.getElementById('error-message');
//             const successElement = document.getElementById('success-message');

//             if (errorElement) errorElement.style.display = 'none';
//             if (successElement) successElement.style.display = 'none';

//             try {
//                 const response = await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ username, password })
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     localStorage.setItem('authToken', data.token);
                    
//                     // Store user data from login response for immediate UI updates
//                     const payload = parseJwt(data.token);
//                     if (payload) {
//                         localStorage.setItem('userData', JSON.stringify({
//                             username: payload.sub || username,
//                             role: payload.roles?.includes("ROLE_ADMIN") ? "ADMIN" : "USER"
//                         }));
//                     }
                    
//                     if (successElement) {
//                         successElement.textContent = 'Login successful! Redirecting...';
//                         successElement.style.display = 'block';
//                     }

//                     setTimeout(() => {
//                         window.location.href = payload && payload.roles?.includes("ROLE_ADMIN") 
//                             ? 'admin-dashboard.html' 
//                             : 'index.html';
//                     }, 500);
//                 } else {
//                     if (errorElement) {
//                         errorElement.textContent = data.message || 'Invalid username or password';
//                         errorElement.style.display = 'block';
//                     }
//                 }
//             } catch (error) {
//                 console.error('Login error:', error);
//                 if (errorElement) {
//                     errorElement.textContent = 'Network error. Please try again.';
//                     errorElement.style.display = 'block';
//                 }
//             }
//         });
//     }

//     // Handle logout
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', async () => {
//             if (!confirm('Are you sure you want to log out?')) {
//                 return; // Stop if user cancels
//             }

//             const token = localStorage.getItem('authToken');
            
//             try {
//                 // Attempt to notify backend of logout (optional, but good practice for session management)
//                 await fetch('https://placement-portal-backend-nwaj.onrender.com/api/auth/logout', {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//             } catch (e) {
//                 console.warn('Logout notification to backend failed (may be due to expired token or network issue):', e);
//                 // Continue with client-side logout even if backend notification fails
//             } finally {
//                 // Clear all auth-related data
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('userData');
                
//                 // Update UI immediately
//                 updateUI(); 
                
//                 // Redirect to login page or home page
//                 window.location.href = 'logout-confirmation.html'; // Redirect to home after logout
//             }
//         });
//     }
// });



//         // Slideshow functionality for the HOME PAGE (ONLY automatic advancement)
//         let slideIndex = 0;
//         let autoSlideInterval;

//         document.addEventListener('DOMContentLoaded', () => {
//             showSlides();
//             startAutoSlide();
//         });

//         function showSlides() {
//             let i;
//             let slides = document.getElementsByClassName("mySlides");

//             for (i = 0; i < slides.length; i++) {
//                 slides[i].style.display = "none";
//             }

//             slideIndex++;
//             if (slideIndex > slides.length) {
//                 slideIndex = 1
//             }

//             slides[slideIndex - 1].style.display = "block";
//         }

//         function startAutoSlide() {
//             clearInterval(autoSlideInterval);
//             autoSlideInterval = setInterval(() => {
//                 showSlides();
//             }, 4000); // Change image every 4 seconds
//         }
  


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