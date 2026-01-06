/**
 * Dynamic Quiz Application - Main JavaScript
 * Handles quiz logic, timer, navigation, and result analysis
 */

class QuizApp {
    constructor() {
        // DOM Elements
        this.landingPage = document.getElementById('landing-page');
        this.quizPage = document.getElementById('quiz-page');
        this.resultsPage = document.getElementById('results-page');
        
        // Landing Page Elements
        this.categorySelect = document.getElementById('category-select');
        this.difficultySelect = document.getElementById('difficulty-select');
        this.questionsCountSelect = document.getElementById('questions-count');
        this.startQuizBtn = document.getElementById('start-quiz-btn');
        
        // Quiz Page Elements
        this.categoryDisplay = document.getElementById('category-display');
        this.difficultyDisplay = document.getElementById('difficulty-display');
        this.timerValue = document.getElementById('timer-value');
        this.timerProgress = document.getElementById('timer-progress');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.questionDots = document.getElementById('question-dots');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.submitQuizBtn = document.getElementById('submit-quiz-btn');
        
        // Results Page Elements
        this.scorePercentage = document.getElementById('score-percentage');
        this.correctCount = document.getElementById('correct-count');
        this.totalCount = document.getElementById('total-count');
        this.correctAnswers = document.getElementById('correct-answers');
        this.incorrectAnswers = document.getElementById('incorrect-answers');
        this.totalTime = document.getElementById('total-time');
        this.avgTime = document.getElementById('avg-time');
        this.breakdownContainer = document.getElementById('breakdown-container');
        this.retryQuizBtn = document.getElementById('retry-quiz-btn');
        this.newQuizBtn = document.getElementById('new-quiz-btn');
        
        // Quiz State
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.timePerQuestion = [];
        this.questionStartTime = null;
        this.timerInterval = null;
        this.timerSeconds = 30;
        this.maxTimerSeconds = 30;
        this.quizStartTime = null;
        this.quizEndTime = null;
        
        // Chart instances
        this.performanceChart = null;
        this.timeChart = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Landing Page
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        
        // Quiz Page
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.submitQuizBtn.addEventListener('click', () => this.submitQuiz());
        
        // Results Page
        this.retryQuizBtn.addEventListener('click', () => this.retryQuiz());
        this.newQuizBtn.addEventListener('click', () => this.newQuiz());
    }
    
    // ========================================
    // Quiz Setup
    // ========================================
    
    startQuiz() {
        const category = this.categorySelect.value;
        const difficulty = this.difficultySelect.value;
        const questionsCount = parseInt(this.questionsCountSelect.value);
        
        // Get questions from database
        this.loadQuestions(category, difficulty, questionsCount);
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentQuestions.length).fill(null);
        this.timePerQuestion = new Array(this.currentQuestions.length).fill(0);
        this.quizStartTime = new Date();
        
        // Set timer duration based on difficulty
        this.maxTimerSeconds = timerDurations[difficulty];
        this.timerSeconds = this.maxTimerSeconds;
        
        // Update UI
        this.categoryDisplay.textContent = this.getCategoryDisplayName(category);
        this.difficultyDisplay.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        this.totalQuestionsSpan.textContent = this.currentQuestions.length;
        
        // Create question navigation dots
        this.createQuestionDots();
        
        // Show quiz page
        this.showPage('quiz');
        
        // Load first question
        this.loadQuestion();
        
