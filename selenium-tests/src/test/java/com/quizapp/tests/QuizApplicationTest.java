package com.quizapp.tests;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

/**
 * Quiz Application Selenium Test Class
 * Takes the quiz once and verifies results with screenshots and logging
 */
public class QuizApplicationTest extends BaseTest {
    
    private static final Logger testLogger = LogManager.getLogger(QuizApplicationTest.class);
    private WebDriverWait wait;
    
    // Locators
    private static final By LANDING_PAGE = By.id("landing-page");
    private static final By QUIZ_PAGE = By.id("quiz-page");
    private static final By RESULTS_PAGE = By.id("results-page");
    
    // Landing Page Elements
    private static final By CATEGORY_SELECT = By.id("category-select");
    private static final By DIFFICULTY_SELECT = By.id("difficulty-select");
    private static final By QUESTIONS_COUNT_SELECT = By.id("questions-count");
    private static final By START_QUIZ_BTN = By.id("start-quiz-btn");
    
    // Quiz Page Elements
    private static final By TIMER_VALUE = By.id("timer-value");
    private static final By CURRENT_QUESTION = By.id("current-question");
    private static final By TOTAL_QUESTIONS = By.id("total-questions");
    private static final By QUESTION_TEXT = By.id("question-text");
    private static final By NEXT_BTN = By.id("next-btn");
    private static final By SUBMIT_QUIZ_BTN = By.id("submit-quiz-btn");
    
    // Results Page Elements
    private static final By SCORE_PERCENTAGE = By.id("score-percentage");
    private static final By CORRECT_COUNT = By.id("correct-count");
    private static final By TOTAL_COUNT = By.id("total-count");
    private static final By CORRECT_ANSWERS = By.id("correct-answers");
    private static final By INCORRECT_ANSWERS = By.id("incorrect-answers");
    private static final By TOTAL_TIME = By.id("total-time");
    private static final By AVG_TIME = By.id("avg-time");
    private static final By BREAKDOWN_CONTAINER = By.id("breakdown-container");
    private static final By PERFORMANCE_CHART = By.id("performance-chart");
    private static final By TIME_CHART = By.id("time-chart");
    
