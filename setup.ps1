# Quiz Application Setup Script for Windows
# This script helps download and configure all dependencies

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Quiz Application Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Function to download file
function Download-File {
    param($Url, $OutputPath)
    try {
        Write-Host "Downloading from $Url..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath -UseBasicParsing
        return $true
    } catch {
        Write-Host "Failed to download: $_" -ForegroundColor Red
        return $false
    }
}

# Create downloads folder
$downloadDir = "$PSScriptRoot\downloads"
if (!(Test-Path $downloadDir)) {
    New-Item -ItemType Directory -Path $downloadDir | Out-Null
}

Write-Host "Checking dependencies..." -ForegroundColor Green
Write-Host ""

# ============================================
# 1. Check PHP
# ============================================
Write-Host "1. Checking PHP..." -ForegroundColor Cyan
if (Test-Command "php") {
    $phpVersion = php -v 2>$null | Select-Object -First 1
    Write-Host "   [OK] PHP is installed: $phpVersion" -ForegroundColor Green
} else {
    Write-Host "   [MISSING] PHP is not installed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To install PHP:" -ForegroundColor White
    Write-Host "   Option 1 (Recommended): Use XAMPP" -ForegroundColor White
    Write-Host "      Download from: https://www.apachefriends.org/download.html" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option 2: Install PHP directly" -ForegroundColor White
    Write-Host "      1. Download from: https://windows.php.net/download/" -ForegroundColor Gray
    Write-Host "      2. Extract to C:\php" -ForegroundColor Gray
    Write-Host "      3. Add C:\php to your PATH environment variable" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option 3: Use Chocolatey (if installed)" -ForegroundColor White
    Write-Host "      Run: choco install php" -ForegroundColor Gray
    Write-Host ""
    
    $installChoice = Read-Host "Would you like to open PHP download page? (y/n)"
    if ($installChoice -eq "y") {
        Start-Process "https://windows.php.net/download/"
    }
}
Write-Host ""

# ============================================
# 2. Check Java
# ============================================
Write-Host "2. Checking Java..." -ForegroundColor Cyan
if (Test-Command "java") {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "   [OK] Java is installed: $javaVersion" -ForegroundColor Green
} else {
    Write-Host "   [MISSING] Java is not installed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To install Java (required for Selenium tests):" -ForegroundColor White
    Write-Host "   Option 1 (Recommended): Download OpenJDK" -ForegroundColor White
    Write-Host "      Download from: https://adoptium.net/temurin/releases/" -ForegroundColor Gray
    Write-Host "      Choose: Windows x64, JDK 17 or higher" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option 2: Use Chocolatey (if installed)" -ForegroundColor White
    Write-Host "      Run: choco install openjdk17" -ForegroundColor Gray
    Write-Host ""
    
    $installChoice = Read-Host "Would you like to open Java download page? (y/n)"
    if ($installChoice -eq "y") {
        Start-Process "https://adoptium.net/temurin/releases/"
    }
}
Write-Host ""

# ============================================
# 3. Check Maven
# ============================================
Write-Host "3. Checking Maven..." -ForegroundColor Cyan
if (Test-Command "mvn") {
    $mvnVersion = mvn -v 2>$null | Select-Object -First 1
    Write-Host "   [OK] Maven is installed: $mvnVersion" -ForegroundColor Green
} else {
    Write-Host "   [MISSING] Maven is not installed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To install Maven (required for Selenium tests):" -ForegroundColor White
    Write-Host "   Option 1: Manual installation" -ForegroundColor White
    Write-Host "      1. Download from: https://maven.apache.org/download.cgi" -ForegroundColor Gray
    Write-Host "      2. Extract to C:\maven" -ForegroundColor Gray
    Write-Host "      3. Add C:\maven\bin to your PATH" -ForegroundColor Gray
    Write-Host "      4. Set MAVEN_HOME=C:\maven" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Option 2: Use Chocolatey (if installed)" -ForegroundColor White
    Write-Host "      Run: choco install maven" -ForegroundColor Gray
    Write-Host ""
    
    $installChoice = Read-Host "Would you like to open Maven download page? (y/n)"
    if ($installChoice -eq "y") {
        Start-Process "https://maven.apache.org/download.cgi"
    }
}
Write-Host ""

# ============================================
# 4. Check Chrome
# ============================================
Write-Host "4. Checking Google Chrome..." -ForegroundColor Cyan
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$chromeInstalled = $false
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromeInstalled = $true
        Write-Host "   [OK] Chrome is installed at: $path" -ForegroundColor Green
        break
    }
}
if (!$chromeInstalled) {
    Write-Host "   [MISSING] Chrome is not installed" -ForegroundColor Yellow
    Write-Host "   Download from: https://www.google.com/chrome/" -ForegroundColor Gray
    Write-Host "   Note: ChromeDriver will be auto-downloaded by WebDriverManager" -ForegroundColor Gray
}
Write-Host ""

# ============================================
# 5. Install Selenium Dependencies (if Maven is available)
# ============================================
Write-Host "5. Selenium Test Dependencies..." -ForegroundColor Cyan
$seleniumTestsDir = "$PSScriptRoot\selenium-tests"
if (Test-Path $seleniumTestsDir) {
    if (Test-Command "mvn") {
        Write-Host "   Installing Maven dependencies..." -ForegroundColor Yellow
        Push-Location $seleniumTestsDir
        mvn dependency:resolve -q
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   [OK] Maven dependencies installed successfully" -ForegroundColor Green
        } else {
            Write-Host "   [WARN] Some dependencies may have failed to install" -ForegroundColor Yellow
        }
        Pop-Location
    } else {
        Write-Host "   [SKIP] Maven not installed, skipping dependency installation" -ForegroundColor Yellow
    }
} else {
    Write-Host "   [SKIP] selenium-tests folder not found" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# Summary
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "To run the Quiz Application:" -ForegroundColor Green
Write-Host "   1. Open terminal in the quiz-app folder" -ForegroundColor White
Write-Host "   2. Run: php -S localhost:8080 server.php" -ForegroundColor Yellow
Write-Host "   3. Open browser: http://localhost:8080" -ForegroundColor White
Write-Host ""

Write-Host "To run Selenium Tests:" -ForegroundColor Green
Write-Host "   1. Make sure the quiz app is running (step above)" -ForegroundColor White
Write-Host "   2. Open terminal in the selenium-tests folder" -ForegroundColor White
Write-Host "   3. Run: mvn test" -ForegroundColor Yellow
Write-Host ""

Write-Host "Alternative (without PHP - static files only):" -ForegroundColor Green
Write-Host "   Simply open quiz-app\index.html in your browser" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Quick Start Commands" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Start PHP server:" -ForegroundColor Gray
Write-Host "cd `"$PSScriptRoot\quiz-app`"; php -S localhost:8080 server.php" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Run Selenium tests:" -ForegroundColor Gray
Write-Host "cd `"$PSScriptRoot\selenium-tests`"; mvn test" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to exit"
