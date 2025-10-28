document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Authentication Check ---
    const checkAuth = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to build a resume.");
            window.location.href = "login.html";
            return false;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp < Date.now() / 1000) {
                alert("Session expired. Please log in again.");
                localStorage.clear();
                window.location.href = "login.html";
                return false;
            }
        } catch (e) {
            alert("Invalid session. Please log in again.");
            localStorage.clear();
            window.location.href = "login.html";
            return false;
        }
        return true;
    };

    if (!checkAuth()) return; // Stop script if not authenticated

    // --- 2. Element Caching & Constants ---
    const form = document.getElementById('resumeForm');
    if (!form) return;
    
    // This URL is correct for API calls
    const API_BASE_URL = 'https://placement-portal-backend-nwaj.onrender.com/api';
    const LOCAL_STORAGE_KEY = 'resumeFormData';

    // --- 3. Auto-save and Form Population Logic ---
    const loadFormData = () => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : {};
    };

    const saveFormData = (data) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    };

    let formData = loadFormData();

    const populateForm = () => {
        Object.keys(formData).forEach(key => {
            const element = form.elements[key];
            if (element) {
                if (element.type === 'radio') {
                    const radioToSelect = form.querySelector(`input[name="${key}"][value="${formData[key]}"]`);
                    if (radioToSelect) {
                        radioToSelect.checked = true;
                    }
                } else {
                    element.value = formData[key];
                }
            }
        });
    };

    populateForm();

    form.addEventListener('input', (e) => {
        if (e.target.name) {
            formData[e.target.name] = e.target.type === 'radio' && e.target.checked ? e.target.value : e.target.value;
            saveFormData(formData);
        }
    });

    // --- 4. Form Submission Logic ---
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        const data = Object.fromEntries(new FormData(event.target).entries());

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${API_BASE_URL}/resume/generate-pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json(); // Get JSON response regardless of status

            if (response.ok) {
                // --- THIS IS THE CORRECTED PART ---
                if (result.filename) {
                    // Build the full download URL on the frontend
                    const downloadUrl = `${API_BASE_URL}/resume/download/${result.filename}`;
                    
                    // Open the link to start the download
                    window.open(downloadUrl, '_blank');
                    
                    alert('Resume generated successfully! Your download will begin.');
                    
                    // Clear storage and form
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    form.reset();
                    formData = {}; // Also clear the in-memory object
                } else {
                    // Handle cases where the server responds 200 OK but without a filename
                    throw new Error(result.error || "Server did not provide a valid filename.");
                }
            } else {
                // Throw an error with the message from the server's JSON response
                throw new Error(result.error || `Failed to generate resume. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Resume generation error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
        }
    });
});