    /**
     * Complete End-to-End Quiz Test
     * Takes the quiz once, verifies score, correct/incorrect answers
     * Captures screenshots at each step and logs all interactions
     */
    @Test(description = "Complete Quiz Test with Score Verification")
    public void testCompleteQuizFlow() {
        testLogger.info("========================================");
        testLogger.info("STARTING COMPLETE QUIZ TEST");
        testLogger.info("========================================");
        
        // Initialize wait
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        
        // ============ STEP 1: LANDING PAGE ============
        testLogger.info("--- STEP 1: Navigate to Landing Page ---");
        String quizUrl = getQuizUrl();
        testLogger.info("Navigating to Quiz URL: " + quizUrl);
        driver.get(quizUrl);
        
        wait.until(ExpectedConditions.visibilityOfElementLocated(LANDING_PAGE));
        
        String currentUrl = driver.getCurrentUrl();
        String pageTitle = driver.getTitle();
        testLogger.info("Current URL: " + currentUrl);
        testLogger.info("Page Title: " + pageTitle);
        System.out.println("Current URL: " + currentUrl);
        System.out.println("Page Title: " + pageTitle);
        
        takeScreenshot("01_LandingPage");
        testLogger.info("Landing page loaded successfully");
        
        // ============ STEP 2: SELECT QUIZ OPTIONS ============
        testLogger.info("--- STEP 2: Configure Quiz Options ---");
        
        // Select category
        Select categorySelect = new Select(driver.findElement(CATEGORY_SELECT));
        categorySelect.selectByValue("general");
        String selectedCategory = categorySelect.getFirstSelectedOption().getText();
        testLogger.info("Selected category: " + selectedCategory);
        
        // Select difficulty
        Select difficultySelect = new Select(driver.findElement(DIFFICULTY_SELECT));
        difficultySelect.selectByValue("easy");
        String selectedDifficulty = difficultySelect.getFirstSelectedOption().getText();
        testLogger.info("Selected difficulty: " + selectedDifficulty);
        
        // Select number of questions
        Select questionsSelect = new Select(driver.findElement(QUESTIONS_COUNT_SELECT));
        questionsSelect.selectByValue("5");
        String selectedCount = questionsSelect.getFirstSelectedOption().getText();
        testLogger.info("Selected questions count: " + selectedCount);
        
        takeScreenshot("02_QuizConfigured");
        
        // ============ STEP 3: START QUIZ ============
        testLogger.info("--- STEP 3: Start Quiz ---");
        WebElement startBtn = driver.findElement(START_QUIZ_BTN);
        testLogger.info("Clicking Start Quiz button");
        startBtn.click();
        
        wait.until(ExpectedConditions.visibilityOfElementLocated(QUIZ_PAGE));
        sleep(500);
        
        takeScreenshot("03_QuizStarted");
        testLogger.info("Quiz started successfully");
        
        // Get total questions
        int totalQuestions = Integer.parseInt(driver.findElement(TOTAL_QUESTIONS).getText());
        testLogger.info("Total questions: " + totalQuestions);
        
        // ============ STEP 4: ANSWER ALL QUESTIONS ============
        testLogger.info("--- STEP 4: Answering Questions ---");
        
        for (int i = 1; i <= totalQuestions; i++) {
            testLogger.info("=== Question " + i + " of " + totalQuestions + " ===");
            
            // Get question text
            String questionText = driver.findElement(QUESTION_TEXT).getText();
            testLogger.info("Question: " + questionText);
            
            // Get timer value
            String timerValue = driver.findElement(TIMER_VALUE).getText();
            testLogger.info("Timer: " + timerValue + " seconds");
            
            // Capture timer screenshot for first question
            if (i == 1) {
                takeScreenshot("04_Timer_Display");
            }
            
            // Get all options
            List<WebElement> options = driver.findElements(By.cssSelector(".option"));
            testLogger.info("Number of options: " + options.size());
            
            // Log all options
            for (int j = 0; j < options.size(); j++) {
                String optionText = options.get(j).findElement(By.className("option-text")).getText();
                testLogger.info("  Option " + (char)('A' + j) + ": " + optionText);
            }
            
            // Select an answer (rotate through options for variety)
            int optionIndex = (i - 1) % 4;
            WebElement selectedOption = options.get(optionIndex);
            String selectedText = selectedOption.findElement(By.className("option-text")).getText();
            testLogger.info("Selecting option " + (char)('A' + optionIndex) + ": " + selectedText);
            selectedOption.click();
            sleep(300);
            
            // Verify option is selected
            Assert.assertTrue(selectedOption.getAttribute("class").contains("selected"), 
                    "Option should be marked as selected");
            testLogger.info("Option selected successfully");
            
            // Take screenshot for each question
            takeScreenshot("05_Question" + i + "_Answered");
            
            // Navigate to next question or prepare for submit
            if (i < totalQuestions) {
                WebElement nextBtn = driver.findElement(NEXT_BTN);
                // Scroll into view before clicking
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
                    "arguments[0].scrollIntoView({block: 'center'});", nextBtn);
                sleep(200);
                testLogger.info("Clicking Next button");
                nextBtn.click();
                sleep(500);
            }
        }
        
        testLogger.info("All " + totalQuestions + " questions answered");
        
        // ============ STEP 5: SUBMIT QUIZ ============
        testLogger.info("--- STEP 5: Submit Quiz ---");
        
        takeScreenshot("06_BeforeSubmit");
        
        WebElement submitBtn = driver.findElement(SUBMIT_QUIZ_BTN);
        ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", submitBtn);
        sleep(200);
        testLogger.info("Clicking Submit Quiz button");
        submitBtn.click();
        
        // Wait for results page
        wait.until(ExpectedConditions.visibilityOfElementLocated(RESULTS_PAGE));
        sleep(1000); // Allow charts to render
        
        takeScreenshot("07_ResultsPage");
        testLogger.info("Quiz submitted, results page displayed");
        
        // ============ STEP 6: VERIFY RESULTS ============
        testLogger.info("--- STEP 6: Verify Results ---");
        
        // Get score percentage
        String scorePercentage = driver.findElement(SCORE_PERCENTAGE).getText();
        testLogger.info("Score Percentage: " + scorePercentage);
        System.out.println("Final Score: " + scorePercentage);
        
        // Get correct/incorrect counts
        String correctCount = driver.findElement(CORRECT_COUNT).getText();
        String totalCount = driver.findElement(TOTAL_COUNT).getText();
        testLogger.info("Correct Answers: " + correctCount + " out of " + totalCount);
        System.out.println("Correct Answers: " + correctCount + " out of " + totalCount);
        
