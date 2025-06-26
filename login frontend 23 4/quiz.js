document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Caching ---
    const subjectSelectionDiv = document.getElementById('subject-selection');
    const quizDiv = document.getElementById('quiz');
    const resultsDiv = document.getElementById('quiz-results');
    const subjectMenu = document.getElementById('subject-menu');

    // Quiz elements
    const quizSubjectTitle = document.getElementById('quiz-subject-title');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-question-btn');
    const quitBtn = document.getElementById('quit-quiz-btn');
    const scoreDisplay = document.querySelector('#score-display span');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const timerDisplay = document.querySelector('#timer span');

    // Results elements
    const finalScoreEl = document.getElementById('finalScore');
    const totalQuestionsResultEl = document.getElementById('totalQuestionsResult');
    const correctAnswersEl = document.getElementById('correctAnswers');
    const wrongAnswersEl = document.getElementById('wrongAnswers');
    const timeTakenEl = document.getElementById('timeTaken');
    const resultMessageEl = document.getElementById('result-message');
    const playAgainBtn = document.getElementById('play-again-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');

    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeElapsed = 0;

    // --- 2. Initial Setup ---
    function setupSubjectButtons() {
        const subjects = [
            { id: 'html', name: 'HTML', icon: 'fab fa-html5', desc: 'Web Structure' },
            { id: 'css', name: 'CSS', icon: 'fab fa-css3-alt', desc: 'Web Styling' },
            { id: 'javascript', name: 'JavaScript', icon: 'fab fa-js', desc: 'Web Interactivity' },
            { id: 'react', name: 'React', icon: 'fab fa-react', desc: 'Frontend Library' },
            { id: 'java', name: 'Java', icon: 'fab fa-java', desc: 'Backend & OOP' },
            { id: 'springboot', name: 'Spring Boot', icon: 'fas fa-leaf', desc: 'Java Framework' },
            { id: 'python', name: 'Python', icon: 'fab fa-python', desc: 'Versatile Language' },
            { id: 'sql', name: 'SQL', icon: 'fas fa-database', desc: 'Database Queries' },
            { id: 'dsa', name: 'DSA', icon: 'fas fa-sitemap', desc: 'Problem Solving' },
            { id: 'git', name: 'Git', icon: 'fab fa-git-alt', desc: 'Version Control' }
        ];
        
        subjectMenu.innerHTML = subjects.map(s => `
            <div class="subject-btn" data-subject="${s.id}">
                <i class="${s.icon}"></i>
                <div class="subject-name">${s.name}</div>
                <div class="subject-desc">${s.desc}</div>
            </div>
        `).join('');

        document.querySelectorAll('.subject-btn').forEach(button => {
            button.addEventListener('click', () => startQuiz(button.dataset.subject));
        });
    }

    // --- 3. Quiz Logic ---
    function startQuiz(subject) {
        currentQuiz = quizData[subject] || [];
        if (currentQuiz.length === 0) {
            alert(`Sorry, no questions available for ${subject.toUpperCase()} yet!`);
            return;
        }
        
        currentQuestionIndex = 0;
        score = 0;
        timeElapsed = 0;
        
        const subjectName = subject.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        quizSubjectTitle.textContent = `${subjectName} Quiz`;
        updateScore();
        
        setActiveStep('quiz');
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        resetOptionStyles();
        nextBtn.disabled = true;

        const question = currentQuiz[currentQuestionIndex];
        questionText.textContent = question.question;

        optionsContainer.innerHTML = question.options.map((opt, i) => `
            <label class="option">
                <input type="radio" name="option" value="${opt}">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${opt}</span>
            </label>
        `).join('');

        document.querySelectorAll('.option input').forEach(input => {
            input.addEventListener('change', () => {
                nextBtn.disabled = false;
                // Optional: visual selection feedback
                document.querySelectorAll('.option').forEach(l => l.classList.remove('selected'));
                input.parentElement.classList.add('selected');
            });
        });

        updateProgress();
    }
    
    function startTimer() {
        clearInterval(timerInterval);
        timeElapsed = 0;
        timerInterval = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (timeElapsed % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    function handleNextQuestion() {
        const selectedOptionInput = document.querySelector('.option input:checked');
        if (!selectedOptionInput) return;
        
        const selectedAnswer = selectedOptionInput.value;
        const correctAnswer = currentQuiz[currentQuestionIndex].answer;
        
        const allOptions = optionsContainer.querySelectorAll('.option');
        allOptions.forEach(optLabel => {
            const input = optLabel.querySelector('input');
            if (input.value === correctAnswer) {
                optLabel.classList.add('correct');
            } else if (input.checked) {
                optLabel.classList.add('wrong');
            }
            input.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {
            score++;
            updateScore();
        }

        nextBtn.disabled = true; // Disable until next question loads

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuiz.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        }, 1200); // Wait a moment to show feedback
    }

    function endQuiz() {
        clearInterval(timerInterval);
        setActiveStep('quiz-results');
        
        const totalQuestions = currentQuiz.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        finalScoreEl.textContent = score;
        totalQuestionsResultEl.textContent = totalQuestions;
        correctAnswersEl.textContent = score;
        wrongAnswersEl.textContent = totalQuestions - score;
        timeTakenEl.textContent = timerDisplay.textContent;
        
        if (percentage >= 80) resultMessageEl.textContent = "Excellent Work! You're a true pro.";
        else if (percentage >= 50) resultMessageEl.textContent = "Good Job! Keep practicing to master it.";
        else resultMessageEl.textContent = "Keep Trying! Every attempt is a step forward.";
    }

    // --- 4. UI Update Functions ---
    const setActiveStep = (stepId) => {
        document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
        document.getElementById(stepId).classList.add('active');
    };
    
    const updateScore = () => scoreDisplay.textContent = score;

    const updateProgress = () => {
        const total = currentQuiz.length;
        const current = currentQuestionIndex + 1;
        const percent = (current / total) * 100;
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `Question ${current}/${total}`;
    };

    const resetOptionStyles = () => {
        optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
    };
    
    const resetQuiz = () => {
        setActiveStep('subject-selection');
    };

    // --- 5. Event Listeners ---
    nextBtn.addEventListener('click', handleNextQuestion);
    quitBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to quit? Your progress will be lost.')) {
            clearInterval(timerInterval);
            resetQuiz();
        }
    });
    playAgainBtn.addEventListener('click', resetQuiz);
    backToHomeBtn.addEventListener('click', () => window.location.href = 'index.html');
    
    // --- Initial Load ---
    setupSubjectButtons();
});