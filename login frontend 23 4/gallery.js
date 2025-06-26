document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching & Guard Clauses ---
    const galleryGrid = document.querySelector('.photo-grid');
    const categoryButtons = document.querySelectorAll('.gallery-categories .btn-outline');
    const imageModal = document.getElementById('imageModal');
    
    if (!galleryGrid || !categoryButtons.length || !imageModal) {
        console.warn("Gallery elements not found. Script will not run.");
        return;
    }

    const galleryItems = Array.from(galleryGrid.children);
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // --- 2. ENHANCED Filter Logic (FLIP Animation) ---
    const filterGallery = (category) => {
        // First, get the initial positions of all items
        const initialPositions = galleryItems.map(item => item.getBoundingClientRect());

        // Update classes which will trigger layout change (show/hide)
        categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));

        // Let the browser paint the "hidden" state
        requestAnimationFrame(() => {
            galleryItems.forEach(item => {
                const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
                const shouldShow = (category === 'all' || itemCategories.includes(category));
                item.classList.toggle('hide', !shouldShow);
                item.classList.toggle('show', shouldShow);
            });

            // Get the final positions
            const finalPositions = galleryItems.map(item => item.getBoundingClientRect());

            // Invert positions and animate back to zero
            galleryItems.forEach((item, i) => {
                const dx = initialPositions[i].left - finalPositions[i].left;
                const dy = initialPositions[i].top - finalPositions[i].top;
                
                if (dx !== 0 || dy !== 0) {
                    requestAnimationFrame(() => {
                        item.style.transform = `translate(${dx}px, ${dy}px)`;
                        item.style.transition = 'transform 0s'; // No transition for the initial jump
                        
                        requestAnimationFrame(() => {
                            item.style.transform = '';
                            item.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        });
                    });
                }
            });
        });
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterGallery(this.dataset.category);
        });
    });

    // --- 3. ENHANCED Modal & Hover Logic ---
    let clickedItem = null; // Store the clicked item for modal animation

    const openModal = (imgSrc, altText) => {
        if (!clickedItem) return;
        
        const rect = clickedItem.getBoundingClientRect();
        
        // Set initial state for animation
        modalImage.style.transformOrigin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;

        modalImage.src = imgSrc;
        modalImage.alt = altText;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => { modalImage.src = ""; }, 400);
    };

    galleryItems.forEach(item => {
        // Click to open modal
        item.addEventListener('click', function() {
            clickedItem = this; // Set the reference to the clicked item
            const img = this.querySelector('img');
            openModal(img.src, img.alt);
        });

        // Mouse-tracking glow effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.classList.contains('show')) closeModal();
    });

    // --- 4. Initial Load ---
    filterGallery('all'); // Show all on load
});