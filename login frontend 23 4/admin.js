  document.addEventListener('DOMContentLoaded', function() {
            const token = localStorage.getItem('authToken');
            const role = localStorage.getItem('userRole');
            
            // Check if user is admin
            if (!token || role !== 'ADMIN') {
                alert('Access denied. Admins only.');
                window.location.href = 'login.html';
                return;
            }

            const jobForm = document.getElementById('jobForm');
            const jobMessage = document.getElementById('jobMessage');
            const jobsList = document.getElementById('jobsList');
            const loadingIndicator = document.getElementById('loadingIndicator');
            const jobsTable = document.getElementById('jobsTable');
            const apiUrl = "https://placement-portal-backend-nwaj.onrender.com/admin/jobs";

            // Load all jobs
            async function loadJobs() {
                try {
                    const response = await fetch(apiUrl, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch jobs');
                    }
                    
                    const jobs = await response.json();
                    renderJobs(jobs);
                } catch (error) {
                    console.error('Error loading jobs:', error);
                    loadingIndicator.innerHTML = `<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> ${error.message}</div>`;
                }
            }

            // Render jobs in the table
            function renderJobs(jobs) {
                if (jobs.length === 0) {
                    loadingIndicator.innerHTML = '<p>No jobs posted yet.</p>';
                    return;
                }
                
                jobsList.innerHTML = '';
                jobs.forEach(job => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td data-label="Title">${job.title}</td>
                        <td data-label="Company">${job.company_name}</td>
                        <td data-label="Last Date">${formatDate(job.last_date)}</td>
                        <td data-label="Salary">₹${job.salary.toLocaleString()}</td>
                        <td data-label="Actions" class="action-btns">
                            <button class="btn btn-edit" onclick="editJob('${job.id}')"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger" onclick="deleteJob('${job.id}')"><i class="fas fa-trash"></i> Delete</button>
                        </td>
                    `;
                    jobsList.appendChild(row);
                });
                
                loadingIndicator.style.display = 'none';
                jobsTable.style.display = 'table';
            }

            // Format date for display
            function formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-IN');
            }

            // Post new job
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
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(jobData)
                    });
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Failed to post job');
                    }
                    
                    const newJob = await response.json();
                    jobMessage.innerHTML = '<i class="fas fa-check-circle"></i> Job posted successfully!';
                    jobMessage.className = 'alert alert-success';
                    jobMessage.style.display = 'block';
                    
                    // Reset form
                    jobForm.reset();
                    
                    // Reload jobs
                    loadJobs();
                    
                    // Hide message after 3 seconds
                    setTimeout(() => {
                        jobMessage.style.display = 'none';
                    }, 3000);
                } catch (error) {
                    jobMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
                    jobMessage.className = 'alert alert-danger';
                    jobMessage.style.display = 'block';
                }
            });

            // Edit job (to be implemented)
            window.editJob = function(jobId) {
                alert('Edit job with ID: ' + jobId);
                // Implementation for editing a job
                // You would typically fetch the job details, populate the form,
                // and change the form's submit action to an UPDATE.
            };

            // Delete job
            window.deleteJob = async function(jobId) {
                if (!confirm('Are you sure you want to delete this job?')) return;
                
                try {
                    const response = await fetch(`${apiUrl}/${jobId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to delete job');
                    }
                    
                    loadJobs();
                    // Optionally show a success message
                } catch (error) {
                    alert(error.message);
                }
            };

            // Initial load
            loadJobs();
            loadUsers();
        });


        async function loadUsers() {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const users = await response.json();
                const userList = document.getElementById("userList");
                userList.innerHTML = "";
            
                users.forEach((user) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td data-label="ID">${user.id}</td>
                        <td data-label="Name">${user.username}</td>
                        <td data-label="Email">${user.email}</td>
                        <td data-label="Role">${user.role}</td>
                    `;
                    userList.appendChild(row);
                });
            } catch (error) {
                console.error('Error loading users:', error);
                // Display error to the user if needed
                const userCard = document.querySelector('.card:last-of-type');
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger';
                errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> Failed to load users: ${error.message}`;
                userCard.insertBefore(errorMessage, userCard.querySelector('table'));
            }
        }