// Test script to manually create bubbles
console.log('Loading bubble test script...');

// Wait for page to load
window.addEventListener('load', () => {
    console.log('Page loaded, testing bubbles...');
    
    // Test 1: Check if PhotoBubbles class exists
    if (typeof PhotoBubbles !== 'undefined') {
        console.log('✓ PhotoBubbles class is available');
        
        // Test 2: Create instance
        try {
            const testBubbles = new PhotoBubbles();
            console.log('✓ PhotoBubbles instance created');
            
            // Test 3: Force create a visible bubble
            setTimeout(() => {
                console.log('Creating manual test bubble...');
                testBubbles.createBubble();
            }, 2000);
            
        } catch (error) {
            console.error('✗ Error creating PhotoBubbles:', error);
        }
    } else {
        console.error('✗ PhotoBubbles class not found');
    }
    
    // Test 4: Check if imageConfig is loaded
    if (window.imageConfig) {
        console.log('✓ imageConfig loaded with', window.imageConfig.floating.length, 'images');
    } else {
        console.error('✗ imageConfig not loaded');
    }
    
    // Test 5: Manually create a simple bubble to verify visibility
    setTimeout(() => {
        console.log('Creating manual test bubble with direct styling...');
        const testBubble = document.createElement('div');
        testBubble.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: url('dropbox/tooch-press.jpg') center/cover;
            border: 3px solid #ff0000;
            top: 50%;
            left: 50%;
            z-index: 9999;
            opacity: 1;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(testBubble);
        
        setTimeout(() => {
            if (testBubble.parentNode) {
                testBubble.remove();
                console.log('Test bubble removed');
            }
        }, 5000);
    }, 3000);
});
