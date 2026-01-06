@echo off
REM Quick Start Script - Runs PHP development server
echo ========================================
echo   Quiz Application - Quick Start
echo ========================================
echo.

REM Check if PHP is installed
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] PHP is not installed or not in PATH
    echo.
    echo Please install PHP first:
    echo   1. Download XAMPP from: https://www.apachefriends.org/
    echo   OR
    echo   2. Download PHP from: https://windows.php.net/download/
    echo.
    echo After installation, add PHP to your system PATH
    pause
    exit /b 1
)

echo Starting PHP development server...
echo.
echo Quiz Application will be available at:
echo   http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0quiz-app"
php -S localhost:8080 server.php
