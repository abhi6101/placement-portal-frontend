document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching & Guard Clauses ---
    const galleryItems = document.querySelectorAll('.photo-item');
    const categoryButtons = document.querySelectorAll('.gallery-categories .btn');
    const imageModal = document.getElementById('imageModal');
    
    // If essential elements aren't on the page, exit the script to prevent errors.
    if (!galleryItems.length || !categoryButtons.length || !imageModal) {
        console.warn("Gallery elements not found. Script will not run.");
        return;
    }

    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.close-modal');
    let closeTimer; // To handle auto-closing the modal

    // --- 2. Filter Logic ---
    const filterGallery = (category) => {
        galleryItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
            const shouldShow = (category === 'all' || itemCategories.includes(category));
            
            item.classList.toggle('show', shouldShow);
        });
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterGallery(this.dataset.category);
        });
    });

    // --- 3. Modal Logic ---
    const openModal = (imgSrc, altText) => {
        modalImage.src = imgSrc;
        modalImage.alt = altText; // Set alt text for accessibility
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeModal, 15000); // Auto-close after 15 seconds
    };

    const closeModal = () => {
        imageModal.style.display = 'none';
        modalImage.src = ""; // Clear src to stop image loading/display
        document.body.style.overflow = 'auto'; // Restore background scrolling
        clearTimeout(closeTimer);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            openModal(img.src, img.alt);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // Accessibility: Close modal with the 'Escape' key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.style.display === 'flex') {
            closeModal();
        }
    });

    // --- 4. Initial Load ---
    filterGallery('all');
});