        String correctAnswers = driver.findElement(CORRECT_ANSWERS).getText();
        String incorrectAnswers = driver.findElement(INCORRECT_ANSWERS).getText();
        testLogger.info("Correct: " + correctAnswers);
        testLogger.info("Incorrect: " + incorrectAnswers);
        
        // Get time statistics
        String totalTime = driver.findElement(TOTAL_TIME).getText();
        String avgTime = driver.findElement(AVG_TIME).getText();
        testLogger.info("Total Time: " + totalTime);
        testLogger.info("Average Time per Question: " + avgTime);
        
        takeScreenshot("08_ScoreSummary");
        
        // ============ STEP 7: VERIFY CHARTS ============
        testLogger.info("--- STEP 7: Verify Charts Display ---");
        
        WebElement performanceChart = driver.findElement(PERFORMANCE_CHART);
        Assert.assertTrue(performanceChart.isDisplayed(), "Performance chart should be displayed");
        testLogger.info("Performance chart (doughnut) is displayed");
        
        WebElement timeChart = driver.findElement(TIME_CHART);
        Assert.assertTrue(timeChart.isDisplayed(), "Time chart should be displayed");
        testLogger.info("Time chart (bar) is displayed");
        
        // Scroll to charts and capture
        ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", performanceChart);
        sleep(300);
        takeScreenshot("09_Charts");
        
        // ============ STEP 8: VERIFY QUESTION BREAKDOWN ============
        testLogger.info("--- STEP 8: Verify Question Breakdown ---");
        
        WebElement breakdownContainer = driver.findElement(BREAKDOWN_CONTAINER);
        ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
            "arguments[0].scrollIntoView({block: 'center'});", breakdownContainer);
        sleep(300);
        
        List<WebElement> breakdownItems = breakdownContainer.findElements(By.className("breakdown-item"));
        testLogger.info("Question breakdown items found: " + breakdownItems.size());
        Assert.assertEquals(breakdownItems.size(), totalQuestions, 
                "Breakdown should show all " + totalQuestions + " questions");
        
        // Log each breakdown item
        int correctCountNum = 0;
        int incorrectCountNum = 0;
        for (int i = 0; i < breakdownItems.size(); i++) {
            WebElement item = breakdownItems.get(i);
            String questionNum = item.findElement(By.className("breakdown-question")).getText();
            boolean isCorrect = item.getAttribute("class").contains("correct");
            String status = isCorrect ? "CORRECT" : "INCORRECT";
            testLogger.info("Q" + (i+1) + ": " + status + " - " + questionNum);
            
            if (isCorrect) correctCountNum++;
            else incorrectCountNum++;
        }
        
        takeScreenshot("10_QuestionBreakdown");
        
        // ============ FINAL SUMMARY ============
        testLogger.info("========================================");
        testLogger.info("QUIZ TEST COMPLETED SUCCESSFULLY");
        testLogger.info("========================================");
        testLogger.info("Final Score: " + scorePercentage);
        testLogger.info("Correct Answers: " + correctCountNum);
        testLogger.info("Incorrect Answers: " + incorrectCountNum);
        testLogger.info("Total Questions: " + totalQuestions);
        testLogger.info("Total Time: " + totalTime);
        testLogger.info("Average Time: " + avgTime);
        testLogger.info("========================================");
        
        // Print summary to console
        System.out.println("\n========================================");
        System.out.println("QUIZ RESULTS SUMMARY");
        System.out.println("========================================");
        System.out.println("Score: " + scorePercentage);
        System.out.println("Correct Answers: " + correctCountNum);
        System.out.println("Incorrect Answers: " + incorrectCountNum);
        System.out.println("Total Questions: " + totalQuestions);
        System.out.println("Total Time: " + totalTime);
        System.out.println("Average Time per Question: " + avgTime);
        System.out.println("========================================\n");
        
        takeScreenshot("11_FinalResults");
        
        // Assertions to verify test passed
        Assert.assertNotNull(scorePercentage, "Score should not be null");
        Assert.assertEquals(Integer.parseInt(totalCount), totalQuestions, 
                "Total count should match questions answered");
        Assert.assertTrue(correctCountNum + incorrectCountNum == totalQuestions,
                "Correct + Incorrect should equal total questions");
        
        testLogger.info("All assertions passed - Test Complete!");
    }
    
    /**
     * Helper method to pause execution
     */
    private void sleep(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