        // Start timer
        this.startTimer();
    }
    
    loadQuestions(category, difficulty, count) {
        const allQuestions = questionsDatabase[category][difficulty];
        
        // Shuffle and select questions
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        this.currentQuestions = shuffled.slice(0, Math.min(count, allQuestions.length));
    }
    
    getCategoryDisplayName(category) {
        const names = {
            general: 'General Knowledge',
            science: 'Science',
            math: 'Mathematics',
            history: 'History',
            geography: 'Geography'
        };
        return names[category] || category;
    }
    
    createQuestionDots() {
        this.questionDots.innerHTML = '';
        
        for (let i = 0; i < this.currentQuestions.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'question-dot';
            dot.setAttribute('data-question', i);
            dot.setAttribute('aria-label', `Question ${i + 1}`);
            dot.addEventListener('click', () => this.goToQuestion(i));
            this.questionDots.appendChild(dot);
        }
        
        this.updateQuestionDots();
    }
    
    updateQuestionDots() {
        const dots = this.questionDots.querySelectorAll('.question-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('current', 'answered');
            
            if (index === this.currentQuestionIndex) {
                dot.classList.add('current');
            }
            
            if (this.userAnswers[index] !== null) {
                dot.classList.add('answered');
            }
        });
    }
    
    // ========================================
    // Question Display
    // ========================================
    
    loadQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        // Update question text
        this.questionText.textContent = question.question;
        
        // Update question counter
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        
        // Create options
        this.optionsContainer.innerHTML = '';
        const optionLetters = ['A', 'B', 'C', 'D'];
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.setAttribute('data-option', index);
            optionDiv.setAttribute('tabindex', '0');
            optionDiv.setAttribute('role', 'button');
            optionDiv.setAttribute('aria-label', `Option ${optionLetters[index]}: ${option}`);
            
            // Check if this option was previously selected
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionDiv.classList.add('selected');
            }
            
            optionDiv.innerHTML = `
                <span class="option-letter">${optionLetters[index]}</span>
                <span class="option-text">${option}</span>
            `;
            
            optionDiv.addEventListener('click', () => this.selectOption(index));
            optionDiv.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.selectOption(index);
                }
            });
            
            this.optionsContainer.appendChild(optionDiv);
        });
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update question dots
        this.updateQuestionDots();
        
        // Record start time for this question
        this.questionStartTime = new Date();
    }
    
    selectOption(optionIndex) {
        // Record time spent on this question
        if (this.questionStartTime) {
            const timeSpent = (new Date() - this.questionStartTime) / 1000;
            this.timePerQuestion[this.currentQuestionIndex] += timeSpent;
        }
        
        // Save answer
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Update UI
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach((opt, index) => {
            opt.classList.remove('selected');
            if (index === optionIndex) {
                opt.classList.add('selected');
            }
        });
        
        // Update dots
        this.updateQuestionDots();
        
        // Reset start time
        this.questionStartTime = new Date();
    }
    
    updateNavigationButtons() {
        // Previous button
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next button
        if (this.currentQuestionIndex === this.currentQuestions.length - 1) {
            this.nextBtn.textContent = 'Finish';
        } else {
            this.nextBtn.textContent = 'Next';
        }
    }
    
    // ========================================
    // Navigation
    // ========================================
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.recordTimeSpent();
            this.currentQuestionIndex--;
            this.resetTimer();
            this.loadQuestion();
        }
    }
    
    nextQuestion() {
        this.recordTimeSpent();
        
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.resetTimer();
            this.loadQuestion();
        } else {
            // Last question - show confirmation or submit
            this.submitQuiz();
        }
    }
    
    goToQuestion(index) {
        if (index >= 0 && index < this.currentQuestions.length) {
            this.recordTimeSpent();
            this.currentQuestionIndex = index;
            this.resetTimer();
            this.loadQuestion();
        }
    }
    
    recordTimeSpent() {
        if (this.questionStartTime) {
            const timeSpent = (new Date() - this.questionStartTime) / 1000;
            this.timePerQuestion[this.currentQuestionIndex] += timeSpent;
        }
    }
    
    // ========================================
    // Timer
    // ========================================
    
    startTimer() {
        this.timerSeconds = this.maxTimerSeconds;
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            this.updateTimerDisplay();
            
            if (this.timerSeconds <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        this.timerValue.textContent = this.timerSeconds;
        
        // Update progress bar
        const progressPercent = (this.timerSeconds / this.maxTimerSeconds) * 100;
        this.timerProgress.style.width = `${progressPercent}%`;
        
        // Update colors based on time remaining
        this.timerValue.classList.remove('warning', 'danger');
        this.timerProgress.classList.remove('warning', 'danger');
        
        if (this.timerSeconds <= 5) {
            this.timerValue.classList.add('danger');
            this.timerProgress.classList.add('danger');
        } else if (this.timerSeconds <= 10) {
            this.timerValue.classList.add('warning');
            this.timerProgress.classList.add('warning');
        }
    }
    
    resetTimer() {
        clearInterval(this.timerInterval);
        this.startTimer();
    }
    
    timeUp() {
        // Auto-submit current question (if not answered, mark as null)
        this.recordTimeSpent();
        
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            // Move to next question
            this.currentQuestionIndex++;
            this.resetTimer();
            this.loadQuestion();
        } else {
            // Last question - submit quiz
            this.submitQuiz();
        }
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    
    // ========================================
    // Submit Quiz
    // ========================================
    
    submitQuiz() {
        // Record time for current question
        this.recordTimeSpent();
        
        // Stop timer
        this.stopTimer();
        
        // Record end time
        this.quizEndTime = new Date();
        
        // Check for unanswered questions
        const unansweredCount = this.userAnswers.filter(a => a === null).length;
        
        if (unansweredCount > 0) {
            const confirmSubmit = confirm(
                `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`
            );
            if (!confirmSubmit) {
                this.resetTimer();
                return;
            }
        }
        
        // Calculate results
        this.calculateResults();
        
        // Show results page
        this.showPage('results');
    }
    
    // ========================================
    // Results Calculation
    // ========================================
    
    calculateResults() {
        let correctCount = 0;
        let incorrectCount = 0;
        
        // Calculate correct/incorrect answers
        this.currentQuestions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correctAnswer) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });
        
        const totalQuestions = this.currentQuestions.length;
        const scorePercent = Math.round((correctCount / totalQuestions) * 100);
        const totalTimeSpent = this.timePerQuestion.reduce((a, b) => a + b, 0);
        const avgTimeSpent = totalTimeSpent / totalQuestions;
        
        // Update summary stats
        this.scorePercentage.textContent = `${scorePercent}%`;
        this.correctCount.textContent = correctCount;
        this.totalCount.textContent = totalQuestions;
        this.correctAnswers.textContent = correctCount;
        this.incorrectAnswers.textContent = incorrectCount;
        this.totalTime.textContent = this.formatTime(totalTimeSpent);
        this.avgTime.textContent = this.formatTime(avgTimeSpent);
        
        // Create charts
        this.createPerformanceChart(correctCount, incorrectCount);
        this.createTimeChart();
        
        // Create question breakdown
        this.createQuestionBreakdown();
    }
    
    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds.toFixed(1)}s`;
        } else {
            const mins = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);
            return `${mins}m ${secs}s`;
        }
    }
    
    // ========================================
    // Charts
    // ========================================
    
    createPerformanceChart(correct, incorrect) {
        const ctx = document.getElementById('performance-chart').getContext('2d');
        
        // Destroy existing chart if any
        if (this.performanceChart) {
            this.performanceChart.destroy();
        }
        
        this.performanceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    data: [correct, incorrect],
                    backgroundColor: ['#22c55e', '#ef4444'],
                    borderColor: ['#16a34a', '#dc2626'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((context.parsed / total) * 100);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    createTimeChart() {
        const ctx = document.getElementById('time-chart').getContext('2d');
        
        // Destroy existing chart if any
        if (this.timeChart) {
            this.timeChart.destroy();
        }
        
        const labels = this.currentQuestions.map((_, i) => `Q${i + 1}`);
        const colors = this.currentQuestions.map((q, i) => {
            return this.userAnswers[i] === q.correctAnswer ? '#22c55e' : '#ef4444';
        });
        
        this.timeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Time (seconds)',
                    data: this.timePerQuestion.map(t => parseFloat(t.toFixed(1))),
                    backgroundColor: colors,
                    borderColor: colors.map(c => c === '#22c55e' ? '#16a34a' : '#dc2626'),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (seconds)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Questions'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Time: ${context.parsed.y} seconds`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // ========================================
    // Question Breakdown
    // ========================================
    
    createQuestionBreakdown() {
        this.breakdownContainer.innerHTML = '';
        
        this.currentQuestions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const timeSpent = this.timePerQuestion[index];
            
            const breakdownItem = document.createElement('div');
            breakdownItem.className = `breakdown-item ${isCorrect ? 'correct' : 'incorrect'}`;
            
            let answersHtml = '';
            if (userAnswer === null) {
                answersHtml = `
                    <span class="your-answer">Your answer: Not answered</span>
                    <span class="correct-answer">Correct answer: ${question.options[question.correctAnswer]}</span>
                `;
            } else if (isCorrect) {
                answersHtml = `
                    <span class="correct-answer">Your answer: ${question.options[userAnswer]} ✓</span>
                `;
            } else {
                answersHtml = `
                    <span class="your-answer">Your answer: ${question.options[userAnswer]} ✗</span>
                    <span class="correct-answer">Correct answer: ${question.options[question.correctAnswer]}</span>
                `;
            }
            
            breakdownItem.innerHTML = `
                <div class="breakdown-number">${index + 1}</div>
                <div class="breakdown-content">
                    <div class="breakdown-question">${question.question}</div>
                    <div class="breakdown-answers">
                        ${answersHtml}
                    </div>
                </div>
                <div class="breakdown-time">
                    <span>${timeSpent.toFixed(1)}s</span>
                </div>
            `;
            
            this.breakdownContainer.appendChild(breakdownItem);
        });
    }
    
    // ========================================
    // Page Navigation
    // ========================================
    
    showPage(page) {
        this.landingPage.classList.remove('active');
        this.quizPage.classList.remove('active');
        this.resultsPage.classList.remove('active');
        
        switch (page) {
            case 'landing':
                this.landingPage.classList.add('active');
                break;
            case 'quiz':
                this.quizPage.classList.add('active');
                break;
            case 'results':
                this.resultsPage.classList.add('active');
                break;
        }
    }
    
    retryQuiz() {
        // Keep same settings, reload questions
        const category = this.categorySelect.value;
        const difficulty = this.difficultySelect.value;
        const questionsCount = parseInt(this.questionsCountSelect.value);
        
        // Reload with same settings
        this.loadQuestions(category, difficulty, questionsCount);
        
        // Reset state
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentQuestions.length).fill(null);
        this.timePerQuestion = new Array(this.currentQuestions.length).fill(0);
        this.quizStartTime = new Date();
        
        // Recreate dots
        this.createQuestionDots();
        
        // Show quiz
        this.showPage('quiz');
        this.loadQuestion();
        this.startTimer();
    }
    
    newQuiz() {
        // Go back to landing page
        this.stopTimer();
        this.showPage('landing');
    }
}

// Initialize the quiz application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});
