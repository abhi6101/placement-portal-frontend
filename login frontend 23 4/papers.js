// IMPORTANT: Replace "https://YOUR_BACKEND_APP_URL.onrender.com" with your actual Spring Boot backend's base URL.
// Example: If your backend URL is https://my-placement-backend.onrender.com,
// then PAPERS_API_URL should be "https://my-placement-backend.onrender.com/api/papers"
const BACKEND_BASE_URL = "https://placement-portal-backend-nwaj.onrender.com";
const PAPERS_API_URL = `${BACKEND_BASE_URL}/api/papers`;

const paperListContainer = document.getElementById('paperList');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const paginationContainer = document.querySelector('.pagination');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const pageNumbersSpan = document.getElementById('pageNumbers');

let allPapers = []; // Stores the full list of papers from the API
let filteredPapers = []; // Stores papers after search and filter
let currentPage = 1;
const papersPerPage = 10; // Adjust as needed

// --- Fetch Papers from Backend ---
async function fetchPapers() {
    paperListContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading previous papers...</div>';
    try {
        const token = localStorage.getItem('jwtToken'); // Get JWT token if authentication is required

        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`; // Add token to headers if it exists
        }

        const response = await fetch(PAPERS_API_URL, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // If authentication is required but failed
                paperListContainer.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> You need to be logged in to view papers or your session has expired. Please log in again.</div>';
                // Optionally redirect to login page: window.location.href = 'login.html';
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allPapers = await response.json();
        console.log('Fetched papers:', allPapers);
        filterAndSortPapers(); // Initial filter and sort after fetching
    } catch (error) {
        console.error('Error fetching papers:', error);
        paperListContainer.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to load papers. Please try again later. <br> Error: ${error.message}</div>`;
    }
}

// --- Display Papers ---
function displayPapers(papersToDisplay) {
    paperListContainer.innerHTML = ''; // Clear previous content
    if (papersToDisplay.length === 0) {
        paperListContainer.innerHTML = '<div class="no-results"><i class="fas fa-info-circle"></i> No papers found matching your criteria.</div>';
        return;
    }

    const start = (currentPage - 1) * papersPerPage;
    const end = start + papersPerPage;
    const paginatedPapers = papersToDisplay.slice(start, end);

    paginatedPapers.forEach(paper => {
        const paperCard = document.createElement('div');
        paperCard.classList.add('paper-card');
        paperCard.innerHTML = `
            <h3>${paper.title}</h3>
            <p><strong>Subject:</strong> ${paper.subject.charAt(0).toUpperCase() + paper.subject.slice(1)}</p>
            <p><strong>Year:</strong> ${paper.year}</p>
            <p><strong>Company:</strong> ${paper.company || 'N/A'}</p>
            <p><strong>Uploaded:</strong> ${new Date(paper.uploadedAt).toLocaleDateString()}</p>
            <a href="${paper.pdfUrl}" target="_blank" class="btn download-btn">
                <i class="fas fa-download"></i> Download PDF
            </a>
        `;
        paperListContainer.appendChild(paperCard);
    });
    updatePaginationControls(papersToDisplay.length);
}

// --- Filtering, Searching, and Sorting Logic ---
function filterAndSortPapers() {
    let tempPapers = [...allPapers]; // Start with a fresh copy of all papers

    // 1. Search (if search input is not empty)
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        tempPapers = tempPapers.filter(paper =>
            paper.title.toLowerCase().includes(searchTerm) ||
            paper.subject.toLowerCase().includes(searchTerm) ||
            String(paper.year).includes(searchTerm) ||
            (paper.company && paper.company.toLowerCase().includes(searchTerm))
        );
    }

    // 2. Filter (by subject button)
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter && activeFilter.dataset.filter !== 'all') {
        const filterSubject = activeFilter.dataset.filter;
        tempPapers = tempPapers.filter(paper => paper.subject.toLowerCase() === filterSubject.toLowerCase());
    }

    // 3. Sort
    const sortValue = sortSelect.value;
    tempPapers.sort((a, b) => {
        if (sortValue === 'newest') {
            return new Date(b.uploadedAt) - new Date(a.uploadedAt);
        } else if (sortValue === 'oldest') {
            return new Date(a.uploadedAt) - new Date(b.uploadedAt);
        } else if (sortValue === 'title-asc') {
            return a.title.localeCompare(b.title);
        } else if (sortValue === 'title-desc') {
            return b.title.localeCompare(a.title);
        }
        return 0; // Should not happen
    });

    filteredPapers = tempPapers;
    currentPage = 1; // Reset to first page after filtering/sorting
    displayPapers(filteredPapers);
}

// --- Pagination Controls ---
function updatePaginationControls(totalPapers) {
    const totalPages = Math.ceil(totalPapers / papersPerPage);
    pageNumbersSpan.innerHTML = ''; // Clear existing page numbers

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-btn');
        pageButton.textContent = i;
        pageButton.dataset.page = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', (e) => {
            currentPage = parseInt(e.target.dataset.page);
            displayPapers(filteredPapers);
            updateActivePageButton();
        });
        pageNumbersSpan.appendChild(pageButton);
    }

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Show/hide pagination section
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'flex';
    }
}

function updateActivePageButton() {
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.page-btn[data-page="${currentPage}"]`).classList.add('active');
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPapers(filteredPapers);
        updateActivePageButton();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPapers(filteredPapers);
        updateActivePageButton();
    }
});

// --- Event Listeners ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    filterAndSortPapers();
});

searchInput.addEventListener('input', () => {
    // Optional: live search as user types, or just on submit
    // If you want live search, uncomment the next line:
    // filterAndSortPapers();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' to the clicked button
        button.classList.add('active');
        filterAndSortPapers();
    });
});

sortSelect.addEventListener('change', filterAndSortPapers);

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', fetchPapers);