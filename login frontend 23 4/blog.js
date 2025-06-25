document.addEventListener("DOMContentLoaded", () => {
    // --- BLOG POST DATA ---
    const allPosts = [
        {
            title: "Understanding Java for Beginners",
            image: "images/blog/java-beginners.jpg", // Use local images
            date: "June 15, 2025",
            views: "1.2K",
            excerpt: "Java remains one of the most in-demand languages. Learn core concepts, OOP principles, and best practices to kickstart your programming journey...",
            categories: ["tech-skills"],
            link: "post-detail.html" // Link to a detail page
        },
        {
            title: "Web Development Trends in 2025",
            image: "images/blog/web-trends.jpg",
            date: "June 10, 2025",
            views: "2.4K",
            excerpt: "The web is evolving rapidly. Discover the top frameworks, tools, and methodologies that will dominate in 2025 and how to prepare for them...",
            categories: ["tech-skills", "industry-trends"],
            link: "#"
        },
        {
            title: "5 Tips for a Successful IT Career",
            image: "images/blog/it-career.jpg",
            date: "June 5, 2025",
            views: "3.1K",
            excerpt: "Building a thriving career in IT requires more than just technical skills. Learn the essential soft skills, networking strategies, and planning techniques...",
            categories: ["career-growth"],
            link: "#"
        },
        {
            title: "Crafting the Perfect Tech Resume",
            image: "images/blog/tech-resume.jpg",
            date: "May 28, 2025",
            views: "4.7K",
            excerpt: "Your resume is your first impression. Discover how to highlight technical skills and projects to stand out in competitive tech job markets...",
            categories: ["resume-advice", "interview-tips"],
            link: "#"
        },
        {
            title: "Acing Your Next Technical Interview",
            image: "images/blog/tech-interview.jpg",
            date: "May 20, 2025",
            views: "5.3K",
            excerpt: "Technical interviews can be daunting. Learn proven strategies to solve coding problems, explain your thought process, and impress your interviewers...",
            categories: ["interview-tips", "tech-skills"],
            link: "#"
        },
        {
            title: "Getting Started with Freelancing in Tech",
            image: "images/blog/freelancing.jpg",
            date: "May 15, 2025",
            views: "2.8K",
            excerpt: "Explore the world of tech freelancing - from finding clients and setting rates to managing projects and building your personal brand...",
            categories: ["career-growth", "industry-trends"],
            link: "#"
        }
    ];

    // --- ELEMENT SELECTORS ---
    const blogPostsContainer = document.getElementById("blog-posts-section");
    const categoryTags = document.querySelectorAll(".category-tag");

    // --- FUNCTION TO RENDER POSTS ---
    function renderPosts(posts) {
        blogPostsContainer.innerHTML = ''; // Clear existing posts
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = `<p class="no-posts-found">No posts found in this category.</p>`;
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-image-container">
                    <a href="${post.link}"><img src="${post.image}" alt="${post.title}" loading="lazy"></a>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="far fa-eye"></i> ${post.views} views</span>
                    </div>
                    <h2><a href="${post.link}">${post.title}</a></h2>
                    <p>${post.excerpt}</p>
                    <a href="${post.link}" class="btn">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    // --- FUNCTION TO FILTER POSTS ---
    function filterPosts(category) {
        if (category === 'all') {
            renderPosts(allPosts);
        } else {
            const filteredPosts = allPosts.filter(post => post.categories.includes(category));
            renderPosts(filteredPosts);
        }
    }

    // --- EVENT LISTENERS FOR CATEGORY TAGS ---
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Update active state
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // Filter posts
            const selectedCategory = tag.dataset.category;
            filterPosts(selectedCategory);
        });
    });

    // --- INITIAL RENDER ---
    renderPosts(allPosts);
});