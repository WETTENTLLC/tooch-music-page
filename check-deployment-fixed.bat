@echo off
echo ==============================================
echo TOOCH MUSIC PAGE - PRE-DEPLOYMENT CHECK
echo ==============================================
echo.

echo Checking directory structure...
if exist "css" (
    echo [✓] CSS directory exists
) else (
    echo [!] CSS directory missing - run organize.bat first
    goto :error
)

if exist "js" (
    echo [✓] JS directory exists
) else (
    echo [!] JS directory missing - run organize.bat first
    goto :error
)

if exist "dropbox" (
    echo [✓] Dropbox directory exists
) else (
    echo [!] Dropbox directory missing - create it with mkdir dropbox
    goto :error
)

echo.
echo Checking required CSS files...
if exist "css\style.css" (
    echo [✓] style.css found
) else (
    echo [!] style.css not found in css directory
    goto :error
)

echo.
echo Checking required JS files...
if exist "js\player.js" (
    echo [✓] player.js found
) else (
    echo [!] player.js missing - required for music player
    goto :error
)

if exist "js\main.js" (
    echo [✓] main.js found
) else (
    echo [!] main.js missing - required for site functionality
    goto :error
)

if exist "js\photoBubbles.js" (
    echo [✓] photoBubbles.js found
) else (
    echo [!] photoBubbles.js missing - required for photo bubbles
    goto :error
)

if exist "js\dashboard.js" (
    echo [✓] dashboard.js found
) else (
    echo [!] dashboard.js missing - required for dashboard
    goto :error
)

if exist "js\auth.js" (
    echo [✓] auth.js found
) else (
    echo [!] auth.js missing - required for login
    goto :error
)

if exist "js\imageConfig.js" (
    echo [✓] imageConfig.js found
) else (
    echo [!] imageConfig.js missing - required for images
    goto :error
)

echo.
echo Checking HTML files...
if exist "index.html" (
    echo [✓] index.html found
) else (
    echo [!] index.html missing - main entry point
    goto :error
)

if exist "dashboard.html" (
    echo [✓] dashboard.html found
) else (
    echo [!] dashboard.html missing
    goto :error
)

if exist "login.html" (
    echo [✓] login.html found
) else (
    echo [!] login.html missing
    goto :error
)

echo.
echo Checking for duplicate files...
set found=0
for %%F in (document*.js) do (
    set found=1
    echo [!] Found %%F - should be removed with cleanup.bat
)

if %found%==0 (
    echo [✓] No duplicate document*.js files found
)

echo.
echo Checking for old files in root...
set found=0
for %%F in (style.css auth.js dashboard.js player.js main.js) do (
    if exist "%%F" (
        set found=1
        echo [!] Found %%F in root directory - should be removed with cleanup.bat
    )
)

if %found%==0 (
    echo [✓] No old files found in root directory
)

echo.
echo Checking dropbox folder...
set count=0
for %%F in (dropbox\*.jpg dropbox\*.png dropbox\*.jpeg dropbox\*.gif) do (
    set /a count+=1
)

if %count% GTR 0 (
    echo [✓] Found %count% images in dropbox folder
) else (
    echo [!] No images found in dropbox folder - run js/downloadSampleImages2.js
    goto :error
)

echo.
echo ==============================================
echo DEPLOYMENT CHECK COMPLETED SUCCESSFULLY!
echo ==============================================
echo.
echo Your project is ready for deployment.
goto :end

:error
echo.
echo ==============================================
echo DEPLOYMENT CHECK FAILED!
echo ==============================================
echo.
echo Please fix the issues above before deployment.

:end
