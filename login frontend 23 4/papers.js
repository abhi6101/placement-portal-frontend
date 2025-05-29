document.addEventListener('DOMContentLoaded', function () {
    const PAPERS_API_URL = "https://placement-portal-backend-nwaj.onrender.com/papers"; // Your backend endpoint for papers

    const paperList = document.getElementById('paperList');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const paginationContainer = document.querySelector('.pagination');
    const prevPageBtn = document.querySelector('.page-btn.prev-page');
    const nextPageBtn = document.querySelector('.page-btn.next-page');
    const pageNumbersSpan = document.getElementById('pageNumbers');

    let allPapers = []; // Stores all fetched papers
    let filteredSortedPapers = []; // Papers after filtering and sorting
    let currentPage = 1;
    const papersPerPage = 9; // Number of papers to display per page

    // --- Authentication Check (Optional, but recommended if papers are protected) ---
    // If you want to protect access to papers, uncomment and ensure your backend also validates the token
    const token = localStorage.getItem("authToken");
    if (!token) {
        // alert("You must be logged in to access this page.");
        // window.location.href = "login.html"; // Redirect if not logged in
        // return; // Stop execution if no token
    }
    // You might also want to add token expiration check here, similar to jobs.js

    // --- Fetch Papers from API ---
    async function fetchPapers() {
        try {
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {}; // Add auth header if token exists
            const response = await fetch(PAPERS_API_URL, { headers });
            if (!response.ok) {
                throw new Error(`Failed to fetch papers: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching papers:', error);
            showError('Failed to load previous papers. Please try again later.');
            return [];
        }
    }

    // --- Load Papers and Initialize Display ---
    async function loadPapers() {
        paperList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading previous papers...</div>';
        const papers = await fetchPapers();
        allPapers = papers;
        filterAndSortPapers(); // Apply initial filters and sort, then display
    }

    // --- Display Papers on the Page ---
    function displayPapers(papersToDisplay) {
        if (papersToDisplay.length === 0) {
            paperList.innerHTML = '<div class="error-message">No previous papers found matching your criteria.</div>';
            paginationContainer.style.display = 'none'; // Hide pagination
            return;
        }

        paperList.innerHTML = ''; // Clear current display
        paginationContainer.style.display = 'flex'; // Show pagination

        const startIndex = (currentPage - 1) * papersPerPage;
        const endIndex = startIndex + papersPerPage;
        const currentBatch = papersToDisplay.slice(startIndex, endIndex);

        currentBatch.forEach(paper => {
            const paperCard = document.createElement('div');
            paperCard.className = 'paper-card';
            paperCard.innerHTML = `
                <div class="paper-header">
                    <h3 class="paper-title">${paper.title}</h3>
                </div>
                <div class="paper-content">
                    <div class="paper-meta">
                        <span class="paper-meta-item">
                            <i class="fas fa-tag"></i> Subject: ${paper.subject}
                        </span>
                        <span class="paper-meta-item">
                            <i class="fas fa-calendar-alt"></i> Year: ${paper.year}
                        </span>
                        ${paper.company ? `<span class="paper-meta-item"><i class="fas fa-building"></i> Company: ${paper.company}</span>` : ''}
                    </div>
                    <div class="paper-actions">
                        <a href="${paper.pdf_url}" target="_blank" class="btn btn-outline">
                            <i class="fas fa-download"></i> Download PDF
                        </a>
                    </div>
                </div>
            `;
            paperList.appendChild(paperCard);
        });

        updatePagination(papersToDisplay.length);
    }

    // --- Filtering and Sorting Logic ---
    function filterAndSortPapers() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const sortValue = sortSelect.value;

        let tempPapers = allPapers.filter(paper => {
            const matchesSearch = paper.title.toLowerCase().includes(searchTerm) ||
                                  paper.subject.toLowerCase().includes(searchTerm) ||
                                  String(paper.year).includes(searchTerm) ||
                                  (paper.company && paper.company.toLowerCase().includes(searchTerm));

            let matchesFilter = true;
            if (activeFilter !== 'all') {
                matchesFilter = paper.subject.toLowerCase() === activeFilter;
            }
            return matchesSearch && matchesFilter;
        });

        tempPapers.sort((a, b) => {
            switch (sortValue) {
                case 'oldest':
                    return a.year - b.year; // Sort by year ascending
                case 'title-asc':
                    return a.title.localeCompare(b.title); // Sort by title A-Z
                case 'title-desc':
                    return b.title.localeCompare(a.title); // Sort by title Z-A
                case 'newest':
                default:
                    return b.year - a.year; // Default to newest by year descending
            }
        });

        filteredSortedPapers = tempPapers;
        currentPage = 1; // Reset to first page after filtering/sorting
        displayPapers(filteredSortedPapers);
    }

    // --- Pagination Logic ---
    function updatePagination(totalPapers) {
        const totalPages = Math.ceil(totalPapers / papersPerPage);
        pageNumbersSpan.innerHTML = ''; // Clear existing page buttons

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.dataset.page = i;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayPapers(filteredSortedPapers);
            });
            pageNumbersSpan.appendChild(pageBtn);
        }
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPapers(filteredSortedPapers);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredSortedPapers.length / papersPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPapers(filteredSortedPapers);
        }
    });

    // --- Error Display ---
    function showError(message) {
        paperList.innerHTML = `<div class="error-message">${message}</div>`;
        paginationContainer.style.display = 'none'; // Hide pagination on error
    }

    // --- Event Listeners ---
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        filterAndSortPapers();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterAndSortPapers();
        });
    });

    sortSelect.addEventListener('change', filterAndSortPapers);

    // Initial load of papers
    loadPapers();
});