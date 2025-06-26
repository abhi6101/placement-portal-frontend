// course-detail.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Check ---
    const checkAuth = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            // No alert needed for a non-interactive page, but good for interactive buttons
            return false;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp < Date.now() / 1000) {
                localStorage.clear();
                return false;
            }
        } catch (e) {
            localStorage.clear();
            return false;
        }
        return true;
    };

    // --- Enroll Button Logic ---
    const enrollButton = document.querySelector('.enroll-btn');

    if (enrollButton) {
        enrollButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (checkAuth()) {
                // User is logged in, process enrollment
                alert('You have successfully enrolled in the Master PHP Programming course!');
                // In a real app, you would make an API call here.
                // e.g., window.location.href = '/my-courses';
            } else {
                // User is not logged in, redirect to login
                alert('Please log in to enroll in this course.');
                window.location.href = 'login.html';
            }
        });
    }
});