// Simple Bubbles Animation for Tooch Music Page
class SimpleBubbles {
    constructor() {
        this.bubbles = [];
        this.maxBubbles = 10;
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
        
        // Create initial bubbles
        this.createBubble();
        
        // Set interval for creating new bubbles
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, 1500 + Math.random() * 1000); // Random interval between 1.5-2.5 seconds
        
        console.log('Simple bubbles animation started');
    }

    createBubble() {
        // Create bubble element
        const bubble = document.createElement('div');
        bubble.className = 'simple-bubble';
        
        // Random size between 20px and 80px
        const size = 20 + Math.random() * 60;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random horizontal position
        bubble.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        
        // Random opacity and color variation
        const opacity = 0.3 + Math.random() * 0.4;
        bubble.style.opacity = opacity;
        
        // Add slight color variation
        const hue = Math.random() * 60 + 180; // Blue to cyan range
        const saturation = 20 + Math.random() * 30;
        const lightness = 80 + Math.random() * 20;
        
        bubble.style.background = `radial-gradient(circle at 30% 30%, 
            hsla(${hue}, ${saturation}%, ${lightness}%, 0.8), 
            hsla(${hue}, ${saturation}%, ${lightness}%, 0.2))`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 3; // 5-8 seconds
        bubble.style.animationDuration = `${duration}s`;
        
        // Add subtle movement variation
        const drift = (Math.random() - 0.5) * 100; // -50px to +50px horizontal drift
        bubble.style.setProperty('--drift', `${drift}px`);
        
        // Add to DOM
        document.body.appendChild(bubble);
        this.bubbles.push(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            this.removeBubble(bubble);
        }, duration * 1000);
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
        
        console.log('Simple bubbles animation stopped');
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

    // Adjust bubble intensity based on music or user interaction
    setIntensity(level = 1) {
        // level: 0.5 = calm, 1 = normal, 2 = intense
        this.maxBubbles = Math.floor(10 * level);
        
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
        }
        
        const baseInterval = 1500;
        const newInterval = baseInterval / level;
        
        this.bubbleInterval = setInterval(() => {
            if (this.isActive && this.bubbles.length < this.maxBubbles) {
                this.createBubble();
            }
        }, newInterval + Math.random() * 1000);
    }

    // Create special burst effect
    createBurst(x, y) {
        const burstCount = 5 + Math.random() * 5;
        
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'simple-bubble burst-bubble';
                
                const size = 15 + Math.random() * 25;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${x - size/2}px`;
                bubble.style.top = `${y - size/2}px`;
                
                // Burst direction
                const angle = (i / burstCount) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const targetX = x + Math.cos(angle) * distance;
                const targetY = y + Math.sin(angle) * distance;
                
                bubble.style.background = `radial-gradient(circle at 30% 30%, 
                    rgba(255, 255, 255, 0.9), 
                    rgba(255, 255, 255, 0.3))`;
                
                document.body.appendChild(bubble);
                
                // Animate burst
                bubble.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)', 
                        opacity: 0.8 
                    },
                    { 
                        transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'ease-out'
                }).onfinish = () => {
                    if (bubble.parentNode) {
                        bubble.parentNode.removeChild(bubble);
                    }
                };
            }, i * 100);
        }
    }
}

// Enhanced bubble styles with drift animation
const simpleBubbleStyles = document.createElement('style');
simpleBubbleStyles.textContent = `
    .simple-bubble {
        animation: simpleBubbleFloat 6s linear infinite;
    }
    
    @keyframes simpleBubbleFloat {
        0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
            transform: translateY(90vh) translateX(calc(var(--drift, 0px) * 0.1)) scale(1);
        }
        90% {
            opacity: 0.6;
            transform: translateY(10vh) translateX(calc(var(--drift, 0px) * 0.9)) scale(1);
        }
        100% {
            transform: translateY(-100px) translateX(var(--drift, 0px)) scale(0.5);
            opacity: 0;
        }
    }
    
    .burst-bubble {
        animation: none !important;
        z-index: 6;
    }
    
    .simple-bubble.interactive {
        pointer-events: auto;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .simple-bubble.interactive:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(simpleBubbleStyles);

// Bubble interaction manager
class BubbleInteractionManager {
    constructor(simpleBubbles) {
        this.simpleBubbles = simpleBubbles;
        this.setupInteractions();
    }

    setupInteractions() {
        // Click interaction on page
        document.addEventListener('click', (e) => {
            // Avoid triggering on UI elements
            if (e.target.closest('nav, section, button, a, input, textarea')) {
                return;
            }
            
            // Create burst effect at click location
            this.simpleBubbles.createBurst(e.clientX, e.clientY);
        });

        // Mouse movement creates subtle bubble trail
        let lastMouseMove = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove < 500) return; // Throttle
            lastMouseMove = now;
            
            // Chance to create a small bubble at mouse position
            if (Math.random() < 0.1) { // 10% chance
                this.createMouseBubble(e.clientX, e.clientY);
            }
        });
    }

    createMouseBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'simple-bubble mouse-bubble';
        
        const size = 8 + Math.random() * 12;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${x - size/2}px`;
        bubble.style.top = `${y - size/2}px`;
        bubble.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 255, 255, 0.6), 
            rgba(255, 255, 255, 0.1))`;
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '4';
        
        document.body.appendChild(bubble);
        
        // Float upward and fade
        bubble.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.6 },
            { transform: 'translateY(-50px) scale(0)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        };
    }
}

// Initialize simple bubbles
let simpleBubbles;
let bubbleInteractionManager;

function initializeSimpleBubbles() {
    simpleBubbles = new SimpleBubbles();
    bubbleInteractionManager = new BubbleInteractionManager(simpleBubbles);
    
    // Listen for music events to adjust bubble intensity
    if (window.musicConfig) {
        // Override music functions to adjust bubble behavior
        const originalTogglePlayPause = window.togglePlayPause;
        if (originalTogglePlayPause) {
            window.togglePlayPause = function() {
                originalTogglePlayPause();
                if (simpleBubbles) {
                    const intensity = window.musicConfig.isPlaying ? 1.5 : 1;
                    simpleBubbles.setIntensity(intensity);
                }
            };
        }
    }
    
    // Pause bubbles when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (simpleBubbles) {
            if (document.hidden) {
                simpleBubbles.pause();
            } else {
                simpleBubbles.resume();
            }
        }
    });
    
    // Adjust intensity based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = Math.abs(scrollTop - lastScrollTop);
        
        if (scrollDelta > 50 && simpleBubbles) {
            // Create burst effect on fast scroll
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            simpleBubbles.createBurst(centerX, centerY);
        }
        
        lastScrollTop = scrollTop;
    });
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSimpleBubbles);
} else {
    initializeSimpleBubbles();
}

// Export for global access
window.SimpleBubbles = SimpleBubbles;
window.BubbleInteractionManager = BubbleInteractionManager;
window.simpleBubbles = simpleBubbles;
