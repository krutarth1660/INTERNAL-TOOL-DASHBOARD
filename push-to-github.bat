@echo off
echo ========================================
echo  Push to GitHub - Quick Script
echo ========================================
echo.

REM Configure Git
echo Step 1: Configuring Git...
git config --global user.email "krutarthvisavadiya@gmail.com"
git config --global user.name "Krutarth Visavadiya"
echo ✓ Git configured
echo.

REM Initialize Git (if not already)
echo Step 2: Initializing Git repository...
git init
echo ✓ Git initialized
echo.

REM Add all files
echo Step 3: Adding files...
git add .
echo ✓ Files added
echo.

REM Show status
echo Step 4: Checking status...
git status
echo.

REM Create commit
echo Step 5: Creating commit...
git commit -m "Initial commit - Internal Tool Dashboard with Payload CMS and Next.js"
echo ✓ Commit created
echo.

REM Add remote (you need to create repository on GitHub first!)
echo Step 6: Adding remote repository...
echo.
echo IMPORTANT: Before running this, create a repository on GitHub:
echo 1. Go to https://github.com/new
echo 2. Repository name: internal-tool-dashboard
echo 3. Make it Private
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.
set /p CONTINUE="Have you created the repository? (y/n): "
if /i "%CONTINUE%" NEQ "y" (
    echo.
    echo Please create the repository first, then run this script again.
    pause
    exit /b
)

git remote add origin https://github.com/krutarthvisavadiya/internal-tool-dashboard.git
echo ✓ Remote added
echo.

REM Rename branch to main
echo Step 7: Renaming branch to main...
git branch -M main
echo ✓ Branch renamed
echo.

REM Push to GitHub
echo Step 8: Pushing to GitHub...
echo.
echo You may be prompted for credentials:
echo - Username: krutarthvisavadiya
echo - Password: Use Personal Access Token (not your GitHub password)
echo.
echo To create a token:
echo 1. Go to https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Select "repo" scope
echo 4. Copy the token and use it as password
echo.
pause

git push -u origin main

echo.
echo ========================================
echo  ✓ Done!
echo ========================================
echo.
echo Your project is now on GitHub!
echo Visit: https://github.com/krutarthvisavadiya/internal-tool-dashboard
echo.
pause
