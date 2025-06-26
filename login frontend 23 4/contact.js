document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission for now

            // You can add your form submission logic here.
            // For example, using fetch() to send the data to a backend endpoint.
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submitted:', data);

            // Example of showing a success message
            alert('Thank you for your message! We will get back to you shortly.');
            
            contactForm.reset(); // Clear the form
        });
    }
});