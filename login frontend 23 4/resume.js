
        // Backend API base URL - make this configurable in a real app
        const API_BASE_URL = 'https://placement-portal-backend-nwaj.onrender.com/api';

        // --- Authentication Check and Token Management ---
        function checkAuth() {
            const token = localStorage.getItem("authToken");

            if (!token) {
                alert("You must be logged in to access this page.");
                window.location.href = "login.html";
                return false;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const now = Date.now() / 1000;

                if (payload.exp < now) {
                    alert("Session expired. Please log in again.");
                    localStorage.clear();
                    window.location.href = "login.html";
                    return false;
                }
            } catch (err) {
                console.error("Invalid token:", err);
                alert("Invalid session. Please log in again.");
                localStorage.clear();
                window.location.href = "login.html";
                return false;
            }
            return true;
        }

        // Run authentication check on page load
        if (!checkAuth()) {
            // If auth check fails, the user is redirected, so no further script execution is needed for form logic
        } else {
            // --- Form Enhancement: Character Counters and Maxlength Enforcement ---
            document.querySelectorAll('textarea[data-maxlength]').forEach(textarea => {
                const maxLength = parseInt(textarea.dataset.maxlength);
                textarea.setAttribute('maxlength', maxLength);

                const counter = document.createElement('div');
                counter.className = 'char-counter';
                textarea.parentNode.insertBefore(counter, textarea.nextSibling);

                const updateCounter = () => {
                    counter.textContent = `${textarea.value.length}/${maxLength} characters`;
                    if (textarea.value.length >= maxLength) {
                        counter.style.color = 'var(--error)';
                    } else {
                        counter.style.color = 'var(--gray)';
                    }
                };

                textarea.addEventListener('input', updateCounter);
                // Initial update in case there's pre-filled content
                updateCounter();
            });

            // --- Auto-save and Form Population Logic ---
            const form = document.getElementById('resumeForm');
            const LOCAL_STORAGE_KEY = 'resumeFormData';

            function loadFormData() {
                try {
                    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
                    return savedData ? JSON.parse(savedData) : {};
                } catch (e) {
                    console.error("Error parsing saved form data:", e);
                    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
                    return {};
                }
            }

            function saveFormData(data) {
                try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
                } catch (e) {
                    console.error("Error saving form data to local storage:", e);
                    alert("Could not save your progress automatically. Please ensure sufficient storage space.");
                }
            }

            let formData = loadFormData();

            // Populate form with saved data
            function populateForm() {
                Object.keys(formData).forEach(key => {
                    const element = form.elements[key];
                    if (element) {
                        if (element.type === 'radio') {
                            const radioButtons = form.querySelectorAll(`input[name="${key}"]`);
                            radioButtons.forEach(radio => {
                                if (radio.value === formData[key]) {
                                    radio.checked = true;
                                }
                            });
                        } else if (element.type === 'date') {
                            if (formData[key] && !isNaN(new Date(formData[key]))) {
                                element.value = formData[key];
                            }
                        } else {
                            element.value = formData[key];
                        }
                    }
                });
                // After populating, trigger input event for textareas to update counters
                document.querySelectorAll('textarea[data-maxlength]').forEach(textarea => {
                    textarea.dispatchEvent(new Event('input'));
                });
            }

            populateForm();

            // Save on input
            form.addEventListener('input', (e) => {
                if (e.target.name) {
                    if (e.target.type === 'radio') {
                        if (e.target.checked) {
                            formData[e.target.name] = e.target.value;
                        }
                    } else {
                        formData[e.target.name] = e.target.value;
                    }
                    saveFormData(formData);
                }
            });

            // --- Form Submission Logic with Fetch API ---
            form.addEventListener('submit', async (event) => {
                event.preventDefault(); // Prevent default form submission

                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

                // Get all form data into a plain object
                const data = {};
                const formElements = event.target.elements;
                for (let i = 0; i < formElements.length; i++) {
                    const element = formElements[i];
                    if (element.name) {
                        if (element.type === 'radio') {
                            if (element.checked) { // Only take the checked radio's value
                                data[element.name] = element.value;
                            }
                        } else if (element.type !== 'submit' && element.type !== 'button') { // Exclude submit/button
                            data[element.name] = element.value.trim(); // Trim whitespace from all inputs
                        }
                    }
                }

                // Client-side Validation (more robust)
                const requiredFields = {
                    name: "Full Name", email: "Email", phone: "Phone",
                    objective: "Objective / Professional Summary", education: "Education",
                    skills: "Skills", declaration: "Declaration", template: "Template Selection"
                };

                for (const field in requiredFields) {
                    if (!data[field] || data[field].length === 0) {
                        alert(`Please fill in the required field: "${requiredFields[field]}".`);
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        return;
                    }
                }

                // Email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    alert("Please enter a valid email address.");
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    return;
                }

                // URL validation for LinkedIn/Portfolio (if filled)
                const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;

                if (data.linkedin && !urlRegex.test(data.linkedin)) {
                    alert("Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile).");
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    return;
                }
                if (data.portfolio && !urlRegex.test(data.portfolio)) {
                    alert("Please enter a valid Portfolio/GitHub URL.");
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    return;
                }

                // --- Send data to Backend ---
                try {
                    const token = localStorage.getItem("authToken"); // Re-fetch token to ensure it's current

                    const response = await fetch(`${API_BASE_URL}/resume/generate-pdf`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        // Expecting a JSON response with the download URL
                        const result = await response.json();
                        const downloadUrl = result.downloadUrl; // This URL *must* come correctly from the backend

                        if (downloadUrl) {
                            // Open the generated PDF in a new tab (browser will usually download if Content-Disposition: attachment)
                            window.open(downloadUrl, '_blank');
                            alert('Resume generated and downloaded successfully!');
                            // Optionally clear form data from localStorage after successful generation
                            localStorage.removeItem(LOCAL_STORAGE_KEY);
                            form.reset(); // Clear form fields
                            populateForm(); // Re-initialize form elements and counters
                        } else {
                            alert('Resume generated successfully, but no download URL was provided by the server. Please contact support.');
                        }

                    } else if (response.status === 401 || response.status === 403) {
                        alert("Session expired or unauthorized. Please log in again.");
                        localStorage.clear();
                        window.location.href = "login.html";
                    } else {
                        // Try to parse error message from backend if available
                        const errorResult = await response.json().catch(() => ({}));
                        const errorMessage = errorResult.message || errorResult.error || `Failed to generate resume: ${response.status} ${response.statusText || ''}`;
                        alert(`Error: ${errorMessage}`);
                        console.error('Server error:', response.status, errorResult);
                    }
                } catch (error) {
                    console.error('Network error or unexpected issue:', error);
                    alert('An unexpected error occurred while generating the resume. Please check your internet connection and try again.');
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText; // Restore button text
                }
            });
        }
    