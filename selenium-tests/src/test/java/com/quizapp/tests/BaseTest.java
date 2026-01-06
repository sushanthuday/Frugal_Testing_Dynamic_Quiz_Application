package com.quizapp.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.ITestResult;
import org.testng.annotations.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.Properties;

/**
 * Base Test Class for Quiz Application Selenium Tests
 * Provides WebDriver setup, teardown, screenshots, screen recording, and logging
 */
public class BaseTest {
    
    protected static WebDriver driver;
    protected static Properties config;
    protected static final Logger logger = LogManager.getLogger(BaseTest.class);
    
    private static final String CONFIG_PATH = "src/test/resources/config.properties";
    private static final String SCREENSHOT_PATH = "screenshots";
    private static final String LOG_PATH = "logs";
    private static final String RECORDINGS_PATH = "recordings";
    
    // Screen recording process
    private static Process recordingProcess;
    private static String currentRecordingFile;
    
    /**
     * Load configuration properties before test suite
     */
    @BeforeSuite
    public void loadConfiguration() {
        logger.info("========================================");
        logger.info("Loading test configuration...");
        logger.info("========================================");
        
        config = new Properties();
        try (FileInputStream fis = new FileInputStream(CONFIG_PATH)) {
            config.load(fis);
            logger.info("Configuration loaded successfully");
        } catch (IOException e) {
            logger.error("Failed to load configuration: " + e.getMessage());
            throw new RuntimeException("Could not load configuration file", e);
        }
        
        // Create directories
        createDirectory(SCREENSHOT_PATH);
        createDirectory(LOG_PATH);
        createDirectory(RECORDINGS_PATH);
    }
    
    /**
     * Start screen recording before tests begin
     */
    private void startScreenRecording() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        currentRecordingFile = RECORDINGS_PATH + File.separator + "quiz_test_" + timestamp + ".avi";
        
        try {
            // Check if FFmpeg is available
            ProcessBuilder checkFfmpeg = new ProcessBuilder("ffmpeg", "-version");
            checkFfmpeg.redirectErrorStream(true);
            Process check = checkFfmpeg.start();
            int exitCode = check.waitFor();
            
            if (exitCode != 0) {
                logger.warn("FFmpeg not found. Screen recording disabled.");
                logger.info("To enable screen recording, install FFmpeg: https://ffmpeg.org/download.html");
                return;
            }
            
            // Start FFmpeg recording (Windows GDI capture) using AVI format for better compatibility
            ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-f", "gdigrab",           // Windows screen capture
                "-framerate", "10",        // 10 FPS for smaller file
                "-i", "desktop",           // Capture entire desktop
                "-c:v", "mjpeg",           // MJPEG codec (more compatible, no moov atom issues)
                "-q:v", "5",               // Quality (1-31, lower is better)
                "-y",                      // Overwrite output
                currentRecordingFile
            );
            pb.redirectErrorStream(true);
            recordingProcess = pb.start();
            
            logger.info("Screen recording started: " + currentRecordingFile);
            
