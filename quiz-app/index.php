<?php
/**
 * Dynamic Quiz Application - PHP Server Entry Point
 * 
 * This PHP file serves as the main entry point for the quiz application.
 * It handles:
 * - Serving the quiz interface
 * - Session management for quiz state
 * - Server-side configuration
 */

// Start session for potential future enhancements
session_start();

// Configuration
$config = [
    'app_name' => 'Dynamic Quiz Application',
    'version' => '1.0.0',
    'timer_durations' => [
        'easy' => 30,
        'medium' => 25,
        'hard' => 20
    ],
    'categories' => [
        'general' => 'General Knowledge',
        'science' => 'Science',
        'math' => 'Mathematics',
        'history' => 'History',
        'geography' => 'Geography'
    ],
    'difficulties' => ['easy', 'medium', 'hard'],
    'question_counts' => [5, 10, 15]
];

// Helper function to get category display name
function getCategoryName($key, $categories) {
    return isset($categories[$key]) ? $categories[$key] : ucfirst($key);
}

// Get current timestamp for cache busting
$cache_buster = time();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo $config['app_name']; ?> - Test your knowledge across various categories and difficulty levels">
    <meta name="author" content="Quiz Application">
    <title><?php echo $config['app_name']; ?></title>
    <link rel="stylesheet" href="css/styles.css?v=<?php echo $cache_buster; ?>">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <!-- Landing Page -->
        <section id="landing-page" class="page active">
            <div class="hero">
                <h1>🎯 <?php echo $config['app_name']; ?></h1>
                <p class="subtitle">Test your knowledge across various categories and difficulty levels!</p>
                
                <div class="quiz-setup">
                    <div class="form-group">
                        <label for="category-select">Select Category:</label>
                        <select id="category-select">
                            <?php foreach ($config['categories'] as $key => $name): ?>
                                <option value="<?php echo $key; ?>"><?php echo $name; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="difficulty-select">Select Difficulty:</label>
                        <select id="difficulty-select">
                            <?php foreach ($config['difficulties'] as $difficulty): ?>
                                <option value="<?php echo $difficulty; ?>"><?php echo ucfirst($difficulty); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="questions-count">Number of Questions:</label>
                        <select id="questions-count">
                            <?php foreach ($config['question_counts'] as $count): ?>
                                <option value="<?php echo $count; ?>" <?php echo $count == 10 ? 'selected' : ''; ?>>
                                    <?php echo $count; ?> Questions
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <button id="start-quiz-btn" class="btn btn-primary">Start Quiz</button>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <span class="feature-icon">⏱️</span>
                        <h3>Timed Questions</h3>
                        <p>Each question has a countdown timer</p>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📊</span>
                        <h3>Detailed Analysis</h3>
                        <p>Get comprehensive result breakdown</p>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🎮</span>
                        <h3>Multiple Categories</h3>
                        <p>Choose from various quiz topics</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quiz Page -->
        <section id="quiz-page" class="page">
            <div class="quiz-header">
                <div class="quiz-info">
                    <span id="category-display" class="badge">Category</span>
                    <span id="difficulty-display" class="badge">Difficulty</span>
                </div>
                <div class="timer-container">
                    <div id="timer" class="timer">
                        <span id="timer-value">30</span>
                        <span class="timer-label">seconds</span>
                    </div>
                    <div id="timer-bar" class="timer-bar">
                        <div id="timer-progress" class="timer-progress"></div>
                    </div>
                </div>
            </div>

            <div class="quiz-content">
                <div class="question-counter">
                    <span>Question <span id="current-question">1</span> of <span id="total-questions">10</span></span>
                </div>
                
                <div id="question-container" class="question-container">
                    <h2 id="question-text" class="question-text">Loading question...</h2>
                    <div id="options-container" class="options-container">
                        <!-- Options will be dynamically inserted here -->
                    </div>
                </div>

                <div class="quiz-navigation">
                    <button id="prev-btn" class="btn btn-secondary" disabled>Previous</button>
                    <div class="question-dots" id="question-dots">
                        <!-- Question navigation dots will be inserted here -->
                    </div>
                    <button id="next-btn" class="btn btn-primary">Next</button>
                </div>
            </div>

            <div class="quiz-footer">
                <button id="submit-quiz-btn" class="btn btn-success">Submit Quiz</button>
            </div>
        </section>

        <!-- Results Page -->
        <section id="results-page" class="page">
            <div class="results-header">
                <h1>📊 Quiz Results</h1>
                <p class="result-subtitle">Here's how you performed!</p>
            </div>

            <div class="results-summary">
                <div class="score-card">
                    <div class="score-circle">
                        <span id="score-percentage">0%</span>
                    </div>
                    <h3>Overall Score</h3>
                    <p><span id="correct-count">0</span> out of <span id="total-count">0</span> correct</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card correct">
                        <span class="stat-icon">✓</span>
                        <span id="correct-answers" class="stat-value">0</span>
                        <span class="stat-label">Correct</span>
                    </div>
                    <div class="stat-card incorrect">
                        <span class="stat-icon">✗</span>
                        <span id="incorrect-answers" class="stat-value">0</span>
                        <span class="stat-label">Incorrect</span>
                    </div>
                    <div class="stat-card time">
                        <span class="stat-icon">⏱️</span>
                        <span id="total-time" class="stat-value">0s</span>
                        <span class="stat-label">Total Time</span>
                    </div>
                    <div class="stat-card avg-time">
                        <span class="stat-icon">📈</span>
                        <span id="avg-time" class="stat-value">0s</span>
                        <span class="stat-label">Avg Time/Question</span>
                    </div>
                </div>
            </div>

            <div class="charts-container">
                <div class="chart-card">
                    <h3>Performance Overview</h3>
                    <canvas id="performance-chart"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Time Spent Per Question</h3>
                    <canvas id="time-chart"></canvas>
                </div>
            </div>

            <div class="question-breakdown">
                <h3>Question-by-Question Analysis</h3>
                <div id="breakdown-container" class="breakdown-container">
                    <!-- Question breakdown will be inserted here -->
                </div>
            </div>

            <div class="results-actions">
                <button id="retry-quiz-btn" class="btn btn-primary">Retry Quiz</button>
                <button id="new-quiz-btn" class="btn btn-secondary">New Quiz</button>
            </div>
        </section>
    </div>

    <!-- Pass PHP config to JavaScript -->
    <script>
        window.phpConfig = <?php echo json_encode($config); ?>;
    </script>
    <script src="js/questions.js?v=<?php echo $cache_buster; ?>"></script>
    <script src="js/quiz.js?v=<?php echo $cache_buster; ?>"></script>
</body>
</html>
