document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const profilePhoto = document.getElementById('profilePhoto');
    const photoUpload = document.getElementById('photoUpload');
    const addSkillForm = document.getElementById('addSkillForm');
    const skillInput = document.getElementById('skillInput');
    const skillsList = document.getElementById('skillsList');
    const addProjectBtn = document.getElementById('addProjectBtn');

    // --- 1. Profile Photo Upload Handler ---
    if (photoUpload && profilePhoto) {
        photoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhoto.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 2. Add Skill Handler ---
    if (addSkillForm && skillInput && skillsList) {
        addSkillForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form from reloading the page
            const skillName = skillInput.value.trim();

            if (skillName) {
                // Create the new skill tag element
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `${skillName}<i class="fas fa-times remove-skill"></i>`;

                // Append it to the list
                skillsList.appendChild(skillTag);

                // Clear the input field
                skillInput.value = '';
            }
        });
    }

    // --- 3. Remove Skill Handler (using Event Delegation) ---
    if (skillsList) {
        skillsList.addEventListener('click', (event) => {
            // Check if the clicked element is a remove icon
            if (event.target.classList.contains('remove-skill')) {
                // Get the parent '.skill-tag' and remove it
                const skillTagToRemove = event.target.parentElement;
                skillTagToRemove.remove();
            }
        });
    }
    
    // --- 4. Add Project Handler (Placeholder) ---
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            // In a real app, this would open a modal form.
            // For this demo, we'll just show an alert.
            alert('This would open a form to add a new project!');
            
            // Example of how you could dynamically add a project:
            /*
            const projectList = document.getElementById('projectList');
            const newProject = document.createElement('div');
            newProject.className = 'project-card';
            newProject.innerHTML = `
                <h4>New Dynamic Project</h4>
                <p>A description for the new project added via JavaScript.</p>
                <a href="#" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
            `;
            projectList.appendChild(newProject);
            */
        });
    }

});