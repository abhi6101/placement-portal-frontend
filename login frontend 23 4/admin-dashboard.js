document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    // --- AUTHENTICATION CHECK ---
    if (!token || role !== 'ADMIN') {
        alert('Access Denied. You must be logged in as an Admin.');
        window.location.href = 'login.html';
        return;
    }

    // --- API & ELEMENT SELECTORS ---
    const API_BASE_URL = "https://placement-portal-backend-nwaj.onrender.com/admin";
    const jobForm = document.getElementById('jobForm');
    const jobMessage = document.getElementById('jobMessage');
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
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch jobs.');
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
            jobsList.innerHTML = '<tr><td colspan="5" style="text-align: center;">No jobs posted yet.</td></tr>';
        } else {
            jobsList.innerHTML = '';
            jobs.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Title">${job.title}</td>
                    <td data-label="Company">${job.company_name}</td>
                    <td data-label="Last Date">${formatDate(job.last_date)}</td>
                    <td data-label="Salary">₹${job.salary.toLocaleString('en-IN')}</td>
                    <td data-label="Actions" class="action-btns">
                        <button class="btn btn-danger" onclick="deleteJob('${job.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                jobsList.appendChild(row);
            });
        }
        jobsTable.style.display = 'table';
    }

    jobForm.addEventListener('submit', async function(e) {
        e.preventDefault();
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
            if (!response.ok) throw new Error((await response.json()).message || 'Failed to post job');
            showMessage(jobMessage, 'Job posted successfully!', true);
            jobForm.reset();
            loadJobs();
        } catch (error) {
            showMessage(jobMessage, error.message, false);
        }
    });

    window.deleteJob = async function(jobId) {
        if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete job');
            loadJobs();
        } catch (error) {
            alert(error.message);
        }
    };

    // --- USER MANAGEMENT ---
    async function loadUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch users.');
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
        usersTable.style.display = 'table';
    }

    // --- INITIAL DATA LOAD ---
    loadJobs();
    loadUsers();
});