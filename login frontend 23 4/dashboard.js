document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    let userProfileData = {};
    let hasPendingChanges = false;

    // --- ELEMENTS ---
    const elements = {
        saveAllBtn: document.getElementById('saveAllBtn'),
        // Profile
        userName: document.getElementById('userName'),
        userHeadline: document.getElementById('userHeadline'),
        githubLink: document.getElementById('githubLink'),
        profileView: document.getElementById('profile-view-mode'),
        profileEdit: document.getElementById('profile-edit-mode'),
        userNameInput: document.getElementById('userNameInput'),
        userHeadlineInput: document.getElementById('userHeadlineInput'),
        githubLinkInput: document.getElementById('githubLinkInput'),
        // College
        collegeName: document.getElementById('collegeName'),
        studentId: document.getElementById('studentId'),
        branch: document.getElementById('branch'),
        gradYear: document.getElementById('gradYear'),
        collegeView: document.getElementById('college-view-mode'),
        collegeEdit: document.getElementById('college-edit-mode'),
        collegeNameInput: document.getElementById('collegeNameInput'),
        studentIdInput: document.getElementById('studentIdInput'),
        branchInput: document.getElementById('branchInput'),
        gradYearInput: document.getElementById('gradYearInput'),
        // Projects
        projectList: document.getElementById('projectList'),
        addProjectBtn: document.getElementById('addProjectBtn'),
        // Skills
        skillsList: document.getElementById('skillsList'),
        addSkillForm: document.getElementById('addSkillForm'),
        skillInput: document.getElementById('skillInput'),
        // Modal
        projectModal: document.getElementById('projectModal'),
        closeModalBtn: document.querySelector('.close-btn'),
        projectForm: document.getElementById('projectForm'),
        // Notification
        notificationToast: document.getElementById('notificationToast')
    };

    // --- FUNCTIONS ---

    const showNotification = (message) => {
        elements.notificationToast.textContent = message;
        elements.notificationToast.className = 'show';
        setTimeout(() => { elements.notificationToast.className = ''; }, 3000);
    };

    const setPendingChanges = (status) => {
        hasPendingChanges = status;
        elements.saveAllBtn.classList.toggle('visible', status);
    };

    const renderProfile = () => {
        // Render Profile Section
        elements.userName.textContent = userProfileData.name;
        elements.userHeadline.textContent = userProfileData.headline;
        elements.githubLink.href = userProfileData.githubUrl;
        
        // Render College Section
        elements.collegeName.textContent = userProfileData.college.name;
        elements.studentId.textContent = userProfileData.college.id;
        elements.branch.textContent = userProfileData.college.branch;
        elements.gradYear.textContent = userProfileData.college.gradYear;

        // Render Projects
        elements.projectList.innerHTML = '';
        userProfileData.projects.forEach(proj => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h4>${proj.title}</h4>
                <p>${proj.description}</p>
                ${proj.link ? `<a href="${proj.link}" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>` : ''}
            `;
            elements.projectList.appendChild(projectCard);
        });

        // Render Skills
        elements.skillsList.innerHTML = '';
        userProfileData.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `${skill}<i class="fas fa-times remove-skill"></i>`;
            elements.skillsList.appendChild(skillTag);
        });
    };

    const toggleEditMode = (section, isEditing) => {
        const viewMode = elements[`${section}View`];
        const editMode = elements[`${section}Edit`];
        const editBtn = document.querySelector(`[data-section="${section}"]`);

        if (isEditing) {
            // Populate inputs with current data
            Object.keys(userProfileData[section] || userProfileData).forEach(key => {
                const input = elements[`${key}Input`] || elements[`${section}${key.charAt(0).toUpperCase() + key.slice(1)}Input`];
                if (input) {
                    input.value = typeof userProfileData[section] === 'object' ? userProfileData[section][key] : userProfileData[key];
                }
            });
            viewMode.style.display = 'none';
            editMode.style.display = 'block';
            editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        } else {
            viewMode.style.display = 'block';
            editMode.style.display = 'none';
            editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
        }
    };
    
    const saveSection = (section) => {
         Object.keys(userProfileData[section] || userProfileData).forEach(key => {
            const input = elements[`${key}Input`] || elements[`${section}${key.charAt(0).toUpperCase() + key.slice(1)}Input`];
            if(input) {
                 if (typeof userProfileData[section] === 'object') {
                    userProfileData[section][key] = input.value;
                 } else {
                    userProfileData[key] = input.value;
                 }
            }
         });
         setPendingChanges(true);
         renderProfile(); // re-render to show updated static text
         toggleEditMode(section, false);
    };

    const loadData = () => {
        const savedData = localStorage.getItem('userProfileData');
        if (savedData) {
            userProfileData = JSON.parse(savedData);
        } else {
            // Default data for first-time users
            userProfileData = {
                name: 'Rahul Verma',
                headline: 'Aspiring Software Engineer | MERN Stack Developer',
                githubUrl: 'https://github.com/abhi6101',
                college: {
                    name: 'ABC University of Technology',
                    id: 'A-1234567',
                    branch: 'Computer Science & Engineering',
                    gradYear: '2025'
                },
                projects: [
                    { title: 'Hack-2-Hired Platform', description: 'An all-in-one career platform for students featuring a resume builder, job listings, and interview prep tools. Built with the MERN stack.', link: '#' },
                    { title: 'E-commerce Website', description: 'A fully functional e-commerce site with user authentication, product catalog, shopping cart, and payment gateway integration using Stripe.', link: '#' }
                ],
                skills: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5 & CSS3', 'Git & GitHub']
            };
        }
        renderProfile();
    };

    const saveData = () => {
        localStorage.setItem('userProfileData', JSON.stringify(userProfileData));
        setPendingChanges(false);
        showNotification('Profile Saved Successfully!');
    };

    // --- EVENT LISTENERS ---

    // Save All Button
    elements.saveAllBtn.addEventListener('click', saveData);

    // Edit Buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const isCurrentlyEditing = elements[`${section}Edit`].style.display === 'block';
            if (isCurrentlyEditing) {
                toggleEditMode(section, false); // Cancel
            } else {
                saveSection(section); // Save on second click
            }
        });
    });

    // Add Skill
    elements.addSkillForm.addEventListener('submit', e => {
        e.preventDefault();
        const skillName = elements.skillInput.value.trim();
        if (skillName && !userProfileData.skills.includes(skillName)) {
            userProfileData.skills.push(skillName);
            renderProfile();
            setPendingChanges(true);
            elements.skillInput.value = '';
        }
    });

    // Remove Skill
    elements.skillsList.addEventListener('click', e => {
        if (e.target.classList.contains('remove-skill')) {
            const skillName = e.target.parentElement.textContent;
            userProfileData.skills = userProfileData.skills.filter(s => s !== skillName);
            renderProfile();
            setPendingChanges(true);
        }
    });

    // Modal Events
    elements.addProjectBtn.addEventListener('click', () => elements.projectModal.style.display = 'flex');
    elements.closeModalBtn.addEventListener('click', () => elements.projectModal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target == elements.projectModal) {
            elements.projectModal.style.display = 'none';
        }
    });
    elements.projectForm.addEventListener('submit', e => {
        e.preventDefault();
        const newProject = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDesc').value,
            link: document.getElementById('projectLinkUrl').value
        };
        userProfileData.projects.unshift(newProject); // Add to beginning of array
        renderProfile();
        setPendingChanges(true);
        elements.projectModal.style.display = 'none';
        elements.projectForm.reset();
        showNotification('Project Added!');
    });

    // --- INITIALIZATION ---
    loadData();
});