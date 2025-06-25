document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.gallery-categories .btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.close-modal');

    // Function to filter gallery items
    const filterGallery = (category) => {
        photoItems.forEach(item => {
            const itemCategories = item.dataset.category.split(' ');
            const shouldShow = category === 'all' || itemCategories.includes(category);
            
            // Add a class to hide, then a short delay to show, creating a fade effect
            item.classList.add('hide');
            
            setTimeout(() => {
                item.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) {
                    // Force reflow before adding 'show' class for transition
                    void item.offsetWidth; 
                    item.classList.remove('hide');
                }
            }, 300); // This delay should match the transition duration in CSS
        });
    };

    // Add click event to all category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active state on buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter the gallery
            filterGallery(this.dataset.category);
        });
    });

    // Add click event to all photo items to open the modal
    photoItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            modalImage.src = imgSrc;
            imageModal.style.display = 'flex';
        });
    });

    // Function to close the modal
    const closeModal = () => {
        imageModal.style.display = 'none';
        modalImage.src = ''; // Clear src to stop loading
    };

    // Event listeners for closing the modal
    closeModalBtn.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (event) => {
        // Close if the click is on the modal background itself, not the image
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // Optional: Close modal with the 'Escape' key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.style.display === 'flex') {
            closeModal();
        }
    });

    // Initially, show all images
    filterGallery('all');
});