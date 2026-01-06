<?php
/**
 * Quiz API - PHP Backend
 * 
 * Handles quiz-related operations:
 * - Get questions by category and difficulty
 * - Save quiz results
 * - Get quiz statistics
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start session
session_start();

// Configuration
$config = [
    'timer_durations' => [
        'easy' => 30,
        'medium' => 25,
        'hard' => 20
    ]
];

// Include questions database (PHP version)
require_once 'questions_db.php';

/**
 * Get the action from request
 */
$action = isset($_GET['action']) ? $_GET['action'] : '';

/**
 * Response helper function
 */
function sendResponse($success, $data = null, $message = '') {
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

/**
 * Handle different API actions
 */
switch ($action) {
    case 'get_questions':
        handleGetQuestions();
        break;
    
    case 'get_categories':
        handleGetCategories();
        break;
    
    case 'get_timer':
        handleGetTimer();
        break;
    
    case 'save_result':
        handleSaveResult();
        break;
    
    case 'get_stats':
        handleGetStats();
        break;
    
    default:
        sendResponse(false, null, 'Invalid action. Available actions: get_questions, get_categories, get_timer, save_result, get_stats');
}

/**
 * Get questions by category and difficulty
 */
function handleGetQuestions() {
    global $questionsDatabase;
    
    $category = isset($_GET['category']) ? $_GET['category'] : 'general';
    $difficulty = isset($_GET['difficulty']) ? $_GET['difficulty'] : 'easy';
    $count = isset($_GET['count']) ? intval($_GET['count']) : 10;
    
    // Validate category
    if (!isset($questionsDatabase[$category])) {
        sendResponse(false, null, 'Invalid category');
    }
    
    // Validate difficulty
    if (!isset($questionsDatabase[$category][$difficulty])) {
        sendResponse(false, null, 'Invalid difficulty');
    }
    
    // Get questions
    $allQuestions = $questionsDatabase[$category][$difficulty];
    
    // Shuffle questions
    shuffle($allQuestions);
    
    // Get requested count
    $selectedQuestions = array_slice($allQuestions, 0, min($count, count($allQuestions)));
    
    // Remove correct answer from response (for security)
    $questionsForClient = array_map(function($q, $index) {
        return [
            'id' => $index + 1,
            'question' => $q['question'],
            'options' => $q['options']
        ];
    }, $selectedQuestions, array_keys($selectedQuestions));
    
    // Store correct answers in session for validation
    $_SESSION['quiz_answers'] = array_map(function($q) {
        return $q['correctAnswer'];
    }, $selectedQuestions);
    
    $_SESSION['quiz_questions'] = $selectedQuestions;
    $_SESSION['quiz_start_time'] = time();
    
    sendResponse(true, [
        'questions' => $questionsForClient,
        'category' => $category,
        'difficulty' => $difficulty,
        'count' => count($questionsForClient)
    ]);
}

/**
 * Get available categories
 */
function handleGetCategories() {
    $categories = [
        'general' => 'General Knowledge',
        'science' => 'Science',
        'math' => 'Mathematics',
        'history' => 'History',
        'geography' => 'Geography'
    ];
    
    sendResponse(true, $categories);
}

/**
 * Get timer duration for difficulty
 */
function handleGetTimer() {
    global $config;
    
    $difficulty = isset($_GET['difficulty']) ? $_GET['difficulty'] : 'easy';
    
    if (!isset($config['timer_durations'][$difficulty])) {
        sendResponse(false, null, 'Invalid difficulty');
    }
    
    sendResponse(true, [
        'difficulty' => $difficulty,
        'duration' => $config['timer_durations'][$difficulty]
    ]);
}

/**
 * Save quiz result
 */
function handleSaveResult() {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendResponse(false, null, 'Invalid request data');
    }
    
    $userAnswers = isset($input['answers']) ? $input['answers'] : [];
    $timePerQuestion = isset($input['timePerQuestion']) ? $input['timePerQuestion'] : [];
    
    // Validate against session
    if (!isset($_SESSION['quiz_answers'])) {
        sendResponse(false, null, 'No active quiz session');
    }
    
    $correctAnswers = $_SESSION['quiz_answers'];
    $questions = $_SESSION['quiz_questions'];
    
    // Calculate score
    $correct = 0;
    $incorrect = 0;
    $results = [];
    
    for ($i = 0; $i < count($correctAnswers); $i++) {
        $userAnswer = isset($userAnswers[$i]) ? $userAnswers[$i] : null;
        $isCorrect = $userAnswer === $correctAnswers[$i];
        
        if ($isCorrect) {
            $correct++;
        } else {
            $incorrect++;
        }
        
        $results[] = [
            'question' => $questions[$i]['question'],
            'userAnswer' => $userAnswer !== null ? $questions[$i]['options'][$userAnswer] : 'Not answered',
            'correctAnswer' => $questions[$i]['options'][$correctAnswers[$i]],
            'isCorrect' => $isCorrect,
            'timeSpent' => isset($timePerQuestion[$i]) ? $timePerQuestion[$i] : 0
        ];
    }
    
    $totalQuestions = count($correctAnswers);
    $scorePercent = $totalQuestions > 0 ? round(($correct / $totalQuestions) * 100) : 0;
    $totalTime = array_sum($timePerQuestion);
    $avgTime = $totalQuestions > 0 ? $totalTime / $totalQuestions : 0;
    
    // Store result in session
    $_SESSION['last_result'] = [
        'score' => $scorePercent,
        'correct' => $correct,
        'incorrect' => $incorrect,
        'total' => $totalQuestions,
        'totalTime' => $totalTime,
        'avgTime' => $avgTime,
        'results' => $results,
        'completedAt' => date('Y-m-d H:i:s')
    ];
    
    // Clear quiz session
    unset($_SESSION['quiz_answers']);
    unset($_SESSION['quiz_questions']);
    unset($_SESSION['quiz_start_time']);
    
    sendResponse(true, $_SESSION['last_result']);
}

/**
 * Get quiz statistics
 */
function handleGetStats() {
    if (isset($_SESSION['last_result'])) {
        sendResponse(true, $_SESSION['last_result']);
    } else {
        sendResponse(false, null, 'No quiz results available');
    }
}
