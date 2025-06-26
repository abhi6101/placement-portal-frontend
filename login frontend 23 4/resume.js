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
                    form.querySelector(`input[name="${key}"][value="${formData[key]}"]`).checked = true;
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

            if (response.ok) {
                const result = await response.json();
                if (result.downloadUrl) {
                    window.open(result.downloadUrl, '_blank');
                    alert('Resume generated successfully!');
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    form.reset();
                    populateForm();
                } else {
                    throw new Error("Server did not provide a download URL.");
                }
            } else {
                const errorResult = await response.json().catch(() => ({}));
                throw new Error(errorResult.message || `Failed to generate resume. Status: ${response.status}`);
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