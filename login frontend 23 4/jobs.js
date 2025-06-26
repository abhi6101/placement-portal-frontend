document.addEventListener('DOMContentLoaded', function () {
    // --- 1. Constants and Element Caching ---
    const API_URL = "https://placement-portal-backend-nwaj.onrender.com/jobs";
    const APPLY_JOB_API_URL = "https://placement-portal-backend-nwaj.onrender.com/api/apply-job";

    const jobList = document.getElementById('jobList');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.category-filters .btn');
    const sortSelect = document.getElementById('sortSelect');
    const applicationFormModal = document.getElementById('applicationFormModal');
    const closeModalButton = document.querySelector('.close-button');
    const jobApplicationForm = document.getElementById('jobApplicationForm');
    const jobTitleForApplication = document.getElementById('jobTitleForApplication');
    const appliedJobIdInput = document.getElementById('appliedJobId');

    let allJobs = [];
    let currentUserDetails = null;

    // --- 2. Helper Functions ---
    const getUserDetailsFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return { username: payload.sub, email: payload.email || '', exp: payload.exp };
        } catch (e) {
            console.error("Failed to parse token:", e);
            return null;
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    // --- 3. Authentication Handling ---
    const handleAuth = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            // No alert, just redirect. The user will know they need to log in.
            window.location.href = "login.html";
            return { token: null, isValid: false };
        }
        
        currentUserDetails = getUserDetailsFromToken(token);
        if (!currentUserDetails || currentUserDetails.exp < Date.now() / 1000) {
            localStorage.clear();
            alert("Your session has expired. Please log in again.");
            window.location.href = "login.html";
            return { token: null, isValid: false };
        }
        return { token, isValid: true };
    };

    const auth = handleAuth();
    // If auth fails, stop the script immediately.
    if (!auth.isValid) {
        jobList.innerHTML = `<div class="loading-indicator"><span>Redirecting to login...</span></div>`;
        return;
    }

    // --- 4. Job Loading & Rendering ---
    const loadJobs = async () => {
        jobList.innerHTML = '<div class="loading-indicator"><div class="spinner"></div><span>Loading Jobs...</span></div>';
        try {
            // THE FIX: Add the Authorization header to the fetch request.
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (!response.ok) {
                if (response.status === 403) throw new Error('Access Forbidden.');
                throw new Error(`Failed to fetch jobs (Status: ${response.status})`);
            }
            
            allJobs = await response.json();
            filterAndSortJobs();
        } catch (error) {
            console.error('Error fetching jobs:', error);
            jobList.innerHTML = `<div class="loading-indicator"><span>Failed to load jobs. Please try refreshing the page.</span></div>`;
        }
    };

    const displayJobs = (jobs) => {
        jobList.innerHTML = '';
        if (jobs.length === 0) {
            jobList.innerHTML = `<div class="loading-indicator"><span>No jobs found matching your criteria.</span></div>`;
            return;
        }
        jobs.forEach((job, index) => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card surface-glow';
            jobCard.style.animationDelay = `${index * 0.05}s`;

            const jobTypeClass = job.title.toLowerCase().includes('intern') ? 'internship' : '';
            const jobTypeText = job.title.toLowerCase().includes('intern') ? 'Internship' : 'Full-time';

            jobCard.innerHTML = `
                <div class="job-header">
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-company"><i class="fas fa-building"></i> ${job.company_name}</div>
                    <span class="job-type ${jobTypeClass}">${jobTypeText}</span>
                </div>
                <p class="job-description">${job.description.substring(0, 150)}...</p>
                <div class="job-meta">
                    <span><i class="fas fa-rupee-sign"></i> ₹${job.salary.toLocaleString('en-IN')} / Annum</span>
                    <span><i class="fas fa-calendar-times"></i> Deadline: ${formatDate(job.last_date)}</span>
                </div>
                <div class="job-actions">
                    <a href="${job.apply_link || '#'}" target="_blank" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> View Details</a>
                    <button class="btn btn-primary apply-btn" data-job-id="${job.id}" data-job-title="${job.title}">Apply Now</button>
                </div>
            `;
            jobList.appendChild(jobCard);
        });
    };
    
    // --- 5. Filtering, Sorting, and Modal Logic ---
    const filterAndSortJobs = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        let filteredJobs = allJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) || job.company_name.toLowerCase().includes(searchTerm);
            let matchesFilter = true;
            if (activeFilter !== 'all') {
                matchesFilter = job.title.toLowerCase().includes(activeFilter) || job.description.toLowerCase().includes(activeFilter);
            }
            return matchesSearch && matchesFilter;
        });
        const sortValue = sortSelect.value;
        filteredJobs.sort((a, b) => {
            switch (sortValue) {
                case 'salary-high': return b.salary - a.salary;
                case 'deadline': return new Date(a.last_date) - new Date(b.last_date);
                default: return new Date(b.last_date) - new Date(a.last_date);
            }
        });
        displayJobs(filteredJobs);
    };
    
    const openModal = (jobId, jobTitle) => {
        jobTitleForApplication.textContent = jobTitle;
        appliedJobIdInput.value = jobId;
        document.getElementById('applicantName').value = currentUserDetails.username || '';
        document.getElementById('applicantEmail').value = currentUserDetails.email || '';
        applicationFormModal.classList.add('show');
    };
    
    const closeModal = () => {
        applicationFormModal.classList.remove('show');
        jobApplicationForm.reset();
    };

    // --- 6. Event Listeners ---
    searchInput.addEventListener('input', filterAndSortJobs);
    sortSelect.addEventListener('change', filterAndSortJobs);
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterAndSortJobs();
        });
    });
    jobList.addEventListener('click', e => {
        const applyButton = e.target.closest('.apply-btn');
        if (applyButton) {
            openModal(applyButton.dataset.jobId, applyButton.dataset.jobTitle);
        }
    });
    closeModalButton.addEventListener('click', closeModal);
    applicationFormModal.addEventListener('click', e => {
        if (e.target === applicationFormModal) closeModal();
    });
    jobApplicationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;
        try {
            const response = await fetch(APPLY_JOB_API_URL, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${auth.token}` },
                body: new FormData(this)
            });
            if (response.ok) {
                alert('Application submitted successfully!');
                closeModal();
            } else {
                const errorData = await response.json();
                alert(`Submission failed: ${errorData.message}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = `Submit Application`;
        }
    });

    // --- Initial Load ---
    loadJobs();
});