@echo off
echo ===================================================
echo TOOCH MUSIC PAGE - CREATING DEPLOYMENT PACKAGE
echo ===================================================
echo.

echo Creating deployment directory...
if exist "tooch-music-page-deployment" rmdir /s /q "tooch-music-page-deployment"
mkdir "tooch-music-page-deployment"

echo Copying essential files...
copy "index.html" "tooch-music-page-deployment\"
xcopy "css" "tooch-music-page-deployment\css\" /e /i /q
xcopy "js" "tooch-music-page-deployment\js\" /e /i /q
xcopy "dropbox" "tooch-music-page-deployment\dropbox\" /e /i /q

echo Copying documentation...
if exist "README.md" copy "README.md" "tooch-music-page-deployment\"
if exist "PRODUCTION_READY.md" copy "PRODUCTION_READY.md" "tooch-music-page-deployment\"
if exist "DEPLOYMENT_CHECKLIST.md" copy "DEPLOYMENT_CHECKLIST.md" "tooch-music-page-deployment\"

echo.
echo [SUCCESS] Deployment package created!
echo =====================================
echo.
echo Folder: tooch-music-page-deployment
echo.
echo READY FOR DEPLOYMENT:
echo ---------------------
echo 1. Netlify: Drag the folder to netlify.com
echo 2. Vercel: Upload the folder to vercel.com  
echo 3. GitHub Pages: Upload contents to GitHub repository
echo 4. Traditional hosting: Upload via FTP to web host
echo.
echo Files included:
dir "tooch-music-page-deployment" /b
echo.
echo See PRODUCTION_READY.md for detailed instructions
echo.
pause
