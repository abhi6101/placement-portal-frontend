document.addEventListener('DOMContentLoaded', () => {
    // --- Element Caching ---
    const galleryItems = document.querySelectorAll('.photo-item');
    const categoryButtons = document.querySelectorAll('.gallery-categories .btn');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.close-modal');

    if (!galleryItems.length) return; // Exit if no gallery items on page

    // --- Filter Logic ---
    const filterGallery = (category) => {
        galleryItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
            const shouldShow = (category === 'all' || itemCategories.includes(category));
            
            // Add/remove 'show' class for CSS animation
            if (shouldShow) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state on buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter the gallery
            const category = this.dataset.category;
            filterGallery(category);
        });
    });

    // --- Modal Logic ---
    let closeTimer; // To handle auto-closing

    const openModal = (imgSrc) => {
        modalImage.src = imgSrc;
        imageModal.style.display = 'flex';
        // Auto-close after 15 seconds
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeModal, 15000);
    };

    const closeModal = () => {
        imageModal.style.display = 'none';
        modalImage.src = ""; // Clear src to stop loading
        clearTimeout(closeTimer);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openModal(imgSrc);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    imageModal.addEventListener('click', (event) => {
        // Close if the click is on the modal background, not the image itself
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // --- Initial Load ---
    filterGallery('all'); // Show all images by default
});