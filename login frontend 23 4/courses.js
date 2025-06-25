document.addEventListener("DOMContentLoaded", () => {
    // --- COURSE DATA ---
    // All your courses are defined here in an array of objects.
    const allCourses = [
        {
            id: 1,
            title: "Python for Beginners",
            description: "Master Python fundamentals, from variables to object-oriented programming, and build real-world applications.",
            image: "images/python-course.jpg", // Use a local image
            duration: "6 Weeks",
            students: 2400,
            level: "Beginner",
            category: "programming",
            link: "python-course-detail.html" // Link to a detail page if you have one
        },
        {
            id: 2,
            title: "Full Stack Web Development",
            description: "Become a full-stack developer by mastering the MERN stack (MongoDB, Express, React, Node.js).",
            image: "images/web-dev-course.jpg",
            duration: "12 Weeks",
            students: 1850,
            level: "Intermediate",
            category: "web-dev",
            link: "#"
        },
        {
            id: 3,
            title: "Advanced Java & Spring Boot",
            description: "Deep dive into enterprise-level Java development with the powerful Spring Boot framework.",
            image: "images/java-course.jpg",
            duration: "10 Weeks",
            students: 1100,
            level: "Advanced",
            category: "programming",
            link: "#"
        },
        {
            id: 4,
            title: "Android App Development",
            description: "Learn to build modern, native Android applications from scratch using Kotlin and Jetpack Compose.",
            image: "images/android-course.jpg",
            duration: "10 Weeks",
            students: 980,
            level: "Intermediate",
            category: "mobile-dev",
            link: "#"
        },
        {
            id: 5,
            title: "React: The Complete Guide",
            description: "Build powerful, fast, and user-friendly web apps with React, the most popular frontend library.",
            image: "images/react-course.jpg",
            duration: "8 Weeks",
            students: 2100,
            level: "Beginner",
            category: "web-dev",
            link: "#"
        },
        {
            id: 6,
            title: "C++ for Competitive Programming",
            description: "Sharpen your problem-solving skills and master data structures & algorithms with C++ for coding competitions.",
            image: "images/cpp-course.jpg",
            duration: "8 Weeks",
            students: 1300,
            level: "Advanced",
            category: "programming",
            link: "#"
        }
    ];

    // --- ELEMENT SELECTORS ---
    const courseListContainer = document.getElementById('courseList');
    const searchInput = document.getElementById('courseSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noCoursesMessage = document.getElementById('no-courses-message');

    // --- FUNCTION TO DISPLAY COURSES ---
    function displayCourses(courses) {
        courseListContainer.innerHTML = ''; // Clear existing courses
        
        if (courses.length === 0) {
            noCoursesMessage.style.display = 'block';
        } else {
            noCoursesMessage.style.display = 'none';
        }

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-image-container">
                    <img src="${course.image}" alt="${course.title}" loading="lazy">
                    <span class="course-badge">${course.level}</span>
                </div>
                <div class="course-content">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${course.students.toLocaleString()} Students</span>
                    </div>
                    <a href="${course.link}" class="btn">View Details <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            courseListContainer.appendChild(courseCard);
        });
    }

    // --- FUNCTION TO HANDLE FILTERING & SEARCHING ---
    function filterAndSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        const filteredCourses = allCourses.filter(course => {
            const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                                  course.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        displayCourses(filteredCourses);
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
    displayCourses(allCourses);
});