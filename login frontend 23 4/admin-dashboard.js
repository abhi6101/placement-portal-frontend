document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    // --- AUTHENTICATION CHECK ---
    if (!token || role !== 'ADMIN') {
        alert('Access Denied. You must be logged in as an Admin.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    // --- API & ELEMENT SELECTORS ---
    const API_BASE_URL = "https://placement-portal-backend-nwaj.onrender.com/admin";
    const jobForm = document.getElementById('jobForm');
    const jobMessage = document.getElementById('jobMessage');
    const postJobBtn = document.getElementById('postJobBtn');
    const jobsList = document.getElementById('jobsList');
    const loadingJobsIndicator = document.getElementById('loadingJobsIndicator');
    const jobsTable = document.getElementById('jobsTable');
    const userList = document.getElementById('userList');
    const loadingUsersIndicator = document.getElementById('loadingUsersIndicator');
    const usersTable = document.getElementById('usersTable');

    // --- HELPER FUNCTIONS ---
    function showMessage(element, message, isSuccess) {
        element.textContent = message;
        element.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
        element.style.display = 'block';
        setTimeout(() => { element.style.display = 'none'; }, 4000);
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    }
    
    // --- JOB MANAGEMENT ---
    async function loadJobs() {
        loadingJobsIndicator.style.display = 'flex'; // Use flex for spinner container
        jobsTable.style.display = 'none';
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Could not fetch jobs from the server.');
            const jobs = await response.json();
            renderJobs(jobs);
        } catch (error) {
            console.error('Error loading jobs:', error);
            loadingJobsIndicator.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    function renderJobs(jobs) {
        loadingJobsIndicator.style.display = 'none';
        if (jobs.length === 0) {
            jobsList.innerHTML = '<tr><td colspan="5" style="text-align: center; white-space: normal;">No jobs have been posted yet. Use the form above to add one.</td></tr>';
        } else {
            jobsList.innerHTML = '';
            jobs.forEach(job => {
                const row = document.createElement('tr');
                // ENHANCEMENT: Added data-job-id to the button for event delegation
                row.innerHTML = `
                    <td data-label="Title">${job.title}</td>
                    <td data-label="Company">${job.company_name}</td>
                    <td data-label="Last Date">${formatDate(job.last_date)}</td>
                    <td data-label="Salary">₹${job.salary.toLocaleString('en-IN')}</td>
                    <td data-label="Actions" class="action-btns">
                        <button class="btn btn-danger delete-job-btn" data-job-id="${job.id}" aria-label="Delete job: ${job.title}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                jobsList.appendChild(row);
            });
        }
        jobsTable.style.display = 'table';
    }

    jobForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // ENHANCEMENT: Add loading state to the button
        postJobBtn.disabled = true;
        postJobBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Posting...</span>';

        const jobData = {
            title: document.getElementById('jobTitle').value,
            description: document.getElementById('jobDescription').value,
            company_name: document.getElementById('companyName').value,
            apply_link: document.getElementById('applyLink').value,
            last_date: document.getElementById('lastDate').value,
            salary: parseInt(document.getElementById('salary').value)
        };
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(jobData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to post job. Please check the details and try again.');
            
            showMessage(jobMessage, 'Job posted successfully!', true);
            jobForm.reset();
            loadJobs(); // Refresh the jobs list
        } catch (error) {
            showMessage(jobMessage, error.message, false);
        } finally {
            // ENHANCEMENT: Restore button state
            postJobBtn.disabled = false;
            postJobBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Post Job</span>';
        }
    });

    // ENHANCEMENT: Use Event Delegation for delete buttons
    jobsList.addEventListener('click', async function(e) {
        const deleteButton = e.target.closest('.delete-job-btn');
        if (deleteButton) {
            const jobId = deleteButton.dataset.jobId;
            if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
                try {
                    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (!response.ok) throw new Error('Failed to delete job.');
                    
                    // Visually remove the row immediately for better UX before reloading
                    deleteButton.closest('tr').style.opacity = '0';
                    setTimeout(() => loadJobs(), 300);

                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    });


    // --- USER MANAGEMENT ---
    async function loadUsers() {
        loadingUsersIndicator.style.display = 'flex';
        usersTable.style.display = 'none';
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Could not fetch registered users.');
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error('Error loading users:', error);
            loadingUsersIndicator.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    function renderUsers(users) {
        loadingUsersIndicator.style.display = 'none';
        userList.innerHTML = '';
        if (users.length > 0) {
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="ID">${user.id}</td>
                    <td data-label="Username">${user.username}</td>
                    <td data-label="Email">${user.email}</td>
                    <td data-label="Role">${user.role}</td>
                `;
                userList.appendChild(row);
            });
        } else {
             userList.innerHTML = '<tr><td colspan="4" style="text-align: center;">No users found.</td></tr>';
        }
        usersTable.style.display = 'table';
    }

    // --- INITIAL DATA LOAD ---
    loadJobs();
    loadUsers();
});