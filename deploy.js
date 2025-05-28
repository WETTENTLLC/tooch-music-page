/**
 * Simple deployment preparation script
 * Run using Node.js: node deploy.js
 */
const fs = require('fs');
const path = require('path');

// Create deploy directory
const deployDir = path.join(__dirname, 'deploy');
if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
}

// Copy all necessary files to deploy directory
function copyFiles(sourceDir, targetDir, exclude = []) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const items = fs.readdirSync(sourceDir);
    
    for (const item of items) {
        // Skip excluded items and deploy directory itself
        if (exclude.includes(item) || item === 'deploy') continue;
        
        const sourcePath = path.join(sourceDir, item);
        const targetPath = path.join(targetDir, item);
        
        const stats = fs.statSync(sourcePath);
        
        if (stats.isDirectory()) {
            copyFiles(sourcePath, targetPath, exclude);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

// Files/folders to exclude from deployment
const excludeList = [
    'node_modules',
    '.git',
    'deploy.js',
    'cleanup.js',
    '.DS_Store',
    'Thumbs.db'
];

// Copy everything except excluded files
console.log('Preparing files for deployment...');
copyFiles(__dirname, deployDir, excludeList);

console.log('Deployment files ready! Your website is prepared in the "deploy" folder.');
console.log('Next steps:');
console.log('1. Go to https://app.netlify.com/drop');
console.log('2. Drag and drop the "deploy" folder to the Netlify Drop area');
console.log('3. Wait a few seconds for your site to be live!');
