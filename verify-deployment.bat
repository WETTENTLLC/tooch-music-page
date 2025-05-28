@echo off
setlocal enabledelayedexpansion
echo ================================================
echo 🎵 TOOCH MUSIC PAGE - DEPLOYMENT VERIFICATION
echo ================================================
echo.

set "errors=0"
set "warnings=0"

echo 📁 CHECKING FILE STRUCTURE...
echo --------------------------------

REM Check main HTML file
if exist "index.html" (
    echo [✅] index.html exists
) else (
    echo [❌] index.html missing - CRITICAL ERROR
    set /a errors+=1
)

REM Check CSS directory and files
if exist "css" (
    echo [✅] css directory exists
    if exist "css\style.css" (
        echo [✅] css\style.css exists
    ) else (
        echo [❌] css\style.css missing - CRITICAL ERROR
        set /a errors+=1
    )
) else (
    echo [❌] css directory missing - CRITICAL ERROR
    set /a errors+=1
)

REM Check JS directory and files
if exist "js" (
    echo [✅] js directory exists
    
    set "jsfiles=main.js player.js imageConfig.js musicConfig.js photoBubbles.js simpleBubbles.js"
    for %%f in (!jsfiles!) do (
        if exist "js\%%f" (
            echo [✅] js\%%f exists
        ) else (
            echo [❌] js\%%f missing - CRITICAL ERROR
            set /a errors+=1
        )
    )
) else (
    echo [❌] js directory missing - CRITICAL ERROR
    set /a errors+=1
)

echo.
echo 🔍 CHECKING FILE CONTENTS...
echo -----------------------------

REM Check if HTML references CSS and JS files
findstr /i "style.css" index.html >nul
if !errorlevel! equ 0 (
    echo [✅] HTML references CSS file
) else (
    echo [⚠️] HTML doesn't reference CSS file
    set /a warnings+=1
)

findstr /i "main.js" index.html >nul
if !errorlevel! equ 0 (
    echo [✅] HTML references main.js
) else (
    echo [⚠️] HTML doesn't reference main.js
    set /a warnings+=1
)

REM Check file sizes
echo.
echo 📊 FILE SIZES...
echo -----------------
for %%f in (index.html css\style.css js\*.js) do (
    if exist "%%f" (
        for %%s in ("%%f") do (
            if %%~zs gtr 0 (
                echo [✅] %%f - %%~zs bytes
            ) else (
                echo [❌] %%f - Empty file
                set /a errors+=1
            )
        )
    )
)

echo.
echo 🌐 TESTING LOCAL SERVER...
echo ---------------------------

REM Check if Python is available
python --version >nul 2>&1
if !errorlevel! equ 0 (
    echo [✅] Python available for local testing
    echo [ℹ️] Run: python -m http.server 8000
    echo [ℹ️] Then visit: http://localhost:8000
) else (
    echo [⚠️] Python not available - install Python for local testing
    set /a warnings+=1
)

echo.
echo 📋 DEPLOYMENT SUMMARY
echo =====================

if !errors! equ 0 (
    echo [🎉] SUCCESS: Ready for deployment!
    echo [📂] All required files are present
    echo [📝] File structure is correct
    if !warnings! gtr 0 (
        echo [⚠️] !warnings! warning(s) - check above
    )
    echo.
    echo 🚀 DEPLOYMENT OPTIONS:
    echo ----------------------
    echo 1. GitHub Pages: Run deploy-github.bat
    echo 2. Netlify: Drag folder to netlify.com
    echo 3. Vercel: Upload to vercel.com
    echo 4. Traditional hosting: Upload via FTP
    echo.
    echo 📖 See DEPLOYMENT_CHECKLIST.md for details
) else (
    echo [❌] FAILED: !errors! critical error(s) found
    echo [🔧] Fix the errors above before deployment
    echo.
)

echo.
pause
