document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Auth Check ---
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (!token || role !== 'ADMIN') {
        alert('Access Denied. Admins only.');
        window.location.href = 'login.html';
        return;
    }

    // --- 2. Element Caching & Constants ---
    const apiUrl = "https://placement-portal-backend-nwaj.onrender.com/admin";
    const jobForm = document.getElementById('jobForm');
    const jobMessage = document.getElementById('jobMessage');
    const jobsList = document.getElementById('jobsList');
    const loadingJobsIndicator = document.getElementById('loadingJobsIndicator');
    const jobsTable = document.getElementById('jobsTable');
    const userList = document.getElementById('userList');
    const loadingUsersIndicator = document.getElementById('loadingUsersIndicator');
    const usersTable = document.getElementById('usersTable');

    // --- 3. Job Deletion Function ---
    // This function will be called by our event listener.
    async function deleteJob(jobId) {
        if (!confirm('Are you sure you want to delete this job?')) return;
        
        try {
            const response = await fetch(`${apiUrl}/jobs/${jobId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete job. Please try again.');
            }
            
            // If deletion is successful, reload the job list to show the change.
            loadJobs();

        } catch (error) {
            alert(error.message);
        }
    }

    // --- 4. Job Rendering (THE FIX IS HERE) ---
    const renderJobs = (jobs) => {
        if (!jobsList || !loadingJobsIndicator || !jobsTable) return;
        
        jobsList.innerHTML = '';
        
        if (jobs.length === 0) {
            loadingJobsIndicator.textContent = 'No jobs posted yet.';
            jobsTable.style.display = 'none';
            loadingJobsIndicator.style.display = 'block';
            return;
        }
        
        jobs.forEach(job => {
            const row = document.createElement('tr');
            
            // Create cells for job data
            row.innerHTML = `
                <td>${job.title}</td>
                <td>${job.company_name}</td>
                <td>${new Date(job.last_date).toLocaleDateString('en-IN')}</td>
                <td>₹${job.salary.toLocaleString()}</td>
            `;

            // Create the actions cell and the delete button programmatically
            const actionsCell = document.createElement('td');
            actionsCell.className = 'action-btns';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
            
            // **THE CRITICAL CHANGE:** Add the event listener directly
            deleteButton.addEventListener('click', () => deleteJob(job.id));
            
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);
            
            jobsList.appendChild(row);
        });
        
        loadingJobsIndicator.style.display = 'none';
        jobsTable.style.display = 'table';
    };

    // --- 5. Other Functions (Load Jobs, Form Submit, User Management) ---
    // This code remains the same as your original, correct version.
    
    const loadJobs = async () => {
        try {
            const response = await fetch(`${apiUrl}/jobs`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch jobs');
            const jobs = await response.json();
            renderJobs(jobs);
        } catch (error) {
            console.error('Error loading jobs:', error);
            if (loadingJobsIndicator) loadingJobsIndicator.innerHTML = `<div class="alert alert-danger">Failed to load jobs.</div>`;
        }
    };

    if (jobForm) {
        jobForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if(jobMessage) jobMessage.style.display = 'none';
            
            const jobData = { title: document.getElementById('jobTitle').value, description: document.getElementById('jobDescription').value, company_name: document.getElementById('companyName').value, apply_link: document.getElementById('applyLink').value, last_date: document.getElementById('lastDate').value, salary: parseInt(document.getElementById('salary').value) };
            
            try {
                const response = await fetch(`${apiUrl}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(jobData) });
                if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.message || 'Failed to post job'); }
                jobMessage.innerHTML = 'Job posted successfully!';
                jobMessage.className = 'alert alert-success';
                jobMessage.style.display = 'flex';
                jobForm.reset();
                loadJobs();
                setTimeout(() => { jobMessage.style.display = 'none'; }, 3000);
            } catch (error) {
                jobMessage.innerHTML = error.message;
                jobMessage.className = 'alert alert-danger';
                jobMessage.style.display = 'flex';
            }
        });
    }

    const loadUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/users`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error('Error loading users:', error);
            if (loadingUsersIndicator) loadingUsersIndicator.innerHTML = `<div class="alert alert-danger">Failed to load users.</div>`;
        }
    };

    const renderUsers = (users) => {
        if (!userList || !loadingUsersIndicator || !usersTable) return;
        userList.innerHTML = '';
        if (users.length === 0) {
            loadingUsersIndicator.textContent = 'No registered users found.';
            usersTable.style.display = 'none';
            loadingUsersIndicator.style.display = 'block';
            return;
        }
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
            userList.appendChild(row);
        });
        loadingUsersIndicator.style.display = 'none';
        usersTable.style.display = 'table';
    };

    // --- 6. Initial Load ---
    loadJobs();
    loadUsers();
});