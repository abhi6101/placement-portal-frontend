document.addEventListener("DOMContentLoaded", () => {
    // --- VIDEO DATA ---
    const allVideos = [
        {
            title: "JavaScript for Beginners - Full Course",
            src: "https://www.youtube.com/embed/jS4aFq5-91M",
            duration: "4h 12m",
            level: "Beginner",
            category: "programming"
        },
        {
            title: "Introduction to C++ Programming",
            src: "https://www.youtube.com/embed/vLnPwxZdW4Y",
            duration: "3h 45m",
            level: "Beginner",
            category: "programming"
        },
        {
            title: "Data Structures & Algorithms Explained",
            src: "https://www.youtube.com/embed/pkq_t3R5z6I",
            duration: "6h 30m",
            level: "Intermediate",
            category: "dsa"
        },
        {
            title: "HTML & CSS Crash Course",
            src: "https://www.youtube.com/embed/gQojMIh7K0c",
            duration: "2h 50m",
            level: "Beginner",
            category: "programming"
        },
        {
            title: "Technical Interview Preparation",
            src: "https://www.youtube.com/embed/1_aU8iWAI3A",
            duration: "1h 45m",
            level: "Intermediate",
            category: "interview"
        },
        {
            title: "Python for Data Science",
            src: "https://www.youtube.com/embed/LHBE6Q9XlzI",
            duration: "5h 20m",
            level: "Intermediate",
            category: "programming"
        },
        {
            title: "Advanced Algorithms (MIT OpenCourseWare)",
            src: "https://www.youtube.com/embed/T3SqP5p42-4",
            duration: "1h 15m",
            level: "Advanced",
            category: "dsa"
        },
        {
            title: "Mock Interview Practice Session",
            src: "https://www.youtube.com/embed/1t1_a1_3w-M",
            duration: "0h 55m",
            level: "All Levels",
            category: "interview"
        }
    ];

    // --- ELEMENT SELECTORS ---
    const videoListContainer = document.getElementById('videoList');
    const searchInput = document.getElementById('videoSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noVideosMessage = document.getElementById('no-videos-message');

    // --- FUNCTION TO DISPLAY VIDEOS ---
    function displayVideos(videos) {
        videoListContainer.innerHTML = ''; // Clear current videos

        if (videos.length === 0) {
            noVideosMessage.style.display = 'block';
        } else {
            noVideosMessage.style.display = 'none';
        }

        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="video-embed">
                    <iframe src="${video.src}" 
                        title="${video.title}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen loading="lazy">
                    </iframe>
                </div>
                <div class="video-content">
                    <h2>${video.title}</h2>
                    <div class="video-meta">
                        <span><i class="far fa-clock"></i> ${video.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${video.level}</span>
                    </div>
                </div>
            `;
            videoListContainer.appendChild(videoCard);
        });
    }

    // --- FUNCTION TO FILTER & SEARCH ---
    function filterAndSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        const filteredVideos = allVideos.filter(video => {
            const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
            const matchesSearch = video.title.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        displayVideos(filteredVideos);
    }

    // --- EVENT LISTENERS ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSearch();
        });
    });

    searchInput.addEventListener('input', filterAndSearch);

    // --- INITIAL DISPLAY ---
    displayVideos(allVideos);
});