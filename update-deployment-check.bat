@echo off
echo Updating deployment check script to include new files...

REM Backup the original file
copy "check-deployment.bat" "check-deployment.bat.bak" >nul
echo Created backup of check-deployment.bat

REM Update the check-deployment.bat file to include photoBubbles.js
powershell -Command "(Get-Content check-deployment.bat) -replace 'if exist \"js\\main.js\"', 'if exist \"js\\main.js\"\n    echo [✓] main.js found\nelse\n    echo [!] main.js missing - required for site functionality\n    goto :error\n)\n\nif exist \"js\\photoBubbles.js\"' | Set-Content check-deployment.bat"

REM Update the check-deployment.bat file to include dropbox folder
powershell -Command "(Get-Content check-deployment.bat) -replace 'echo Checking directory structure...', 'echo Checking directory structure...\nif exist \"dropbox\" (\n    echo [✓] Dropbox directory exists\n) else (\n    echo [!] Dropbox directory missing - create it with mkdir dropbox\n)\n' | Set-Content check-deployment.bat"

echo Deployment check script updated successfully!
echo New files added to check:
echo - js/photoBubbles.js
echo - dropbox/ directory
