document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate a network request (e.g., sending the form data to a server)
            // In a real application, you would use the 'fetch' API here.
            setTimeout(() => {
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show a success message
                formStatus.className = 'alert alert-success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.style.display = 'block';

                // Reset the form after a short delay
                contactForm.reset();

                // Hide the success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 2000); // Simulate a 2-second delay
        });
    }
});