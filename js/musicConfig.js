// Music Configuration and Data for Tooch Magooch Music Page
const musicConfig = {    // Featured tracks data
    tracks: [
        {
            id: 1,
            title: "PRESS",
            artist: "Tooch Magooch",
            album: "Latest Single",
            duration: "3:30",
            file: "dropbox/PRESS MASTER .mp3",
            cover: "dropbox/tooch-press.jpg",
            startTime: 21 // Start "PRESS" at 0:21
        },
        {
            id: 2,
            title: "Munyunn",
            artist: "Tooch Magooch",
            album: "Single",
            duration: "3:45",
            file: "dropbox/Munyunn Ft Mozzy M3.m4a",
            cover: "dropbox/tooch-gallery-1.jpg",
            startTime: 18 // Start "Munyunn" at 0:18
        }
    ],
    
    // Current playing track
    currentTrack: 0,
    isPlaying: false,
    
    // Audio element
    audio: null,    // Social media platforms
    platforms: {
        instagram: "https://instagram.com/tooch_magooch"
    }
};

// Initialize music system
function initializeMusicSystem() {
    // Create audio element
    musicConfig.audio = new Audio();
    musicConfig.audio.volume = 0.7;
    
    // Set up event listeners
    musicConfig.audio.addEventListener('loadedmetadata', updateDuration);
    musicConfig.audio.addEventListener('timeupdate', updateProgress);
    musicConfig.audio.addEventListener('ended', playNext);
    musicConfig.audio.addEventListener('error', handleAudioError);
    
    // Load first track
    loadTrack(0);
    
    console.log('Music system initialized');
}

// Load a specific track
function loadTrack(trackIndex) {
    if (trackIndex < 0 || trackIndex >= musicConfig.tracks.length) {
        console.warn('Invalid track index:', trackIndex);
        return;
    }
    
    const track = musicConfig.tracks[trackIndex];
    musicConfig.currentTrack = trackIndex;
    
    // Update UI
    updateTrackInfo(track);
    
    // Load audio (with fallback for demo)
    musicConfig.audio.src = track.file;
    musicConfig.audio.load();
    
    // Set start time when metadata is loaded
    if (track.startTime) {
        musicConfig.audio.addEventListener('loadedmetadata', function setStartTime() {
            musicConfig.audio.currentTime = track.startTime;
            musicConfig.audio.removeEventListener('loadedmetadata', setStartTime);
        });
    }
    
    // Update playlist highlighting
    updatePlaylistHighlight();
}

// Update track information in UI
function updateTrackInfo(track) {
    const titleElements = document.querySelectorAll('.track-title');
    const artistElements = document.querySelectorAll('.track-artist');
    
    titleElements.forEach(el => el.textContent = track.title);
    artistElements.forEach(el => el.textContent = track.artist);
}

// Update duration display
function updateDuration() {
    const totalTimeElements = document.querySelectorAll('.total-time');
    const duration = musicConfig.audio.duration;
    
    if (!isNaN(duration)) {
        const formattedTime = formatTime(duration);
        totalTimeElements.forEach(el => el.textContent = formattedTime);
    }
}

// Update progress bar and current time
function updateProgress() {
    const currentTime = musicConfig.audio.currentTime;
    const duration = musicConfig.audio.duration;
    
    if (!isNaN(duration) && duration > 0) {
        const progress = (currentTime / duration) * 100;
        
        // Update progress bars
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progressFill = bar.querySelector('::after') || bar;
            if (progressFill.style) {
                progressFill.style.setProperty('--progress-width', `${progress}%`);
            }
        });
        
        // Update current time display
        const currentTimeElements = document.querySelectorAll('.current-time');
        const formattedTime = formatTime(currentTime);
        currentTimeElements.forEach(el => el.textContent = formattedTime);
    }
}

// Format time in MM:SS format
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Play/pause functionality
function togglePlayPause() {
    if (musicConfig.isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

// Play current track
function playTrack() {
    const track = musicConfig.tracks[musicConfig.currentTrack];
    
    // Set start time if specified
    if (track.startTime && musicConfig.audio.readyState >= 1) {
        musicConfig.audio.currentTime = track.startTime;
    }
    
    // Play the actual audio
    musicConfig.audio.play().catch(handleAudioError);
    
    musicConfig.isPlaying = true;
    updatePlayButton();
    
    console.log('Playing:', track.title);
}

// Pause current track
function pauseTrack() {
    musicConfig.audio.pause();
    musicConfig.isPlaying = false;
    updatePlayButton();
    
    console.log('Paused');
}

// Play next track
function playNext() {
    const nextIndex = (musicConfig.currentTrack + 1) % musicConfig.tracks.length;
    loadTrack(nextIndex);
    if (musicConfig.isPlaying) {
        playTrack();
    }
}

// Play previous track
function playPrevious() {
    const prevIndex = musicConfig.currentTrack === 0 
        ? musicConfig.tracks.length - 1 
        : musicConfig.currentTrack - 1;
    loadTrack(prevIndex);
    if (musicConfig.isPlaying) {
        playTrack();
    }
}

// Update play button icon
function updatePlayButton() {
    const playButtons = document.querySelectorAll('.play-button i');
    playButtons.forEach(icon => {
        if (musicConfig.isPlaying) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    });
}

// Update playlist highlighting
function updatePlaylistHighlight() {
    const playlistItems = document.querySelectorAll('.playlist li');
    playlistItems.forEach((item, index) => {
        if (index === musicConfig.currentTrack) {
            item.classList.add('bg-white/20');
        } else {
            item.classList.remove('bg-white/20');
        }
    });
}

// Handle audio errors
function handleAudioError(error) {
    console.warn('Audio error:', error);    // Audio error handled
}

// Get track by ID
function getTrackById(id) {
    return musicConfig.tracks.find(track => track.id === id);
}

// Get current track
function getCurrentTrack() {
    return musicConfig.tracks[musicConfig.currentTrack];
}

// Export functions for global use
window.musicConfig = musicConfig;
window.initializeMusicSystem = initializeMusicSystem;
window.loadTrack = loadTrack;
window.togglePlayPause = togglePlayPause;
window.playNext = playNext;
window.playPrevious = playPrevious;
window.getCurrentTrack = getCurrentTrack;
