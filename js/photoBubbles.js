// Photo Bubbles Animation for Tooch Magooch Music Page
class PhotoBubbles {
    constructor() {
        this.bubbles = [];
        this.maxBubbles = 8; // Increased for more visual impact
        this.isActive = true;
        this.bubbleInterval = null;
        this.sizes = [
            { min: 50, max: 80 },   // Small bubbles
            { min: 80, max: 120 },  // Medium bubbles
            { min: 120, max: 180 }, // Large bubbles
            { min: 180, max: 220 }  // Extra large bubbles
        ];        this.debugMode = true; // Debug mode flag - enabled for testing
        this.usedImages = new Set(); // Track used images in debug mode
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }    start() {
        if (!this.isActive) return;
        
        console.log('PhotoBubbles: Starting animation...');
        
        // Detect device capabilities and adjust settings
        const deviceSettings = this.detectDevice();
        this.sizes = deviceSettings.sizes;
        
        console.log('PhotoBubbles: Device settings:', deviceSettings);
        
        // Create initial bubble
        this.createBubble();        // Set interval for creating new bubbles based on device
        const intervalMin = 800; // Much faster for more bubbles
        const intervalMax = 2000;
        
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, intervalMin + Math.random() * (intervalMax - intervalMin));
        
        console.log('Photo bubbles animation started with', this.maxBubbles, 'max bubbles');
    }    createBubble() {
        // Get random image
        const imageSrc = this.getRandomImage();
        if (!imageSrc) {
            console.error('PhotoBubbles: No image source available');
            return;
        }
        
        console.log('PhotoBubbles: Creating bubble with image:', imageSrc);        // Create bubble element
        const bubble = document.createElement('div');
        bubble.className = 'photo-bubble';
        
        // Random size selection from predefined ranges
        const sizeRange = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        const size = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random horizontal position (keeping bubbles within viewport)
        const maxLeft = window.innerWidth - size;
        bubble.style.left = `${Math.random() * maxLeft}px`;          // Start from bottom of screen for animation
        bubble.style.top = `${window.innerHeight + size}px`;
        
        // Force high visibility for testing
        bubble.style.position = 'fixed';
        bubble.style.zIndex = '9999';
        bubble.style.opacity = '1';
        bubble.style.border = '3px solid #ff0000';  // Red border for visibility
        
        // Create inner image container for better control
        const imageContainer = document.createElement('div');
        imageContainer.className = 'bubble-image-container';
        imageContainer.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
        `;
          // Create image element
        const img = document.createElement('img');
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        `;
        img.src = imageSrc;
        
        // Handle image load errors - use colored background as fallback
        img.onerror = () => {
            console.warn(`Failed to load bubble image: ${imageSrc}, using color fallback`);
            imageContainer.style.background = `linear-gradient(45deg, #667eea, #764ba2)`;
            img.style.display = 'none';
        };
        
        // Debug mode logging
        if (this.debugMode) {
            this.usedImages.add(imageSrc);
            console.log(`Bubble created with image: ${imageSrc}`);
            img.onload = () => {
                console.log(`Successfully loaded: ${imageSrc}`);
            };
        }
        
        // Assemble bubble
        imageContainer.appendChild(img);
        bubble.appendChild(imageContainer);
          // Add random transparency variation while maintaining bubble effect
        const opacity = 0.8 + Math.random() * 0.2; // Range: 0.8 to 1.0 (more visible)
        bubble.style.setProperty('--bubble-opacity', opacity);
        
        // Make bubbles more visible for testing
        bubble.style.border = '3px solid rgba(255, 255, 255, 0.5)';
        bubble.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        
        // Add random rotation for visual variety
        const rotation = Math.random() * 360;
        bubble.style.setProperty('--bubble-rotation', `${rotation}deg`);
        
        // Add to DOM
        document.body.appendChild(bubble);
        this.bubbles.push(bubble);
          // Remove bubble after animation completes
        setTimeout(() => {
            this.removeBubble(bubble);
        }, 20000); // Much longer duration for testing (20 seconds)
    }

    removeBubble(bubble) {
        if (bubble && bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
        
        // Remove from array
        const index = this.bubbles.indexOf(bubble);
        if (index > -1) {
            this.bubbles.splice(index, 1);
        }
    }    getRandomImage() {
        // Try to get image from imageConfig if available
        if (window.imageConfig && window.imageConfig.floating) {
            const floatingImages = window.imageConfig.floating;
            console.log('PhotoBubbles: Using imageConfig with', floatingImages.length, 'images');
            return floatingImages[Math.floor(Math.random() * floatingImages.length)];
        }
        
        console.log('PhotoBubbles: imageConfig not available, using fallback images');
        
        // Enhanced fallback to images that exist on your site
        const fallbackImages = [
            'dropbox/tooch-press.jpg',
            'dropbox/tooch5.jpg',
            'dropbox/tooch7.jpg',
            'dropbox/floating image2.jpg',
            'dropbox/tooch-gallery-1.jpg',
            'dropbox/tooch-gallery-2.jpg',
            'dropbox/tooch-gallery-3.jpg',
            'dropbox/tooch-gallery-4.jpg',
            'dropbox/media2/media1.jpg',
            'dropbox/media2/media2.jpg',
            'dropbox/media2/media3.jpg',
            'dropbox/Merch/Merch1.JPG',
            'dropbox/tour-image.JPG'
        ];
        
        return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }

    stop() {
        this.isActive = false;
        
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
            this.bubbleInterval = null;
        }
        
        // Clean up existing bubbles
        this.bubbles.forEach(bubble => {
            if (bubble && bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        });
        this.bubbles = [];
        
        console.log('Photo bubbles animation stopped');
    }

    pause() {
        this.isActive = false;
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
            this.bubbleInterval = null;
        }
    }

    resume() {
        if (!this.isActive) {
            this.isActive = true;
            this.start();
        }
    }

    // Adjust bubble frequency based on user interaction
    adjustFrequency(multiplier = 1) {
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
        }
        
        const baseInterval = 3000;
        const randomVariation = 2000;
        const newInterval = (baseInterval / multiplier) + Math.random() * (randomVariation / multiplier);
        
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, newInterval);
    }

    // Increase bubble activity when music is playing
    musicMode(isPlaying) {
        if (isPlaying) {
            this.maxBubbles = 8;
            this.adjustFrequency(1.5); // More frequent bubbles
        } else {
            this.maxBubbles = 5;
            this.adjustFrequency(1); // Normal frequency
        }
   }

    // Detect device type and adjust settings
    detectDevice() {
        const isMobile = window.innerWidth <= 768;
        const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        
        if (isMobile || isLowEnd) {
            this.maxBubbles = 4;
            return { 
                interval: { min: 4000, max: 6000 }, // Slower on mobile
                sizes: [
                    { min: 40, max: 60 },   // Smaller bubbles
                    { min: 60, max: 90 },
                    { min: 90, max: 120 }
                ]
            };
        }
        
        return {
            interval: { min: 2000, max: 5000 },
            sizes: this.sizes
        };
    }

    // Debug mode to track which images are being used
    enableDebugMode() {
        this.debugMode = true;
        this.usedImages = new Set();
        console.log('Photo bubbles debug mode enabled');
    }

    // Log used images (for debug mode)
    logUsedImages() {
        if (this.debugMode) {
            console.log('Used bubble images:', Array.from(this.usedImages));
        }
    }
}

