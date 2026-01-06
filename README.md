# Dynamic Quiz Application

A comprehensive, interactive quiz application built with **PHP**, HTML, CSS, and JavaScript featuring multiple categories, difficulty levels, timed questions, and detailed result analysis with charts.

## 📋 Features

### Quiz Features
- **Multiple Categories**: General Knowledge, Science, Mathematics, History, Geography
- **Difficulty Levels**: Easy, Medium, Hard (with different timer durations)
- **Customizable Questions**: Choose 5, 10, or 15 questions per quiz
- **Countdown Timer**: Time limit per question based on difficulty
  - Easy: 30 seconds
  - Medium: 25 seconds
  - Hard: 20 seconds
- **Question Navigation**: Navigate between questions, skip and return
- **Visual Indicators**: Progress dots showing answered/unanswered questions

### Result Analysis
- **Score Calculation**: Percentage-based scoring
- **Performance Chart**: Doughnut chart showing correct vs incorrect answers
- **Time Analysis Chart**: Bar chart showing time spent per question
- **Question Breakdown**: Detailed review of each question with your answers
- **Statistics**: Total time, average time per question

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Keyboard navigation and ARIA labels
- **Color-coded Feedback**: Visual indicators for timer warnings

## 🚀 Getting Started

### Prerequisites

#### For Running the Quiz App:
- **PHP 7.4+** (for PHP server mode) OR a modern web browser (for static mode)
- Download PHP: https://windows.php.net/download/
- Or install XAMPP: https://www.apachefriends.org/

#### For Running Selenium Tests:
- **Java JDK 11+**: https://adoptium.net/temurin/releases/
- **Maven 3.6+**: https://maven.apache.org/download.cgi
- **Google Chrome**: https://www.google.com/chrome/

### Quick Installation (Windows)

1. **Run the setup script**:
   ```powershell
   # Right-click setup.ps1 and select "Run with PowerShell"
   # Or run in PowerShell:
   .\setup.ps1
   ```

2. **Or use Chocolatey (if installed)**:
   ```powershell
   choco install php openjdk17 maven googlechrome
   ```

### Running the Quiz Application

#### Option 1: Using PHP Server (Recommended)
```bash
# Double-click start-server.bat
# OR run manually:
cd quiz-app
php -S localhost:8080 server.php
```
Then open http://localhost:8080 in your browser.

#### Option 2: Open directly in browser (No PHP required)
- Navigate to the `quiz-app` folder
- Open `index.html` in your web browser
- Note: PHP API features won't work in this mode

#### Option 3: Using Python
```bash
cd quiz-app
python -m http.server 8080
```

## 📁 Project Structure

```
Frugay/
├── quiz-app/                          # Main Quiz Application
│   ├── index.html                     # Main HTML file (static version)
│   ├── index.php                      # PHP entry point
│   ├── server.php                     # PHP development server router
│   ├── api/
│   │   ├── quiz.php                   # Quiz API endpoints
│   │   └── questions_db.php           # PHP questions database
│   ├── css/
│   │   └── styles.css                 # All CSS styles (responsive)
│   ├── js/
│   │   ├── questions.js               # JavaScript question database
│   │   └── quiz.js                    # Quiz logic and functionality
│   └── screenshots/                   # Screenshots folder
│
├── selenium-tests/                    # Selenium Test Project
│   ├── pom.xml                        # Maven configuration
│   ├── src/
│   │   └── test/
│   │       ├── java/
│   │       │   └── com/quizapp/tests/
│   │       │       ├── BaseTest.java          # Base test configuration
│   │       │       └── QuizApplicationTest.java # Test scenarios
│   │       └── resources/
│   │           ├── config.properties  # Test configuration
│   │           ├── testng.xml         # TestNG suite configuration
│   │           └── log4j2.xml         # Logging configuration
│   ├── screenshots/                   # Test screenshots
│   └── logs/                          # Test logs
│
├── setup.ps1                          # Windows setup script (PowerShell)
├── start-server.bat                   # Quick start PHP server
├── run-tests.bat                      # Quick run Selenium tests
└── README.md                          # This file
```

## 🧪 Selenium Testing

### Prerequisites for Testing
- Java JDK 11 or higher
- Maven 3.6 or higher
- Chrome browser

