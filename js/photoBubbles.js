// Photo Bubbles Animation for Tooch Music Page
class PhotoBubbles {
    constructor() {
        this.bubbles = [];
        this.maxBubbles = 5;
        this.isActive = true;
        this.bubbleInterval = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        if (!this.isActive) return;
        
        // Create initial bubble
        this.createBubble();
        
        // Set interval for creating new bubbles
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
        
        console.log('Photo bubbles animation started');
    }

    createBubble() {
        // Get random image
        const imageSrc = this.getRandomImage();
        if (!imageSrc) return;

        // Create bubble element
        const bubble = document.createElement('div');
        bubble.className = 'photo-bubble';
        
        // Random size between 60px and 120px
        const size = 60 + Math.random() * 60;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random horizontal position
        bubble.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        
        // Set background image
        bubble.style.backgroundImage = `url(${imageSrc})`;
        bubble.style.backgroundSize = 'cover';
        bubble.style.backgroundPosition = 'center';
        
        // Add to DOM
        document.body.appendChild(bubble);
        this.bubbles.push(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            this.removeBubble(bubble);
        }, 8000); // Match animation duration
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
    }

    getRandomImage() {
        // Try to get image from imageConfig if available
        if (window.imageConfig && window.imageConfig.floating) {
            const floatingImages = window.imageConfig.floating;
            return floatingImages[Math.floor(Math.random() * floatingImages.length)];
        }
        
        // Fallback to predefined images
        const fallbackImages = [
            'dropbox/floating image.jpg',
            'dropbox/floating image2.jpg', 
            'dropbox/floating image3.jpg',
            'dropbox/Body Image.png'
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
