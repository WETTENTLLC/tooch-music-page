@echo off
echo 🎵 Tooch Music Page - GitHub Pages Deployment
echo ==============================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
    echo.
)

REM Add all files
echo 📂 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Deploy Tooch Music Page - Complete production build with animations and music player"

REM Check if origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🔗 GitHub repository URL needed for deployment
    echo Please follow these steps:
    echo.
    echo 1. Create a new repository on GitHub.com
    echo 2. Copy the repository URL
    echo 3. Run: git remote add origin YOUR_REPO_URL
    echo 4. Run: git branch -M main
    echo 5. Run: git push -u origin main
    echo 6. Enable GitHub Pages in repository settings
    echo.
    echo Example:
    echo git remote add origin https://github.com/yourusername/tooch-music-page.git
    echo.
) else (
    echo 🚀 Pushing to GitHub...
    git push -u origin main
    echo ✅ Deployment complete!
    echo.
    echo 🌐 Your site will be available at:
    echo https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
    echo.
    echo 📋 Next steps:
    echo 1. Go to your GitHub repository settings
    echo 2. Scroll down to 'Pages' section
    echo 3. Select 'Deploy from a branch'
    echo 4. Choose 'main' branch and '/ (root)'
    echo 5. Click 'Save'
)

echo.
pause
