 document.addEventListener('DOMContentLoaded', function () {
            const API_URL = "https://placement-portal-backend-nwaj.onrender.com/jobs"; // Your existing jobs API
            const APPLY_JOB_API_URL = "https://placement-portal-backend-nwaj.onrender.com/api/apply-job";

            const jobList = document.getElementById('jobList');
            const searchForm = document.getElementById('searchForm');
            const searchInput = document.getElementById('searchInput');
            const locationInput = document.getElementById('locationInput');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const sortSelect = document.getElementById('sortSelect');

            const applicationFormModal = document.getElementById('applicationFormModal');
            const closeButton = document.querySelector('.close-button');
            const jobApplicationForm = document.getElementById('jobApplicationForm');
            const jobTitleForApplication = document.getElementById('jobTitleForApplication');
            const appliedJobId = document.getElementById('appliedJobId');
            const formApplicantName = document.getElementById('applicantName');
            const formApplicantEmail = document.getElementById('applicantEmail');
            const formApplicantPhone = document.getElementById('applicantPhone');
            const formApplicantRollNo = document.getElementById('applicantRollNo');
            const resumeInput = document.getElementById('resume');

            let allJobs = [];
            let currentUserDetails = null; // To store user details from token

            // Function to extract user details from JWT token
            function getUserDetailsFromToken(token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    return {
                        username: payload.sub,
                        email: payload.email || `${payload.sub}@example.com`,
                        rollNo: payload.rollNo || 'N/A',
                        phone: payload.phone || 'N/A',
                        exp: payload.exp
                    };
                } catch (e) {
                    console.error("Error parsing token or missing claims:", e);
                    return null;
                }
            }

            // Authentication check and user details extraction
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You must be logged in to access this page.");
                window.location.href = "login.html";
                return;
            } else {
                currentUserDetails = getUserDetailsFromToken(token);
                if (!currentUserDetails || currentUserDetails.exp < Date.now() / 1000) {
                    alert("Session expired or invalid token. Please log in again.");
                    localStorage.clear();
                    window.location.href = "login.html";
                    return;
                }
            }


            // Fetch jobs from API
            async function fetchJobs() {
                try {
                    const response = await fetch(API_URL);
                    if (!response.ok) {
                        throw new Error('Failed to fetch jobs');
                    }
                    return await response.json();
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                    showError('Failed to load jobs. Please try again later.');
                    return [];
                }
            }

            // Load jobs from API then render
            async function loadJobs() {
                jobList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading jobs...</div>';
                const jobs = await fetchJobs();
                allJobs = jobs;
                filterAndSortJobs(); // This will call displayJobs
            }

            // Format date
            function formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
            }

            // Show error
            function showError(message) {
                jobList.innerHTML = `<div class="error-message">${message}</div>`;
            }

            // Display jobs
            function displayJobs(jobs) {
                if (jobs.length === 0) {
                    jobList.innerHTML = '<div class="error-message">No jobs found matching your criteria</div>';
                    return;
                }

                jobList.innerHTML = '';

                jobs.forEach(job => {
                    const jobCard = document.createElement('div');
                    jobCard.className = 'job-card';

                    let jobTypeClass = 'full-time';
                    let jobTypeText = 'Full Time';

                    if (job.title.toLowerCase().includes('intern') || job.description.toLowerCase().includes('intern')) {
                        jobTypeClass = 'internship';
                        jobTypeText = 'Internship';
                    } else if (job.title.toLowerCase().includes('remote') || job.description.toLowerCase().includes('remote')) {
                        jobTypeClass = 'remote';
                        jobTypeText = 'Remote';
                    }

                    jobCard.innerHTML = `
                        <div class="job-header">
                            <h3 class="job-title">${job.title}</h3>
                            <div class="job-company">
                                <i class="fas fa-building"></i> ${job.company_name}
                            </div>
                            <span class="job-type ${jobTypeClass}">${jobTypeText}</span>
                        </div>
                        <div class="job-content">
                            <p class="job-description">${job.description}</p>
                            <div class="job-meta">
                                <span class="job-meta-item">
                                    <i class="fas fa-rupee-sign"></i> ₹${job.salary.toLocaleString('en-IN')} per annum
                                </span>
                                <span class="job-meta-item">
                                    <i class="fas fa-calendar-alt"></i> Apply before ${formatDate(job.last_date)}
                                </span>
                            </div>
                            <div class="job-actions">
                                <a href="job-details.html?id=${job.id}" class="btn btn-outline">
                                    <i class="fas fa-eye"></i> View Details
                                </a>
                                <button class="btn apply-btn" data-job-id="${job.id}">
                                    <i class="fas fa-paper-plane"></i> Apply Now
                                </button>
                            </div>
                        </div>
                    `;

                    jobList.appendChild(jobCard);
                });
            }

            // Filter + Sort jobs
            function filterAndSortJobs() {
                const searchTerm = searchInput.value.toLowerCase();
                const locationTerm = locationInput.value.toLowerCase();
                const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

                let filteredJobs = allJobs.filter(job => {
                    const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                        job.company_name.toLowerCase().includes(searchTerm) ||
                        job.description.toLowerCase().includes(searchTerm);

                    const matchesLocation = true; // Placeholder for location filter
                    let matchesFilter = true;

                    if (activeFilter !== 'all') {
                        switch (activeFilter) {
                            case 'it':
                                matchesFilter = job.title.toLowerCase().includes('software') ||
                                    job.description.toLowerCase().includes('developer');
                                break;
                            case 'engineering':
                                matchesFilter = job.title.toLowerCase().includes('engineer');
                                break;
                            case 'finance':
                                matchesFilter = job.title.toLowerCase().includes('finance') ||
                                    job.description.toLowerCase().includes('accountant');
                                break;
                            case 'internship':
                                matchesFilter = job.title.toLowerCase().includes('intern') ||
                                    job.description.toLowerCase().includes('internship');
                                break;
                        }
                    }

                    return matchesSearch && matchesLocation && matchesFilter;
                });

                const sortValue = sortSelect.value;
                filteredJobs.sort((a, b) => {
                    switch (sortValue) {
                        case 'salary-high':
                            return b.salary - a.salary;
                        case 'salary-low':
                            return a.salary - b.salary;
                        case 'deadline':
                            return new Date(a.last_date) - new Date(b.last_date);
                        default:
                            return new Date(b.created_at || b.last_date) - new Date(a.created_at || a.last_date);
                    }
                });

                displayJobs(filteredJobs);
            }

            // Event listeners
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                filterAndSortJobs();
            });

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    filterAndSortJobs();
                });
            });

            sortSelect.addEventListener('change', filterAndSortJobs);

            // --- Event listener for Job Apply buttons to open modal ---
            jobList.addEventListener('click', async function (event) {
                const applyButton = event.target.closest('.apply-btn');

                if (applyButton && !applyButton.disabled) {
                    const jobId = applyButton.dataset.jobId;
                    const job = allJobs.find(j => j.id == jobId);

                    if (!job) {
                        alert('Error: Job details not found. Cannot apply.');
                        return;
                    }

                    if (!currentUserDetails) {
                        alert("Error: User details not available. Please log in again.");
                        localStorage.clear();
                        window.location.href = "login.html";
                        return;
                    }

                    // Populate the modal form with job details and user's pre-filled info
                    jobTitleForApplication.textContent = `${job.title} at ${job.company_name}`;
                    appliedJobId.value = jobId; // Store job ID in a hidden field
                    formApplicantName.value = currentUserDetails.username || '';
                    formApplicantEmail.value = currentUserDetails.email || '';
                    formApplicantPhone.value = currentUserDetails.phone || '';
                    formApplicantRollNo.value = currentUserDetails.rollNo || '';

                    // Show the modal
                    applicationFormModal.style.display = 'flex'; // Use flex to center the modal
                }
            });

            // Close modal when close button is clicked
            closeButton.addEventListener('click', function () {
                applicationFormModal.style.display = 'none';
                jobApplicationForm.reset(); // Clear form fields on close
            });

            // Close modal when clicking outside the modal content
            window.addEventListener('click', function (event) {
                if (event.target == applicationFormModal) {
                    applicationFormModal.style.display = 'none';
                    jobApplicationForm.reset(); // Clear form fields on close
                }
            });

            // --- Handle form submission for job application from the modal ---
            jobApplicationForm.addEventListener('submit', async function (event) {
                event.preventDefault(); // Prevent default form submission

                const formData = new FormData(jobApplicationForm); // Get form data, including file
                const jobId = formData.get('jobId'); // Retrieve jobId from hidden input

                // Add job-specific details from the `job` object
                const job = allJobs.find(j => j.id == jobId);
                if (job) {
                    formData.append('jobTitle', job.title);
                    formData.append('companyName', job.company_name);
                } else {
                    alert('Error: Could not find job details for application. Please try again.');
                    return;
                }

                const submitButton = jobApplicationForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';

                try {
                    const token = localStorage.getItem("authToken");
                    const response = await fetch(APPLY_JOB_API_URL, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData // Send FormData directly
                    });

                    if (response.ok) {
                        alert(`Application for "${job.title}" submitted successfully! HR will be notified.`);
                        applicationFormModal.style.display = 'none'; // Hide the modal
                        jobApplicationForm.reset(); // Clear the form

                        // Optionally update the original "Apply Now" button in the job card
                        const originalApplyButton = document.querySelector(`.apply-btn[data-job-id="${jobId}"]`);
                        if (originalApplyButton) {
                            originalApplyButton.innerText = 'Applied';
                            originalApplyButton.disabled = true;
                            originalApplyButton.style.backgroundColor = '#6c757d';
                            originalApplyButton.style.cursor = 'not-allowed';
                        }

                    } else {
                        const errorData = await response.json();
                        alert(`Failed to submit application: ${errorData.message || response.statusText || 'Unknown error'}`);
                    }
                } catch (error) {
                    console.error('Error submitting job application:', error);
                    alert('An error occurred while submitting your application. Please check your network and try again.');
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Application';
                }
            });

            // Initial load of jobs
            loadJobs();
        });