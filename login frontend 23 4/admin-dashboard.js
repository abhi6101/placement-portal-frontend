document.addEventListener("DOMContentLoaded", () => {
    // --- CONFIG & STATE ---
    const API_BASE_URL = "https://placement-portal-backend-nwaj.onrender.com/api";
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    // --- DOM ELEMENTS ---
    const jobForm = document.getElementById("jobForm");
    const jobsList = document.getElementById("jobsList");
    const userList = document.getElementById("userList");
    const postJobBtn = document.getElementById("postJobBtn");
    const jobMessage = document.getElementById("jobMessage");
    const logoutBtn = document.getElementById("logout-btn");
    
    const loadingJobsIndicator = document.getElementById("loadingJobsIndicator");
    const jobsTable = document.getElementById("jobsTable");
    const loadingUsersIndicator = document.getElementById("loadingUsersIndicator");
    const usersTable = document.getElementById("usersTable");
    const requiredFormFields = jobForm.querySelectorAll('[required]');

    // --- HELPER FUNCTIONS ---
    
    const setLoadingState = (isLoading, spinnerEl, tableEl) => {
        spinnerEl.style.display = isLoading ? 'flex' : 'none';
        tableEl.style.display = isLoading ? 'none' : 'table';
    };
    
    const showMessage = (element, message, type) => {
        element.textContent = message;
        element.className = `alert alert-${type}`;
        element.style.display = 'block';
        setTimeout(() => element.style.display = 'none', 5000);
    };
    
    const setButtonLoading = (button, isLoading) => {
        button.disabled = isLoading;
        button.classList.toggle('loading', isLoading);
    };

    const validateForm = () => {
        let isValid = true;
        requiredFormFields.forEach(input => {
            const feedbackEl = document.getElementById(`${input.id}-feedback`);
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                feedbackEl.textContent = 'This field is required.';
                feedbackEl.style.display = 'block';
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                feedbackEl.style.display = 'none';
            }
        });
        return isValid;
    };

    // --- API & DATA FETCHING ---

    const fetchAndRenderJobs = async () => {
        setLoadingState(true, loadingJobsIndicator, jobsTable);
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch jobs.');
            const jobs = await response.json();
            jobsList.innerHTML = jobs.map(job => `
                <tr data-job-id="${job.id}">
                    <td data-label="Title">${job.title}</td>
                    <td data-label="Company">${job.companyName}</td>
                    <td data-label="Last Date">${new Date(job.lastDate).toLocaleDateString()}</td>
                    <td data-label="Actions"><div class="action-btns"><button class="btn btn-danger delete-job-btn" aria-label="Delete ${job.title}"><i class="fas fa-trash"></i></button></div></td>
                </tr>`).join('');
        } catch (error) {
            jobsList.innerHTML = `<tr><td colspan="4" style="text-align:center;">${error.message}</td></tr>`;
        } finally {
            setLoadingState(false, loadingJobsIndicator, jobsTable);
        }
    };

    const fetchAndRenderUsers = async () => {
        setLoadingState(true, loadingUsersIndicator, usersTable);
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch users.');
            const users = await response.json();
            userList.innerHTML = users.map(user => `
                <tr>
                    <td data-label="Username">${user.username}</td>
                    <td data-label="Email">${user.email}</td>
                    <td data-label="Role">${user.roles.map(r => r.name.replace('ROLE_', '')).join(', ')}</td>
                </tr>`).join('');
        } catch (error) {
            userList.innerHTML = `<tr><td colspan="3" style="text-align:center;">${error.message}</td></tr>`;
        } finally {
            setLoadingState(false, loadingUsersIndicator, usersTable);
        }
    };

    // --- EVENT HANDLERS ---
    
    const handleJobPost = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setButtonLoading(postJobBtn, true);
        const jobData = {
            title: document.getElementById('jobTitle').value,
            companyName: document.getElementById('companyName').value,
            lastDate: document.getElementById('lastDate').value,
            salary: document.getElementById('salary').value,
            jobDescription: document.getElementById('jobDescription').value,
            applyLink: document.getElementById('applyLink').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(jobData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to post job.');
            
            showMessage(jobMessage, 'Job posted successfully!', 'success');
            jobForm.reset();
            fetchAndRenderJobs();
        } catch (error) {
            showMessage(jobMessage, error.message, 'danger');
        } finally {
            setButtonLoading(postJobBtn, false);
        }
    };

    const handleJobDelete = async (e) => {
        const deleteButton = e.target.closest('.delete-job-btn');
        if (!deleteButton) return;
        
        const jobRow = deleteButton.closest('tr');
        const jobId = jobRow.dataset.jobId;

        if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            setButtonLoading(deleteButton, true);
            try {
                const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to delete job.');
                jobRow.remove(); // Optimistic UI update
            } catch (error) {
                alert(error.message);
                setButtonLoading(deleteButton, false);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    };

    // --- INITIALIZATION ---
    const init = () => {
        if (!token || userRole !== 'ADMIN') {
            alert('Access Denied. You are not authorized to view this page.');
            window.location.href = 'login.html';
            return;
        }
        fetchAndRenderJobs();
        fetchAndRenderUsers();
        jobForm.addEventListener('submit', handleJobPost);
        jobsList.addEventListener('click', handleJobDelete);
        logoutBtn.addEventListener('click', handleLogout);
    };

    init();
});