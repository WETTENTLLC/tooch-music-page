// Image Configuration for Tooch Magooch Music Page
const imageConfig = {    // Hero section images
    hero: {
        main: 'dropbox/tooch-header.jpg',
        fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iMzAwIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjQ4IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+VE9PQ0ggTUFHT09DSDwvdGV4dD4KPC9zdmc+'
    },
    
    // Profile/About section images
    profile: {
        main: 'dropbox/about-tooch.jpg',
        fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgcj0iMTI4IiBmaWxsPSIjNzY0YmEyIi8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTI4IiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+QVJUSVNUPC90ZXh0Pgo8L3N2Zz4='
    },
      // Floating bubble images - using all available images from site and press kit
    floating: [
        // Main profile/press images
        'dropbox/tooch-press.jpg',
        'dropbox/tooch5.jpg',
        'dropbox/tooch7.jpg',
        'dropbox/about-tooch.jpg',
        'dropbox/tooch-header.jpg',
        'dropbox/tooch-music-player-image.jpg',
        'dropbox/tour-image.JPG',
        
        // Gallery images from press kit
        'dropbox/tooch-gallery-1.jpg',
        'dropbox/tooch-gallery-2.jpg',
        'dropbox/tooch-gallery-3.jpg',
        'dropbox/tooch-gallery-4.jpg',
        'dropbox/floating image2.jpg',
        
        // Media gallery images (first 12 shown on site)
        'dropbox/media2/media1.jpg',
        'dropbox/media2/media2.jpg',
        'dropbox/media2/media3.jpg',
        'dropbox/media2/media4.jpg',
        'dropbox/media2/media5.jpg',
        'dropbox/media2/media6.jpg',
        'dropbox/media2/media7.jpg',
        'dropbox/media2/media8.jpg',
        'dropbox/media2/media9.jpg',
        'dropbox/media2/media10.jpg',
        'dropbox/media2/media11.jpg',
        'dropbox/media2/media12.jpg',
        
        // Additional media images for variety
        'dropbox/media2/media13.jpg',
        'dropbox/media2/media14.jpg',
        'dropbox/media2/media15.jpg',
        'dropbox/media2/media16.jpg',
        'dropbox/media2/media17.jpg',
        'dropbox/media2/media18.jpg',
        'dropbox/media2/media19.jpg',
        'dropbox/media2/media20.jpg',
        
        // Merchandise images for brand recognition
        'dropbox/Merch/Merch1.JPG',
        'dropbox/Merch/Merch2.JPG',
        'dropbox/Merch/Merch3.JPG',
        'dropbox/Merch/Merch4.JPG'
    ],
    
    // Music player image
    musicPlayer: {
        main: 'dropbox/tooch-music-player-image.jpg',
        fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjEwMCIgZmlsbD0iI2ZmZmZmZiIvPgo8cG9seWdvbiBwb2ludHM9IjEzMCwxMjAgMTgwLDE1MCAxMzAsMTgwIiBmaWxsPSIjNjY3ZWVhIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmNmI2YjtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNTRhMGZmO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg=='
    }
};

// Image loading and error handling
function setupImageHandling() {
    // Hero image setup
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        heroImage.onerror = function() {
            console.warn('Hero image failed to load, using fallback');
            this.src = imageConfig.hero.fallback;
        };
        
        // Preload hero image
        const preloadHero = new Image();
        preloadHero.onload = function() {
            heroImage.src = imageConfig.hero.main;
        };
        preloadHero.onerror = function() {
            heroImage.src = imageConfig.hero.fallback;
        };
        preloadHero.src = imageConfig.hero.main;
    }
    
    // Profile image setup
    const profileImages = document.querySelectorAll('img[src*="Body Image"]');
    profileImages.forEach(img => {
        img.onerror = function() {
            console.warn('Profile image failed to load, using fallback');
            this.src = imageConfig.profile.fallback;
        };
    });
    
    // Preload floating images for bubbles
    imageConfig.floating.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = function() {
            console.warn(`Floating image ${src} failed to load`);
        };
    });
}

// Get random floating image
function getRandomFloatingImage() {
    const availableImages = imageConfig.floating.filter(src => {
        const img = new Image();
        img.src = src;
        return img.complete && img.naturalHeight !== 0;
    });
    
    if (availableImages.length > 0) {
        return availableImages[Math.floor(Math.random() * availableImages.length)];
    }
    
    // Fallback SVG if no images are available
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjZmY2YjZiIiBvcGFjaXR5PSIwLjciLz4KPC9zdmc+';
}

// Initialize image handling when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImageHandling);
} else {
    setupImageHandling();
}

// Export for use in other modules
window.imageConfig = imageConfig;
window.getRandomFloatingImage = getRandomFloatingImage;
