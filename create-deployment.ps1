# Tooch Music Page - Create Deployment Package
Write-Host "🎵 Creating Tooch Music Page Deployment Package..." -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Create deployment directory
$deployDir = "tooch-music-page-deployment"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Write-Host "📂 Copying files for deployment..." -ForegroundColor Yellow

# Copy essential files
Copy-Item "index.html" -Destination $deployDir
Copy-Item "css" -Destination $deployDir -Recurse
Copy-Item "js" -Destination $deployDir -Recurse
Copy-Item "dropbox" -Destination $deployDir -Recurse

# Copy documentation
if (Test-Path "README.md") { Copy-Item "README.md" -Destination $deployDir }
if (Test-Path "PRODUCTION_READY.md") { Copy-Item "PRODUCTION_READY.md" -Destination $deployDir }

Write-Host "   ✅ Copied index.html" -ForegroundColor Green
Write-Host "   ✅ Copied css directory" -ForegroundColor Green
Write-Host "   ✅ Copied js directory" -ForegroundColor Green
Write-Host "   ✅ Copied dropbox directory" -ForegroundColor Green
Write-Host "   ✅ Copied documentation" -ForegroundColor Green

# Create zip file
$timestamp = Get-Date -Format "yyyy-MM-dd"
$zipName = "tooch-music-page-$timestamp.zip"

if (Test-Path $zipName) {
    Remove-Item $zipName
}

Write-Host "📦 Creating ZIP package..." -ForegroundColor Yellow
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipName

Write-Host ""
Write-Host "🎉 DEPLOYMENT PACKAGE READY!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host "📁 Deployment folder: $deployDir" -ForegroundColor White
Write-Host "📦 ZIP package: $zipName" -ForegroundColor White

# List contents
Write-Host ""
Write-Host "📊 PACKAGE CONTENTS:" -ForegroundColor Cyan
Get-ChildItem $deployDir -Recurse | Where-Object { !$_.PSIsContainer } | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\$deployDir\", "")
    $size = if ($_.Length -gt 1024) { 
        "{0:N1} KB" -f ($_.Length / 1024) 
    } else { 
        "$($_.Length) bytes" 
    }
    Write-Host "   📄 $relativePath - $size" -ForegroundColor White
}

Write-Host ""
Write-Host "🚀 READY FOR DEPLOYMENT!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host "Choose your deployment method:" -ForegroundColor White
Write-Host "1. Netlify: Go to netlify.com and drag the ZIP file" -ForegroundColor Yellow
Write-Host "2. Vercel: Go to vercel.com and upload the ZIP file" -ForegroundColor Yellow  
Write-Host "3. GitHub Pages: Upload folder contents to GitHub repository" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 See PRODUCTION_READY.md for detailed instructions" -ForegroundColor Cyan
