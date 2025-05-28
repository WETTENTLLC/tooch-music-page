# Tooch Music Page - Create Deployment Package
Write-Host "🎵 Creating Tooch Music Page Deployment Package..." -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Define files to include in deployment package
$deploymentFiles = @(
    "index.html",
    "css",
    "js",
    "dropbox",
    "README.md",
    "PRODUCTION_READY.md",
    "DEPLOYMENT_CHECKLIST.md",
    "NETLIFY_DEPLOY.md"
)

# Create deployment directory
$deployDir = ".\tooch-music-page-deployment"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Write-Host "📂 Copying files for deployment..." -ForegroundColor Yellow

# Copy files
foreach ($item in $deploymentFiles) {
    if (Test-Path $item) {
        if (Test-Path $item -PathType Container) {
            Copy-Item $item -Destination $deployDir -Recurse
            Write-Host "   ✅ Copied directory: $item" -ForegroundColor Green
        } else {
            Copy-Item $item -Destination $deployDir
            Write-Host "   ✅ Copied file: $item" -ForegroundColor Green
        }
    } else {
        Write-Host "   ⚠️  File not found: $item" -ForegroundColor Yellow
    }
}

# Create zip file for easy deployment
$zipName = "tooch-music-page-$(Get-Date -Format 'yyyy-MM-dd').zip"
if (Test-Path $zipName) {
    Remove-Item $zipName
}

Write-Host "📦 Creating ZIP package: $zipName" -ForegroundColor Yellow
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipName

Write-Host ""
Write-Host "🎉 DEPLOYMENT PACKAGE READY!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host "📁 Deployment folder: $deployDir" -ForegroundColor White
Write-Host "📦 ZIP package: $zipName" -ForegroundColor White
Write-Host ""
Write-Host "🚀 QUICK DEPLOYMENT OPTIONS:" -ForegroundColor Cyan
Write-Host "1. Netlify: Drag $zipName to netlify.com" -ForegroundColor White
Write-Host "2. Vercel: Upload $zipName to vercel.com" -ForegroundColor White
Write-Host "3. GitHub: Upload contents of $deployDir to repository" -ForegroundColor White
Write-Host ""
Write-Host "📖 See PRODUCTION_READY.md for detailed instructions" -ForegroundColor Yellow

# Show file summary
Write-Host ""
Write-Host "📊 PACKAGE CONTENTS:" -ForegroundColor Cyan
Get-ChildItem $deployDir -Recurse | Where-Object { !$_.PSIsContainer } | 
    Sort-Object Length -Descending | 
    ForEach-Object { 
        $size = if ($_.Length -gt 1024) { "{0:N1} KB" -f ($_.Length / 1024) } else { "$($_.Length) bytes" }
        Write-Host "   📄 $($_.Name) - $size" -ForegroundColor White
    }

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
