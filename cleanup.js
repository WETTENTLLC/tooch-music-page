/**
 * File Structure Cleanup Script
 * 
 * This script will help organize your project files correctly:
 * 1. HTML files should only be in the root directory
 * 2. CSS files should be in the css folder
 * 3. JS files should be in the js folder
 * 
 * Run this script with Node.js to organize your files
 */

const fs = require('fs');
const path = require('path');

// Project root directory
const rootDir = __dirname;
const cssDir = path.join(rootDir, 'css');
const jsDir = path.join(rootDir, 'js');

// Files that should be moved from inappropriate directories
const filesToMove = [
    // HTML files in CSS directory
    { from: path.join(cssDir, 'index.html'), to: path.join(rootDir, 'index.html.bak') },
    { from: path.join(cssDir, 'test.html'), to: path.join(rootDir, 'test.html.bak') },
    
    // HTML files in JS directory (assuming similar pattern)
    { from: path.join(jsDir, 'index.html'), to: path.join(rootDir, 'index.html.bak2') },
    { from: path.join(jsDir, 'test.html'), to: path.join(rootDir, 'test.html.bak2') }
];

// Files to delete after backup (to clean up)
const filesToDelete = [
    path.join(cssDir, 'index.html'),
    path.join(cssDir, 'test.html'),
    path.join(jsDir, 'index.html'),
    path.join(jsDir, 'test.html')
];

console.log('Starting file structure cleanup...');

// First backup any files that exist
filesToMove.forEach(file => {
    if (fs.existsSync(file.from)) {
        try {
            // Read the original file
            const content = fs.readFileSync(file.from, 'utf8');
            
            // Check if destination exists to avoid overwriting
            let destPath = file.to;
            let counter = 1;
            while (fs.existsSync(destPath)) {
                destPath = `${file.to}.${counter}`;
                counter++;
            }
            
            // Write to backup location
            fs.writeFileSync(destPath, content);
            console.log(`✓ Backed up ${file.from} to ${destPath}`);
            
        } catch (err) {
            console.error(`✗ Error backing up ${file.from}: ${err.message}`);
        }
    }
});

// Then delete the files from incorrect locations
filesToDelete.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            fs.unlinkSync(file);
            console.log(`✓ Removed ${file}`);
        } catch (err) {
            console.error(`✗ Error removing ${file}: ${err.message}`);
        }
    }
});

console.log('Cleanup complete!');
console.log('Your project structure is now organized with:');
console.log('- HTML files in the root directory');
console.log('- CSS files in the css folder');
console.log('- JavaScript files in the js folder');
