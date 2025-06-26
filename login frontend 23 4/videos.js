document.addEventListener('DOMContentLoaded', () => {
    const allVideos = [
        { id: 0, title: "JavaScript for Beginners - Full Course", src: "https://www.youtube.com/embed/jS4aFq5-91M", duration: "4h 12m", level: "Beginner", category: "programming", links: [{ text: "FreeCodeCamp", url: "#" }, { text: "MDN Docs", url: "#" }] },
        { id: 1, title: "C++ Programming Full Course for Beginners", src: "https://www.youtube.com/embed/vLnPwxZdW4Y", duration: "3h 45m", level: "Beginner", category: "programming", links: [{ text: "GeeksforGeeks", url: "#" }, { text: "C++ Docs", url: "#" }] },
        { id: 2, title: "Data Structures & Algorithms For Beginners", src: "https://www.youtube.com/embed/pkq_t3R5z6I", duration: "6h 30m", level: "Intermediate", category: "dsa", links: [{ text: "Programiz DSA", url: "#" }] },
        { id: 3, title: "HTML & CSS Crash Course For Beginners", src: "https://www.youtube.com/embed/gQargcoTRH4", duration: "2h 50m", level: "Beginner", category: "programming", links: [{ text: "W3Schools", url: "#" }] },
        { id: 4, title: "How to Prepare for Technical Interviews", src: "https://www.youtube.com/embed/1t1_a1AUwB8", duration: "4h 45m", level: "Intermediate", category: "interview", links: [{ text: "LeetCode", url: "#" }] },
        { id: 5, title: "Complete Python for Data Science Course", src: "https://www.youtube.com/embed/Viiq1tQ-tG0", duration: "5h 20m", level: "Intermediate", category: "programming", links: [{ text: "Pandas Docs", url: "#" }] },
        { id: 6, title: "Advanced Algorithms (Graph Theory)", src: "https://www.youtube.com/embed/09_LlHjoEiY", duration: "7h 10m", level: "Advanced", category: "dsa", links: [{ text: "TopCoder", url: "#" }] },
        { id: 7, title: "FAANG Mock Interview Practice Session", src: "https://www.youtube.com/embed/1qw5ITr3k9E", duration: "3h 00m", level: "All Levels", category: "interview", links: [{ text: "Pramp", url: "#" }] }
    ];

    const videoListContainer = document.getElementById('videoList');
    const searchInput = document.getElementById('videoSearch');
    const filterButtons = document.querySelectorAll('.category-filters .btn');

    const displayVideos = (videos) => {
        videoListContainer.innerHTML = ''; // Clear current videos
        if (videos.length === 0) {
            videoListContainer.innerHTML = `<p class="no-results">No videos found. Try a different search or filter.</p>`;
            return;
        }

        videos.forEach((video, index) => {
            const linkHTML = video.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('');

            const videoCard = document.createElement('div');
            videoCard.className = 'video-card surface-glow';
            videoCard.style.animationDelay = `${index * 0.05}s`; // Staggered animation delay
            
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <iframe src="${video.src}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div class="video-content">
                    <h2>${video.title}</h2>
                    <div class="video-meta">
                        <span><i class="fas fa-clock"></i> ${video.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${video.level}</span>
                    </div>
                </div>
                <div class="related-links">
                    ${linkHTML}
                </div>
            `;
            videoListContainer.appendChild(videoCard);
        });
    };

    const filterAndSearchVideos = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.category-filters .btn.active').dataset.category;

        const filteredVideos = allVideos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        displayVideos(filteredVideos);
    };

    // --- Event Listeners ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndSearchVideos();
        });
    });

    searchInput.addEventListener('input', filterAndSearchVideos);

    // Initial display of all videos
    displayVideos(allVideos);
});