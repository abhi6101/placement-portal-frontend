// document.addEventListener('DOMContentLoaded', () => {
//     const navLinksContainer = document.getElementById('nav-links');
//     // The key to our authentication system: the token in localStorage
//     const authToken = localStorage.getItem('authToken');

//     const handleLogout = () => {
//         // Clear the token and redirect to the login page
//         localStorage.removeItem('authToken');
//         window.location.href = '/login.html';
//     };

//     if (authToken) {
//         // --- SCENARIO 1: User is LOGGED IN ---

//         // If a logged-in user tries to access the login or register page,
//         // redirect them to their dashboard.
//         if (window.location.pathname.includes('/login.html') || window.location.pathname.includes('/register.html')) {
//             window.location.href = '/dashboard.html';
//             return; // Stop further script execution
//         }

//         // Populate the navigation bar with links for authenticated users
//         if (navLinksContainer) {
//             navLinksContainer.innerHTML = `
//                 <li><a href="/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
//                 <li><a href="#"><i class="fas fa-user"></i> Profile</a></li>
//                 <li><button id="logout-button"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
//             `;
            
//             // Add the event listener to the newly created logout button
//             const logoutButton = document.getElementById('logout-button');
//             if (logoutButton) {
//                 logoutButton.addEventListener('click', handleLogout);
//             }
//         }
//     } else {
//         // --- SCENARIO 2: User is LOGGED OUT ---

//         // If a logged-out user tries to access a protected page,
//         // redirect them to the login page.
//         const protectedPages = ['/dashboard.html']; // Add more pages here later, like '/profile.html'
//         if (protectedPages.some(page => window.location.pathname.includes(page))) {
//             window.location.href = '/login.html';
//             return; // Stop further script execution
//         }
        
//         // Populate the navigation bar with links for public pages
//         if (navLinksContainer) {
//             navLinksContainer.innerHTML = `
//                 <li><a href="/index.html"><i class="fas fa-home"></i> Home</a></li>
//                 <li><a href="/login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
//                 <li><a href="/register.html"><i class="fas fa-user-plus"></i> Register</a></li>
//             `;
//         }
//     }
// });