document.addEventListener('DOMContentLoaded', () => {
    const allPosts = [
        { id: 1, title: "Understanding Java for Beginners", date: "June 15, 2025", views: "1.2K", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80", categories: ["tech-skills"], description: "Java remains one of the most in-demand languages. Learn core concepts to kickstart your programming journey.", link: "java-for-beginners-post.html" },
        { id: 2, title: "Web Development Trends in 2025", date: "June 10, 2025", views: "2.4K", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80", categories: ["tech-skills", "industry-trends"], description: "Discover the top frameworks and tools that will dominate the web development landscape in 2025.", link: "web-dev-trends-post.html" },
        { id: 3, title: "Tips for a Successful IT Career", date: "June 5, 2025", views: "3.1K", image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80", categories: ["career-growth"], description: "Building a thriving career in IT requires more than just technical ability. Learn the essential soft skills.", link: "it-career-tips-post.html" },
        { id: 4, title: "Crafting the Perfect Tech Resume", date: "May 28, 2025", views: "4.7K", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", categories: ["resume-advice", "interview-tips"], description: "Your resume is your first impression. Learn how to highlight your skills and projects to stand out.", link: "tech-resume-post.html" },
        { id: 5, title: "Acing Your Next Technical Interview", date: "May 20, 2025", views: "5.3K", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80", categories: ["interview-tips", "tech-skills"], description: "Learn proven strategies to solve coding problems, explain your thought process, and impress interviewers.", link: "technical-interview-post.html" },
        { id: 6, title: "Getting Started with Freelancing in Tech", date: "May 15, 2025", views: "2.8K", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80", categories: ["career-growth", "industry-trends"], description: "Explore the world of tech freelancing, from finding clients and setting rates to managing projects.", link: "freelancing-post.html" }
    ];

    const blogPostsContainer = document.querySelector('.blog-posts');
    const categoryTags = document.querySelectorAll('.category-tags .btn');

    const displayPosts = (posts) => {
        blogPostsContainer.innerHTML = '';
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">No posts found in this category.</p>`;
            return;
        }

        posts.forEach((post, index) => {
            const postCard = document.createElement('article');
            postCard.className = 'post surface-glow';
            postCard.style.animationDelay = `${index * 0.07}s`; // Staggered animation
            
            postCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="post-content">
                    <div class="post-meta">
                        <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="fas fa-eye"></i> ${post.views}</span>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="post-description">${post.description}</p>
                    <a href="${post.link}" class="btn btn-primary">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            blogPostsContainer.appendChild(postCard);
        });
    };

    const filterPosts = (category) => {
        if (category === 'all') {
            displayPosts(allPosts);
        } else {
            const filteredPosts = allPosts.filter(post => post.categories.includes(category));
            displayPosts(filteredPosts);
        }
    };

    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterPosts(tag.dataset.category);
        });
    });

    // Initial display
    displayPosts(allPosts);
});