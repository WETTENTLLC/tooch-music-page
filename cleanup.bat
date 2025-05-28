@echo off
echo Cleaning up duplicate files...

REM Delete all document*.js files
del "document.js" 2>nul
del "document2.js" 2>nul
del "document3.js" 2>nul
del "document4.js" 2>nul
del "document5.js" 2>nul
del "document6.js" 2>nul
del "document8.js" 2>nul
del "document.addEventListener.js" 2>nul

REM Delete any original JS files that are now in the js/ directory
del "auth.js" 2>nul
del "dashboard.js" 2>nul
del "player.js" 2>nul
del "main.js" 2>nul
del "style.css" 2>nul

echo Cleanup complete. All duplicate files have been removed.
