document.addEventListener('DOMContentLoaded', () => {
    const jobDetailContent = document.getElementById('jobDetailContent');

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const fetchJobDetails = async () => {
        // Get the job ID from the URL, e.g., "job-details.html?id=123"
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');

        if (!jobId) {
            jobDetailContent.innerHTML = `<p class="loading-indicator">Error: No job ID provided.</p>`;
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            // Redirect if not logged in
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`https://placement-portal-backend-nwaj.onrender.com/jobs/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Job not found or an error occurred.');
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
                    <a href="${job.apply_link}" target="_blank" class="btn btn-primary">Apply on Company Website <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
        } catch (error) {
            jobDetailContent.innerHTML = `<p class="loading-indicator">${error.message}</p>`;
        }
    };

    fetchJobDetails();
});