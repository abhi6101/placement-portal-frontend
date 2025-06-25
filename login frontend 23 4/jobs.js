document.addEventListener('DOMContentLoaded', function () {
    const API_URL_JOBS = "https://placement-portal-backend-nwaj.onrender.com/jobs";
    const API_URL_APPLY = "https://placement-portal-backend-nwaj.onrender.com/api/apply-job";

    const jobList = document.getElementById('jobList');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    const modal = document.getElementById('applicationFormModal');
    const closeModalBtn = document.querySelector('.close-button');
    const applicationForm = document.getElementById('jobApplicationForm');
    const jobTitleForModal = document.getElementById('jobTitleForApplication');
    const appliedJobIdInput = document.getElementById('appliedJobId');

    let allJobs = [];
    let currentUser = null;

    // --- AUTHENTICATION & USER DETAILS ---
    function init() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to view job listings.");
            window.location.href = "login.html";
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            currentUser = {
                username: payload.sub,
                email: payload.email || `${payload.sub}@example.com`
            };
            if (payload.exp < Date.now() / 1000) {
                throw new Error("Token expired");
            }
            loadAndDisplayJobs();
        } catch (e) {
            alert("Session expired or invalid. Please log in again.");
            localStorage.clear();
            window.location.href = "login.html";
        }
    }

    // --- FETCH & RENDER JOBS ---
    async function loadAndDisplayJobs() {
        try {
            const response = await fetch(API_URL_JOBS);
            if (!response.ok) throw new Error('Failed to fetch jobs.');
            allJobs = await response.json();
            filterAndSortJobs();
        } catch (error) {
            jobList.innerHTML = `<div class="error-message">${error.message}</div>`;
        }
    }

    function displayJobs(jobs) {
        jobList.innerHTML = '';
        if (jobs.length === 0) {
            jobList.innerHTML = `<div class="error-message">No jobs found matching your criteria.</div>`;
            return;
        }

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            const jobType = job.title.toLowerCase().includes('intern') ? 'Internship' : 'Full Time';
            const jobTypeClass = jobType.toLowerCase().replace(' ', '-');

            jobCard.innerHTML = `
                <div class="job-header">
                    <span class="job-type ${jobTypeClass}">${jobType}</span>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-company">
                        <i class="fas fa-building"></i> ${job.company_name}
                    </div>
                </div>
                <div class="job-content">
                    <p class="job-description">${job.description.substring(0, 120)}...</p>
                    <div class="job-meta">
                        <span><i class="fas fa-rupee-sign"></i> ₹${job.salary.toLocaleString('en-IN')} / Annum</span>
                        <span><i class="fas fa-calendar-times"></i> ${new Date(job.last_date).toLocaleDateString('en-IN')}</span>
                    </div>
                </div>
                <div class="job-footer">
                    <button class="btn apply-btn" data-job-id="${job.id}">
                        <i class="fas fa-paper-plane"></i> Apply Now
                    </button>
                </div>
            `;
            jobList.appendChild(jobCard);
        });
    }

    // --- FILTER & SORT LOGIC ---
    function filterAndSortJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredJobs = allJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company_name.toLowerCase().includes(searchTerm)
        );

        const sortValue = sortSelect.value;
        filteredJobs.sort((a, b) => {
            switch (sortValue) {
                case 'salary-high': return b.salary - a.salary;
                case 'deadline': return new Date(a.last_date) - new Date(b.last_date);
                default: return new Date(b.created_at || b.last_date) - new Date(a.created_at || a.last_date);
            }
        });
        
        displayJobs(filteredJobs);
    }
    
    // --- MODAL & APPLICATION LOGIC ---
    function openApplicationModal(job) {
        jobTitleForModal.textContent = `${job.title} at ${job.company_name}`;
        appliedJobIdInput.value = job.id;
        document.getElementById('applicantName').value = currentUser.username || '';
        document.getElementById('applicantEmail').value = currentUser.email || '';
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        applicationForm.reset();
    }
    
    applicationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = `<div class="spinner"></div> Submitting...`;

        try {
            const response = await fetch(API_URL_APPLY, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem("authToken")}` },
                body: formData
            });
            if (!response.ok) throw new Error((await response.json()).message || 'Submission failed.');
            alert('Application submitted successfully!');
            closeModal();
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Application';
        }
    });

    // --- EVENT LISTENERS ---
    searchInput.addEventListener('input', filterAndSortJobs);
    sortSelect.addEventListener('change', filterAndSortJobs);
    jobList.addEventListener('click', (e) => {
        const applyBtn = e.target.closest('.apply-btn');
        if (applyBtn) {
            const job = allJobs.find(j => j.id == applyBtn.dataset.jobId);
            if(job) openApplicationModal(job);
        }
    });
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) closeModal();
    });

    // --- INITIALIZE PAGE ---
    init();
});