### Running Tests

1. **Start the quiz application first**:
   ```bash
   # Run start-server.bat OR:
   cd quiz-app
   php -S localhost:8080 server.php
   ```

2. **Run tests using Maven**:
   ```bash
   # Double-click run-tests.bat OR:
   cd selenium-tests
   mvn clean test
   ```

3. **Run specific test class**:
   ```bash
   mvn test -Dtest=QuizApplicationTest
   ```

### Test Scenarios

| Test # | Test Name | Description |
|--------|-----------|-------------|
| 1 | Verify Landing Page | Opens quiz URL, verifies page load, prints URL and Title |
| 2 | Start Quiz | Clicks Start Quiz, verifies first question is displayed |
| 3 | Question Navigation | Navigates through questions, selects answers |
| 4 | Submit Quiz | Submits quiz after answering all questions |
| 5 | Result Analysis | Verifies score, charts, and breakdown display |
| 6 | Timer Functionality | Tests countdown timer (optional) |
| 7 | Retry Quiz | Tests retry functionality |
| 8 | New Quiz | Tests returning to landing page |
| 9 | Different Difficulty | Tests Medium difficulty settings |
| 10 | End-to-End Hard | Complete flow with Hard difficulty |

### Test Artifacts

After running tests, you'll find:
- **Screenshots**: `selenium-tests/screenshots/` - Captured at each significant step
- **Logs**: `selenium-tests/logs/` - Detailed execution logs

### Configuration Options

Edit `config.properties` to customize:
```properties
# Application URL
quiz.url=http://localhost:8080

# Browser options: chrome, firefox, edge
browser=chrome

# Run headless (no GUI)
headless=false

# Timeouts
implicit.wait=10
explicit.wait=15
page.load.timeout=30

# Screenshots
screenshot.on.failure=true
screenshot.on.success=true
```

## 🎮 How to Use the Quiz

1. **Select Options**: Choose your preferred category, difficulty, and number of questions
2. **Start Quiz**: Click "Start Quiz" to begin
3. **Answer Questions**: Click on your chosen answer option
4. **Navigate**: Use Previous/Next buttons or click on question dots
5. **Watch Timer**: Answer before time runs out (auto-advances on timeout)
6. **Submit**: Click "Submit Quiz" when done
7. **Review Results**: Check your score, charts, and question breakdown
8. **Retry/New**: Take the same quiz again or start a new one

## 📊 Question Database

The application includes 225 questions across 5 categories and 3 difficulty levels:
- Each category has 15 questions per difficulty level
- Questions are randomly shuffled for each quiz session
- Options are displayed in consistent A, B, C, D format

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Chart.js (for result visualization)

### Testing
- Selenium WebDriver 4.15.0
- TestNG 7.8.0
- WebDriver Manager 5.6.2
- Log4j2 2.22.0
- Maven

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Customization

### Adding New Questions

Edit `js/questions.js` and add questions to the appropriate category and difficulty:

```javascript
{
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0  // Index of correct option (0-3)
}
```

### Changing Timer Durations

Edit `js/questions.js`:
```javascript
const timerDurations = {
    easy: 30,    // seconds
    medium: 25,
    hard: 20
};
```

### Adding New Categories

1. Add category option in `index.html`
2. Add questions in `js/questions.js`
3. Update `getCategoryDisplayName()` in `js/quiz.js`

## 📝 Screen Recording

For screen recording during test execution, you can use:
- **Windows**: Xbox Game Bar (Win + G) or OBS Studio
- **Mac**: QuickTime Player or OBS Studio
- **Cross-platform**: OBS Studio, ShareX

## 🐛 Troubleshooting

### Quiz not loading?
- Ensure all files are in the correct folder structure
- Check browser console for JavaScript errors
- Try using a local server instead of opening file directly

### Tests failing?
- Verify the quiz URL in config.properties matches your setup
- Ensure Java and Maven are properly installed
- Check that Chrome browser is installed and updated
- Review logs in `selenium-tests/logs/`

### Timer not working?
- JavaScript must be enabled in your browser
- Check for browser extensions that might block scripts

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a demonstration of frontend development and Selenium testing skills.