// Enhanced bubble effects
class BubbleEffects {
    static addGlowEffect(bubble) {
        bubble.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        bubble.style.filter = 'brightness(1.1)';
    }

    static addParticleTrail(bubble) {
        const trail = document.createElement('div');
        trail.className = 'bubble-trail';
        trail.style.position = 'absolute';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'rgba(255, 255, 255, 0.8)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '4';
        
        // Position trail behind bubble
        const bubbleRect = bubble.getBoundingClientRect();
        trail.style.left = `${bubbleRect.left + bubbleRect.width / 2}px`;
        trail.style.top = `${bubbleRect.top + bubbleRect.height}px`;
        
        document.body.appendChild(trail);
        
        // Animate trail
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }

    static addClickInteraction(bubble) {
        bubble.style.cursor = 'pointer';
        bubble.addEventListener('click', function() {
            // Create burst effect
            BubbleEffects.createBurstEffect(this);
            
            // Remove bubble immediately
            if (this.parentNode) {
                this.style.animation = 'bubblePop 0.3s ease-out forwards';
                setTimeout(() => {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                }, 300);
            }
        });
    }

    static createBurstEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple small particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'bubble-particle';
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = 'rgba(255, 255, 255, 0.9)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10';
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            document.body.appendChild(particle);
            
            // Animate particle outward
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
}

// Add CSS for bubble pop animation
const bubbleStyles = document.createElement('style');
bubbleStyles.textContent = `
    @keyframes bubblePop {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(0); opacity: 0; }
    }
    
    .photo-bubble:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(bubbleStyles);

// Initialize photo bubbles
let photoBubbles;

function initializePhotoBubbles() {
    photoBubbles = new PhotoBubbles();
    
    // Listen for music events to adjust bubble behavior
    if (window.musicConfig) {
        // Override the play/pause functions to adjust bubbles
        const originalTogglePlayPause = window.togglePlayPause;
        if (originalTogglePlayPause) {
            window.togglePlayPause = function() {
                originalTogglePlayPause();
                if (photoBubbles) {
                    photoBubbles.musicMode(window.musicConfig.isPlaying);
                }
            };
        }
    }
    
    // Pause bubbles when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (photoBubbles) {
            if (document.hidden) {
                photoBubbles.pause();
            } else {
                photoBubbles.resume();
            }
        }
    });
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePhotoBubbles);
} else {
    initializePhotoBubbles();
}

// Export for global access
window.PhotoBubbles = PhotoBubbles;
window.BubbleEffects = BubbleEffects;
window.photoBubbles = photoBubbles;
