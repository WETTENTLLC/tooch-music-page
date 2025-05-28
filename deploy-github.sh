#!/bin/bash
# GitHub Pages Deployment Script for Tooch Music Page

echo "🎵 Tooch Music Page - GitHub Pages Deployment"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📂 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Tooch Music Page - Complete production build with animations and music player"

# Check if origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 GitHub repository URL needed for deployment"
    echo "Please run these commands manually:"
    echo ""
    echo "1. Create a new repository on GitHub.com"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "3. Run: git branch -M main"
    echo "4. Run: git push -u origin main"
    echo "5. Enable GitHub Pages in repository settings"
    echo ""
else
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
    echo "✅ Deployment complete!"
    echo ""
    echo "🌐 Your site will be available at:"
    echo "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Scroll down to 'Pages' section"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Choose 'main' branch and '/ (root)'"
    echo "5. Click 'Save'"
fi
