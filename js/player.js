// Music Player Controller for Tooch Music Page
class MusicPlayer {
    constructor() {
        this.isInitialized = false;
        this.progressInterval = null;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM and music config to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPlayer());
        } else {
            this.setupPlayer();
        }
    }

    setupPlayer() {
        // Initialize music system if not already done
        if (typeof initializeMusicSystem === 'function') {
            initializeMusicSystem();
        }

        // Setup player controls
        this.setupPlayerControls();
        this.setupPlaylistInteraction();
        this.setupProgressBarInteraction();
        
        this.isInitialized = true;
        console.log('Music player initialized');
    }

    setupPlayerControls() {
        // Play/Pause button
        const playButtons = document.querySelectorAll('.play-button');
        playButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (typeof togglePlayPause === 'function') {
                    togglePlayPause();
                }
            });
        });

        // Previous button
        const prevButtons = document.querySelectorAll('.prev-button');
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (typeof playPrevious === 'function') {
                    playPrevious();
                }
            });
        });

        // Next button
        const nextButtons = document.querySelectorAll('.next-button');
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (typeof playNext === 'function') {
                    playNext();
                }
            });
        });
    }

    setupPlaylistInteraction() {
        // Playlist item clicks
        const playlistItems = document.querySelectorAll('.playlist li');
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (typeof loadTrack === 'function') {
                    loadTrack(index);
                    if (typeof playTrack === 'function') {
                        playTrack();
                    }
                }
            });

            // Individual play buttons in playlist
            const playButton = item.querySelector('button');
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (typeof loadTrack === 'function') {
                        loadTrack(index);
                        if (typeof playTrack === 'function') {
                            playTrack();
                        }
                    }
                });
            }
        });
    }

    setupProgressBarInteraction() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.addEventListener('click', (e) => {
                const rect = bar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                
                // If we have a real audio element, seek to position
                if (window.musicConfig && window.musicConfig.audio) {
                    const duration = musicConfig.audio.duration;
                    if (!isNaN(duration)) {
                        musicConfig.audio.currentTime = duration * percentage;
                    }
                }
            });
        });
    }

    // Update progress bar with custom property for CSS animation
    updateProgressBar(percentage) {
        document.documentElement.style.setProperty('--progress-width', `${percentage}%`);
    }

    // Format time helper
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Enhanced audio visualization (for future use)
class AudioVisualizer {
    constructor(audioElement) {
        this.audio = audioElement;
        this.isEnabled = false;
        this.animationId = null;
    }

    enable() {
        if (!this.audio || this.isEnabled) return;
        
        try {
            // Create audio context and analyser
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.source = this.audioContext.createMediaElementSource(this.audio);
            
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.analyser.fftSize = 256;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            this.isEnabled = true;
            this.animate();
        } catch (error) {
            console.warn('Audio visualization not supported:', error);
        }
    }

    animate() {
        if (!this.isEnabled) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        // Use data to create visual effects on the lollipop player
        this.updateLollipopVisuals();
    }

    updateLollipopVisuals() {
        // Calculate average frequency for visual effects
        const average = this.dataArray.reduce((a, b) => a + b) / this.bufferLength;
        const intensity = average / 255;
        
        // Apply visual effects to the lollipop player
        const lollipopPlayer = document.querySelector('.lollipop-player');
        if (lollipopPlayer) {
            // Adjust glow intensity based on audio
            const glowIntensity = 30 + (intensity * 20);
            lollipopPlayer.style.boxShadow = `0 0 ${glowIntensity}px rgba(255, 255, 255, ${0.3 + intensity * 0.4})`;
            
            // Slightly adjust rotation speed based on audio intensity
            const rotationSpeed = 10 - (intensity * 3);
            lollipopPlayer.style.animationDuration = `${rotationSpeed}s`;
        }
    }

    disable() {
        this.isEnabled = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Keyboard shortcuts for music player
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Only activate if not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (typeof togglePlayPause === 'function') {
                    togglePlayPause();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (typeof playPrevious === 'function') {
                    playPrevious();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (typeof playNext === 'function') {
                    playNext();
                }
                break;
        }
    });
}

// Initialize player when page loads
let musicPlayer;
let audioVisualizer;

function initializePlayer() {
    musicPlayer = new MusicPlayer();
    setupKeyboardShortcuts();
    
    // Initialize visualizer if audio is available
    setTimeout(() => {
        if (window.musicConfig && window.musicConfig.audio) {
            audioVisualizer = new AudioVisualizer(window.musicConfig.audio);
            // Enable visualizer when first play happens
            const originalPlay = window.musicConfig.audio.play;
            if (originalPlay) {
                window.musicConfig.audio.play = function() {
                    if (audioVisualizer && !audioVisualizer.isEnabled) {
                        audioVisualizer.enable();
                    }
                    return originalPlay.call(this);
                };
            }
        }
    }, 1000);
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlayer);
} else {
    initializePlayer();
}

// Export for global access
window.MusicPlayer = MusicPlayer;
window.AudioVisualizer = AudioVisualizer;
window.musicPlayer = musicPlayer;
