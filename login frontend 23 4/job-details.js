document.addEventListener('DOMContentLoaded', () => {
    const jobDetailContent = document.getElementById('jobDetailContent');

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const fetchJobDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');

        if (!jobId) {
            jobDetailContent.innerHTML = `<p class="loading-indicator">Error: No job ID provided in the URL.</p>`;
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        try {
            // THE FIX: Added '/api/' to the URL path to match common REST patterns.
            const apiUrl = `https://placement-portal-backend-nwaj.onrender.com/api/jobs/${jobId}`;

            const response = await fetch(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('The requested job could not be found.');
                }
                throw new Error('An error occurred while fetching job details.');
            }

            const job = await response.json();

            // Populate the page with the fetched data
            jobDetailContent.innerHTML = `
                <div class="job-details-header">
                    <h1>${job.title}</h1>
                    <h2><i class="fas fa-building"></i> ${job.company_name}</h2>
                </div>
                <div class="job-meta-grid">
                    <div class="meta-item">
                        <i class="fas fa-rupee-sign"></i>
                        <div>
                            <span>Salary</span>
                            <span>₹${job.salary.toLocaleString('en-IN')} / Annum</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar-times"></i>
                        <div>
                            <span>Apply Before</span>
                            <span>${formatDate(job.last_date)}</span>
                        </div>
                    </div>
                </div>
                <div class="job-description-section">
                    <h3>Job Description</h3>
                    <p>${job.description.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="job-actions-footer">
                    <a href="${job.apply_link}" target="_blank" class="btn">Apply on Company Website <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
        } catch (error) {
            console.error("Fetch job details error:", error);
            jobDetailContent.innerHTML = `<p class="loading-indicator">${error.message}</p>`;
        }
    };

    fetchJobDetails();
});