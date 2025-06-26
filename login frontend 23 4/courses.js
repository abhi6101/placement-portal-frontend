document.addEventListener('DOMContentLoaded', () => {
    const allCourses = [
        { id: 3, title: "Python for Beginners to Advanced", description: "Master Python with projects, data structures, and OOP. Your complete guide to becoming a Python pro.", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80", duration: "6 Weeks", students: 2400, level: "Beginner", category: "programming", link: "course-detail.html" },
        { id: 4, title: "Full Stack Web Development", description: "Build complete web applications from scratch using the MERN stack (MongoDB, Express, React, Node.js).", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80", duration: "10 Weeks", students: 1500, level: "Intermediate", category: "web-dev", link: "full-stack-course.html" },
        { id: 5, title: "Java & Spring Boot Framework", description: "Dive deep into Java and the Spring Framework to build robust, enterprise-grade backend applications.", image: "https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&q=80", duration: "8 Weeks", students: 1100, level: "Intermediate", category: "programming", link: "#" },
        { id: 6, title: "Modern Android Development", description: "Learn to develop native Android apps using Kotlin, Jetpack Compose, and modern architectural patterns.", image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80", duration: "10 Weeks", students: 980, level: "Advanced", category: "mobile-dev", link: "#" },
        { id: 7, title: "Introduction to Data Science", description: "Explore the fundamentals of data analysis, visualization, and machine learning using Python libraries.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", duration: "8 Weeks", students: 1800, level: "Beginner", category: "data-science", link: "#" }
    ];

    const courseListContainer = document.getElementById('courseList');
    const searchInput = document.getElementById('courseSearch');
    const filterButtons = document.querySelectorAll('.category-filters .btn');
    const courseSort = document.getElementById('courseSort');

    const displayCourses = (courses) => {
        courseListContainer.innerHTML = '';
        if (courses.length === 0) {
            courseListContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">No courses found matching your criteria.</p>`;
            return;
        }

        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card surface-glow';
            courseCard.style.animationDelay = `${index * 0.05}s`;
            
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title}">
                <span class="course-badge">${course.level}</span>
                <div class="course-content">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-users"></i> ${course.students.toLocaleString()} Students</span>
                    </div>
                    ${course.link ? `<a href="${course.link}" class="btn btn-primary">View Course <i class="fas fa-arrow-right"></i></a>` : ''}
                </div>
            `;
            courseListContainer.appendChild(courseCard);
        });
    };

    const filterAndSortCourses = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.category-filters .btn.active').dataset.category;
        const sortBy = courseSort.value;

        let filteredCourses = allCourses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        switch (sortBy) {
            case 'title-asc': filteredCourses.sort((a, b) => a.title.localeCompare(b.title)); break;
            case 'title-desc': filteredCourses.sort((a, b) => b.title.localeCompare(a.title)); break;
            case 'students-desc': filteredCourses.sort((a, b) => b.students - a.students); break;
        }
        
        displayCourses(filteredCourses);
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndSortCourses();
        });
    });

    searchInput.addEventListener('input', filterAndSortCourses);
    courseSort.addEventListener('change', filterAndSortCourses);

    displayCourses(allCourses);
});