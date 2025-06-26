// papers.js
document.addEventListener('DOMContentLoaded', function () {
    // --- 1. AUTHENTICATION CHECK ---
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You must be logged in to view previous papers.");
        window.location.href = "login.html";
        return;
    }
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) throw new Error("Token expired");
    } catch (e) {
        alert("Session invalid or expired. Please log in again.");
        localStorage.clear();
        window.location.href = "login.html";
        return;
    }

    // --- 2. ELEMENT CACHING & DATA PROCESSING ---
    const filesList = document.getElementById('filesList');
    const textFilterInput = document.getElementById('textFilter');
    const subjectSelect = document.getElementById('subjectSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    
    // --- (Your getSubjectAndSemester function remains the same) ---
    function getSubjectAndSemester(filename) { /* ... Paste your existing, long function here ... */ }
    
    const processedFileData = fileData.map(file => ({ ...file, ...getSubjectAndSemester(file.name) }));

    // --- 3. DROPDOWN POPULATION ---
    function populateDropdown(selectElement, items, prefix = '') {
        selectElement.innerHTML = `<option value="">All ${selectElement.id.replace('Select', 's')}</option>`;
        const uniqueItems = [...new Set(items)].sort();
        uniqueItems.forEach(item => {
            if (item !== "N/A") {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = `${prefix}${item}`;
                selectElement.appendChild(option);
            }
        });
    }
    populateDropdown(subjectSelect, processedFileData.map(f => f.subject));
    populateDropdown(semesterSelect, processedFileData.map(f => f.semester), 'Semester ');

    // --- 4. RENDERING & FILTERING ---
    function renderFiles() {
        const textFilter = textFilterInput.value.toLowerCase();
        const subjectFilter = subjectSelect.value;
        const semesterFilter = semesterSelect.value;

        const filteredFiles = processedFileData.filter(file => {
            const matchesText = file.name.toLowerCase().includes(textFilter) || file.subject.toLowerCase().includes(textFilter);
            const matchesSubject = !subjectFilter || file.subject === subjectFilter;
            const matchesSemester = !semesterFilter || String(file.semester) === semesterFilter;
            return matchesText && matchesSubject && matchesSemester;
        });

        filesList.innerHTML = '';
        if (filteredFiles.length === 0) {
            filesList.innerHTML = '<li class="no-results">No files found matching your criteria.</li>';
            return;
        }

        filteredFiles.forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.style.animationDelay = `${index * 0.03}s`; // Staggered animation
            listItem.innerHTML = `
                <a href="${file.url}" target="_blank" class="file-link">${file.name}</a>
                <div class="tags-and-button">
                    <span class="file-tag">${file.subject}</span>
                    ${file.semester !== "N/A" ? `<span class="file-tag semester-tag">Sem ${file.semester}</span>` : ''}
                    <a href="${file.url}" target="_blank" class="download-btn btn-primary"><i class="fas fa-download"></i></a>
                </div>
            `;
            filesList.appendChild(listItem);
        });
    }
    
    // --- 5. EVENT LISTENERS & INITIAL RENDER ---
    textFilterInput.addEventListener('input', renderFiles);
    subjectSelect.addEventListener('change', renderFiles);
    semesterSelect.addEventListener('change', renderFiles);
    
    renderFiles();
});