            // Give FFmpeg time to start
            Thread.sleep(1000);
            
        } catch (Exception e) {
            logger.warn("Could not start screen recording: " + e.getMessage());
            logger.info("Screen recording is optional. Tests will continue without it.");
        }
    }
    
    /**
     * Stop screen recording after tests complete
     */
    private void stopScreenRecording() {
        if (recordingProcess != null && recordingProcess.isAlive()) {
            try {
                // Send 'q' to FFmpeg to gracefully stop recording
                recordingProcess.getOutputStream().write('q');
                recordingProcess.getOutputStream().flush();
                
                // Wait for process to finish
                boolean finished = recordingProcess.waitFor(10, java.util.concurrent.TimeUnit.SECONDS);
                
                if (!finished) {
                    recordingProcess.destroyForcibly();
                    logger.warn("Screen recording forcibly stopped");
                } else {
                    logger.info("Screen recording saved: " + currentRecordingFile);
                }
            } catch (Exception e) {
                logger.error("Error stopping screen recording: " + e.getMessage());
            }
        }
    }
    
    /**
     * Initialize WebDriver before each test class
     */
    @BeforeClass
    public void setUp() {
        logger.info("========================================");
        logger.info("Setting up WebDriver...");
        logger.info("========================================");
        
        String browser = config.getProperty("browser", "chrome").toLowerCase();
        boolean headless = Boolean.parseBoolean(config.getProperty("headless", "false"));
        
        switch (browser) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                if (headless) {
                    firefoxOptions.addArguments("--headless");
                }
                driver = new FirefoxDriver(firefoxOptions);
                break;
                
            case "edge":
                WebDriverManager.edgedriver().setup();
                EdgeOptions edgeOptions = new EdgeOptions();
                if (headless) {
                    edgeOptions.addArguments("--headless");
                }
                driver = new EdgeDriver(edgeOptions);
                break;
                
            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (headless) {
                    chromeOptions.addArguments("--headless");
                }
                chromeOptions.addArguments("--start-maximized");
                chromeOptions.addArguments("--disable-notifications");
                chromeOptions.addArguments("--disable-popup-blocking");
                driver = new ChromeDriver(chromeOptions);
                break;
        }
        
        // Configure timeouts
        int implicitWait = Integer.parseInt(config.getProperty("implicit.wait", "10"));
        int pageLoadTimeout = Integer.parseInt(config.getProperty("page.load.timeout", "30"));
        
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(implicitWait));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(pageLoadTimeout));
        driver.manage().window().maximize();
        
        logger.info("WebDriver initialized successfully with " + browser + " browser");
        
        // Start screen recording
        startScreenRecording();
    }
    
    /**
     * Take screenshot after each test method
     */
    @AfterMethod
    public void captureScreenshot(ITestResult result) {
        String testName = result.getName();
        
        if (result.getStatus() == ITestResult.FAILURE) {
            logger.error("Test FAILED: " + testName);
            if (Boolean.parseBoolean(config.getProperty("screenshot.on.failure", "true"))) {
                takeScreenshot(testName + "_FAILED");
            }
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            logger.info("Test PASSED: " + testName);
            if (Boolean.parseBoolean(config.getProperty("screenshot.on.success", "true"))) {
                takeScreenshot(testName + "_PASSED");
            }
        } else if (result.getStatus() == ITestResult.SKIP) {
            logger.warn("Test SKIPPED: " + testName);
        }
    }
    
    /**
     * Close WebDriver after each test class
     */
    @AfterClass
    public void tearDown() {
        logger.info("========================================");
        logger.info("Tearing down WebDriver...");
        logger.info("========================================");
        
        // Stop screen recording first
        stopScreenRecording();
        
        if (driver != null) {
            driver.quit();
            logger.info("WebDriver closed successfully");
        }
    }
    
    /**
     * Generate test summary after test suite
     */
    @AfterSuite
    public void generateSummary() {
        logger.info("========================================");
        logger.info("Test Suite Execution Completed");
        logger.info("========================================");
    }
    
    /**
     * Take a screenshot and save it with timestamp
     * @param screenshotName Name prefix for the screenshot
     * @return Path to the saved screenshot
     */
    protected String takeScreenshot(String screenshotName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = screenshotName + "_" + timestamp + ".png";
        String filePath = SCREENSHOT_PATH + File.separator + fileName;
        
        try {
            File srcFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            File destFile = new File(filePath);
            FileUtils.copyFile(srcFile, destFile);
            logger.info("Screenshot saved: " + filePath);
            return filePath;
        } catch (IOException e) {
            logger.error("Failed to take screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Create directory if it doesn't exist
     * @param path Directory path
     */
    private void createDirectory(String path) {
        File directory = new File(path);
        if (!directory.exists()) {
            if (directory.mkdirs()) {
                logger.info("Created directory: " + path);
            } else {
                logger.warn("Failed to create directory: " + path);
            }
        }
    }
    
    /**
     * Get the quiz application URL from configuration
     * @return Quiz application URL
     */
    protected String getQuizUrl() {
        return config.getProperty("quiz.url");
    }
    
    /**
     * Sleep for specified milliseconds
     * @param milliseconds Time to sleep
     */
    protected void sleep(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
