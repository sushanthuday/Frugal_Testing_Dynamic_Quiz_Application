@echo off
REM Run Selenium Tests Script
echo ========================================
echo   Running Selenium Tests
echo ========================================
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Maven is not installed or not in PATH
    echo.
    echo Please install Maven first:
    echo   1. Download from: https://maven.apache.org/download.cgi
    echo   2. Extract to C:\maven
    echo   3. Add C:\maven\bin to your system PATH
    echo.
    pause
    exit /b 1
)

REM Check if Java is installed
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java is not installed or not in PATH
    echo.
    echo Please install Java JDK 11+ first:
    echo   Download from: https://adoptium.net/temurin/releases/
    echo.
    pause
    exit /b 1
)

echo Make sure the Quiz Application is running at http://localhost:8080
echo (Run start-server.bat in another terminal window)
echo.
pause

echo.
echo Running tests...
echo.

cd /d "%~dp0selenium-tests"
mvn clean test

echo.
echo ========================================
echo   Test Execution Complete
echo ========================================
echo.
echo Check the following for results:
echo   - Console output above
echo   - selenium-tests\test-output\ (TestNG reports)
echo   - selenium-tests\screenshots\ (Captured screenshots)
echo   - selenium-tests\logs\ (Log files)
echo.

pause
