@echo off
echo Starting organization process...

REM Create directories if they don't exist
mkdir css 2>nul
mkdir js 2>nul

REM Clear existing directories to avoid outdated files
del /Q "css\*.*" 2>nul
del /Q "js\*.*" 2>nul

REM First handle CSS files
if exist "style.css" (
    copy "style.css" "css\style.css" >nul
    echo Copied style.css to css directory
) else (
    echo WARNING: style.css not found in root directory
)

REM Handle JS files - check both original names and document*.js files
REM Player JS
if exist "player.js" (
    copy "player.js" "js\player.js" >nul
    echo Copied player.js
) else if exist "document3.js" (
    copy "document3.js" "js\player.js" >nul
    echo Renamed document3.js to player.js
) else if exist "document6.js" (
    copy "document6.js" "js\player.js" >nul
    echo Renamed document6.js to player.js
) else (
    echo WARNING: Could not find player.js or equivalent
)

REM Main JS
if exist "main.js" (
    copy "main.js" "js\main.js" >nul
    echo Copied main.js
) else if exist "document.addEventListener.js" (
    copy "document.addEventListener.js" "js\main.js" >nul
    echo Renamed document.addEventListener.js to main.js
) else if exist "document8.js" (
    copy "document8.js" "js\main.js" >nul
    echo Renamed document8.js to main.js
) else (
    echo WARNING: Could not find main.js or equivalent
)

REM Dashboard JS
if exist "dashboard.js" (
    copy "dashboard.js" "js\dashboard.js" >nul
    echo Copied dashboard.js
) else if exist "document2.js" (
    copy "document2.js" "js\dashboard.js" >nul
    echo Renamed document2.js to dashboard.js
) else if exist "document5.js" (
    copy "document5.js" "js\dashboard.js" >nul
    echo Renamed document5.js to dashboard.js
) else (
    echo WARNING: Could not find dashboard.js or equivalent
)

REM Auth JS
if exist "auth.js" (
    copy "auth.js" "js\auth.js" >nul
    echo Copied auth.js
) else if exist "document.js" (
    copy "document.js" "js\auth.js" >nul
    echo Renamed document.js to auth.js
) else if exist "document4.js" (
    copy "document4.js" "js\auth.js" >nul
    echo Renamed document4.js to auth.js
) else (
    echo WARNING: Could not find auth.js or equivalent
)

echo.
echo Directory structure organized successfully!
echo Please restart your web server and clear browser cache.
