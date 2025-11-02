document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching & UPDATED Mock Data ---
    const upcomingList = document.getElementById('upcoming-interviews-list');
    const futureList = document.getElementById('future-interviews-list');
    const bookingForm = document.getElementById('bookingForm');
    const companySelect = document.getElementById('company');
    const positionSelect = document.getElementById('position');
    const dateInput = document.getElementById('date');

    // === ACTION: ADDED MORE INTERVIEWS AND POSITIONS HERE ===
    const mockInterviewData = [
        {
            id: 1, company: "TCS", location: "Mumbai", date: "2025-11-15",
            time: "10:00 AM - 4:00 PM", venue: "Campus Placement Cell",
            // ADDED a new position here
            positions: ["Software Engineer", "Data Analyst", "Cloud Specialist"], 
            eligibility: "CGPA ≥ 7.5",
            slots: { total: 20, booked: 18 },
        },
        {
            id: 2, company: "Infosys", location: "Bengaluru", date: "2025-11-28",
            time: "9:00 AM - 3:00 PM", venue: "Virtual (Zoom)",
            positions: ["System Engineer", "Business Analyst"], eligibility: "CGPA ≥ 7.0",
            slots: { total: 25, booked: 10 },
        },
        {
            id: 3, company: "Wipro", location: "Hyderabad", date: "2025-12-10",
            time: "11:00 AM - 5:00 PM", venue: "Department of CSE",
            positions: ["Project Engineer", "Cloud Specialist"], eligibility: "CSE/IT, CGPA ≥ 7.0",
            slots: { total: 15, booked: 5 },
        },
        {
            id: 5, company: "Accenture", location: "Gurugram", date: "2025-11-05",
            time: "9:30 AM - 5:30 PM", venue: "Virtual (Teams)",
            positions: ["Associate Software Engineer"], eligibility: "No backlogs",
            slots: { total: 30, booked: 10 },
        },
        // === NEW INTERVIEW ADDED ===
        {
            id: 6, company: "Capgemini", location: "Pune", date: "2025-12-18",
            time: "10:00 AM - 4:00 PM", venue: "Virtual (Google Meet)",
            positions: ["Software Consultant", "Cybersecurity Analyst"], eligibility: "All branches, CGPA ≥ 6.5",
            slots: { total: 22, booked: 4 },
        },
        // === NEW INTERVIEW ADDED ===
        {
            id: 7, company: "Persistent Systems", location: "Nagpur", date: "2026-01-08",
            time: "9:00 AM - 2:00 PM", venue: "Campus Auditorium",
            positions: ["Software Developer", "QA Engineer"], eligibility: "CSE/IT/ECE, CGPA ≥ 7.0",
            slots: { total: 18, booked: 0 },
        },
    ];

    // --- 2. Helper & Auth Functions ---
    const checkAuth = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to book an interview.");
            window.location.href = "login.html";
            return false;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp < Date.now() / 1000) { throw new Error("Token expired"); }
        } catch (e) {
            alert("Your session is invalid or has expired. Please log in again.");
            localStorage.clear();
            window.location.href = "login.html";
            return false;
        }
        return true;
    };
    if (!checkAuth()) return;

    // --- 3. Rendering Logic ---
    function createInterviewCard(interview) {
        const card = document.createElement('div');
        card.className = 'interview-card surface-glow';
        const availableSlots = interview.slots.total - interview.slots.booked;
        let statusClass, statusText, buttonText = 'Book Slot', isDisabled = false;

        if (availableSlots <= 0) {
            statusClass = 'status-full'; statusText = 'Fully Booked'; buttonText = 'Waitlist'; isDisabled = true;
        } else if (availableSlots <= 5) {
            statusClass = 'status-urgent'; statusText = `Limited (${availableSlots} left)`;
        } else {
            statusClass = 'status-upcoming'; statusText = 'Slots Available';
        }

        card.innerHTML = `
            <div class="interview-header">
                <h2>${interview.company}</h2>
            </div>
            <div class="interview-body">
                <p><strong>Date:</strong> ${new Date(interview.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p><strong>Positions:</strong> ${interview.positions.join(', ')}</p>
                <p><strong>Eligibility:</strong> ${interview.eligibility}</p>
            </div>
            <div class="interview-footer">
                <div class="slot-info">
                    <span>Availability</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <button class="btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}" ${isDisabled ? 'disabled' : ''} data-company="${interview.company}" data-date="${interview.date}" data-positions='${JSON.stringify(interview.positions)}'>
                    ${buttonText}
                </button>
            </div>
        `;
        return card;
    }

    function displayInterviews(interviews) {
        upcomingList.innerHTML = '';
        futureList.innerHTML = '';
        const today = new Date(); today.setHours(0,0,0,0);
        const thirtyDaysFromNow = new Date(); thirtyDaysFromNow.setDate(today.getDate() + 30);

        // Sort interviews by date before filtering
        const sortedInterviews = interviews.sort((a, b) => new Date(a.date) - new Date(b.date));

        const upcoming = sortedInterviews.filter(iv => new Date(iv.date) >= today && new Date(iv.date) <= thirtyDaysFromNow);
        const future = sortedInterviews.filter(iv => new Date(iv.date) > thirtyDaysFromNow);

        (upcoming.length ? upcoming : [null]).forEach(iv => upcomingList.appendChild(iv ? createInterviewCard(iv) : createNoInterviewCard("Upcoming")));
        (future.length ? future : [null]).forEach(iv => futureList.appendChild(iv ? createInterviewCard(iv) : createNoInterviewCard("Future")));
        attachBookButtonListeners();
    }

    function createNoInterviewCard(type) {
        const noCard = document.createElement('div');
        noCard.className = 'no-interviews';
        noCard.innerHTML = `<i class="fas fa-calendar-times"></i><h3>No ${type} Interviews</h3><p>Check back soon for new schedules.</p>`;
        return noCard;
    }

    function attachBookButtonListeners() {
        document.querySelectorAll('.interview-card .btn-primary').forEach(button => {
            button.addEventListener('click', function () {
                companySelect.value = this.dataset.company;
                dateInput.value = this.dataset.date;
                const positions = JSON.parse(this.dataset.positions);
                positionSelect.innerHTML = '<option value="" disabled selected>-- Choose a Position --</option>';
                positions.forEach(pos => positionSelect.innerHTML += `<option value="${pos}">${pos}</option>`);
                document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // === ACTION: ADDED FUNCTIONAL FORM SUBMISSION LOGIC HERE ===
    bookingForm.addEventListener('submit', function (e) {
        // 1. Prevent the form from actually submitting and reloading the page
        e.preventDefault();

        // 2. You can get all form data like this (for sending to a backend later)
        const formData = new FormData(bookingForm);
        const submissionData = Object.fromEntries(formData.entries());
        
        console.log("Interview Booking Data:", submissionData);

        // 3. Show a success message to the user
        alert(`Success!\n\nYour interview slot for ${submissionData.company} has been requested.\nYou will receive a confirmation email at ${submissionData.email} shortly.`);

        // 4. Reset the form for the next booking
        bookingForm.reset();
    });

    // --- 4. Initial Population ---
    const companies = [...new Set(mockInterviewData.map(iv => iv.company))].sort();
    companySelect.innerHTML = '<option value="" disabled selected>-- Choose a Company --</option>'; // Reset before populating
    companySelect.innerHTML += companies.map(c => `<option value="${c}">${c}</option>`).join('');
    dateInput.min = new Date().toISOString().split('T')[0];
    displayInterviews(mockInterviewData);
});