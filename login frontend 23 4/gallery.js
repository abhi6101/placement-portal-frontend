document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching & Guard Clauses ---
    const galleryItems = document.querySelectorAll('.photo-item');
    const categoryButtons = document.querySelectorAll('.gallery-categories .btn');
    const imageModal = document.getElementById('imageModal');
    
    if (!galleryItems.length || !categoryButtons.length || !imageModal) {
        console.warn("Gallery elements not found. Script will not run.");
        return;
    }

    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.close-modal');
    let closeTimer;

    // --- 2. Filter Logic with ENHANCED Staggered Animation ---
    const filterGallery = (category) => {
        let animationDelay = 0; // Initialize stagger delay

        galleryItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
            const shouldShow = (category === 'all' || itemCategories.includes(category));
            
            // Hide item first to reset animation
            item.classList.remove('show');
            item.style.animationDelay = '0s';

            if (shouldShow) {
                // Apply a staggered delay for the waterfall effect
                item.style.animationDelay = `${animationDelay}s`;
                item.classList.add('show');
                animationDelay += 0.05; // Increment delay for the next item
            }
        });
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterGallery(this.dataset.category);
        });
    });

    // --- 3. Modal Logic with ENHANCED CSS Transitions ---
    const openModal = (imgSrc, altText) => {
        modalImage.src = imgSrc;
        modalImage.alt = altText;
        imageModal.classList.add('show'); // Use class to trigger CSS transition
        document.body.style.overflow = 'hidden';

        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeModal, 15000);
    };

    const closeModal = () => {
        imageModal.classList.remove('show'); // Use class to trigger CSS transition
        document.body.style.overflow = 'auto';
        clearTimeout(closeTimer);
        // Delay clearing the src to allow fade-out animation
        setTimeout(() => {
            modalImage.src = "";
        }, 400); // Must match the transition duration in CSS
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.classList.contains('show')) {
            closeModal();
        }
    });

    // --- 4. Initial Load ---
    filterGallery('all');
});