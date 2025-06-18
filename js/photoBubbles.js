// Photo Bubbles Animation for Tooch Magooch Music Page - Empty Gradient Bubbles
class PhotoBubbles {
    constructor() {
        this.bubbles = [];
        this.maxBubbles = 8;
        this.isActive = true;
        this.bubbleInterval = null;
        this.sizes = [
            { min: 50, max: 80 },   // Small bubbles
            { min: 80, max: 120 },  // Medium bubbles
            { min: 120, max: 180 }, // Large bubbles
            { min: 180, max: 220 }  // Extra large bubbles
        ];
        this.debugMode = false;
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
        
        console.log('PhotoBubbles: Starting gradient bubble animation...');
        
        // Detect device capabilities and adjust settings
        const deviceSettings = this.detectDevice();
        this.sizes = deviceSettings.sizes;
        
        // Create initial bubble
        this.createBubble();
        
        // Set interval for creating new bubbles
        const intervalMin = 800;
        const intervalMax = 2000;
        
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, intervalMin + Math.random() * (intervalMax - intervalMin));
        
        console.log('Gradient bubbles animation started with', this.maxBubbles, 'max bubbles');
    }

    createBubble() {
        console.log('PhotoBubbles: Creating gradient bubble');

        // Create bubble element
        const bubble = document.createElement('div');
        bubble.className = 'photo-bubble';
        
        // Random size selection from predefined ranges
        const sizeRange = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        const size = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);
        
        // Random horizontal position (keeping bubbles within viewport)
        const maxLeft = window.innerWidth - size;
        const startX = Math.random() * maxLeft;
        
        // Generate bubble properties
        const properties = this.generateBubbleProperties(size);
        
        // Apply styles for gradient bubble
        Object.assign(bubble.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${startX}px`,
            bottom: '-200px', // Start below viewport
            position: 'fixed',
            zIndex: properties.zIndex,
            borderRadius: '50%',
            opacity: properties.opacity,
            transform: `rotate(${properties.rotation}deg)`,
            background: `
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%),
                linear-gradient(135deg, 
                    rgba(255, 107, 157, 0.4) 0%, 
                    rgba(196, 69, 105, 0.3) 50%, 
                    rgba(108, 92, 231, 0.4) 100%)
            `,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(255, 107, 157, 0.2)',
            animation: `bubbleFloat ${properties.duration}s linear`,
            '--bubble-opacity': properties.opacity,
            '--bubble-rotation': `${properties.rotation}deg`
        });
        
        // Add to DOM
        document.body.appendChild(bubble);
        this.bubbles.push(bubble);
        
        // Auto-remove bubble after animation
        setTimeout(() => {
            this.removeBubble(bubble);
        }, properties.duration * 1000);
        
        // Debug info
        if (this.debugMode) {
            console.log('PhotoBubbles: Created gradient bubble:', {
                size: `${size}px`,
                duration: `${properties.duration}s`,
                startX: startX,
                zIndex: properties.zIndex,
                opacity: properties.opacity,
                rotation: properties.rotation,
                activeBubbles: this.bubbles.length
            });
        }
    }

    generateBubbleProperties(size) {
        // Generate random properties for each bubble
        const duration = 12 + Math.random() * 8; // 12-20 seconds
        const opacity = 0.6 + Math.random() * 0.3; // 0.6-0.9
        const rotation = Math.random() * 360; // 0-360 degrees
        const zIndex = Math.floor(Math.random() * 10) + 5; // 5-14
        
        return {
            duration,
            opacity,
            rotation,
            zIndex
        };
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

    detectDevice() {
        const isMobile = window.innerWidth <= 768;
        const isLowEnd = navigator.hardwareConcurrency <= 2;
        
        if (isMobile || isLowEnd) {
            return {
                sizes: [
                    { min: 30, max: 60 },   // Smaller bubbles for mobile
                    { min: 60, max: 100 },
                    { min: 100, max: 140 }
                ],
                maxBubbles: 4,
                interval: 2000
            };
        }
        
        return {
            sizes: this.sizes,
            maxBubbles: this.maxBubbles,
            interval: 1200
        };
    }

    stop() {
        this.isActive = false;
        
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
            this.bubbleInterval = null;
        }
        
        // Remove all existing bubbles
        this.bubbles.forEach(bubble => {
            if (bubble && bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        });
        
        this.bubbles = [];
        console.log('PhotoBubbles: Animation stopped and all bubbles removed');
    }

    pause() {
        this.isActive = false;
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
            this.bubbleInterval = null;
        }
        console.log('PhotoBubbles: Animation paused');
    }

    resume() {
        if (!this.isActive) {
            this.isActive = true;
            this.start();
            console.log('PhotoBubbles: Animation resumed');
        }
    }

    setMaxBubbles(count) {
        this.maxBubbles = Math.max(1, Math.min(20, count));
        console.log('PhotoBubbles: Max bubbles set to', this.maxBubbles);
    }

    // Performance monitoring
    getPerformanceInfo() {
        return {
            activeBubbles: this.bubbles.length,
            maxBubbles: this.maxBubbles,
            isActive: this.isActive,
            intervalActive: !!this.bubbleInterval
        };
    }
}

// Auto-initialize if not manually controlled
if (typeof window !== 'undefined') {
    // Initialize PhotoBubbles when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (!window.photoBubbles) {
                window.photoBubbles = new PhotoBubbles();
            }
        });
    } else {
        if (!window.photoBubbles) {
            window.photoBubbles = new PhotoBubbles();
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotoBubbles;
}
