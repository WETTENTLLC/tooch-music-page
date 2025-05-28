// Music Configuration and Data for Tooch Music Page
const musicConfig = {
    // Featured tracks data
    tracks: [
        {
            id: 1,
            title: "Sweet Melody",
            artist: "TOOCHMAGOOCH",
            album: "Sweet Melody",
            duration: "3:24",
            file: "audio/sweet-melody.mp3", // Add actual audio files to audio folder
            cover: "dropbox/Music Player Image.png"
        },
        {
            id: 2,
            title: "Sugar Rush",
            artist: "TOOCHMAGOOCH",
            album: "Sweet Melody", 
            duration: "4:12",
            file: "audio/sugar-rush.mp3",
            cover: "dropbox/Music Player Image.png"
        },
        {
            id: 3,
            title: "Cotton Candy Sky",
            artist: "TOOCHMAGOOCH",
            album: "Sweet Melody",
            duration: "3:48", 
            file: "audio/cotton-candy-sky.mp3",
            cover: "dropbox/Music Player Image.png"
        }
    ],
    
    // Current playing track
    currentTrack: 0,
    isPlaying: false,
    
    // Audio element
    audio: null,
    
    // Streaming platforms
    platforms: {
        spotify: "https://open.spotify.com/artist/toochmagooch",
        appleMusic: "https://music.apple.com/artist/toochmagooch", 
        youtube: "https://youtube.com/@toochie916?si=hNmglTw-oheA_z6G",
        soundcloud: "https://soundcloud.com/toochmagooch"
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
    // For demo purposes, we'll simulate playing without actual audio
    // In production, uncomment the line below:
    // musicConfig.audio.play().catch(handleAudioError);
    
    musicConfig.isPlaying = true;
    updatePlayButton();
    
    // Simulate playback for demo
    simulatePlayback();
    
    console.log('Playing:', musicConfig.tracks[musicConfig.currentTrack].title);
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
    console.warn('Audio error:', error);
    // For demo, we'll continue without actual audio playback
}

// Simulate playback for demo purposes
function simulatePlayback() {
    if (!musicConfig.isPlaying) return;
    
    const track = musicConfig.tracks[musicConfig.currentTrack];
    const duration = parseFloat(track.duration.split(':')[0]) * 60 + parseFloat(track.duration.split(':')[1]);
    
    let currentTime = 0;
    const interval = setInterval(() => {
        if (!musicConfig.isPlaying) {
            clearInterval(interval);
            return;
        }
        
        currentTime += 1;
        
        // Update progress
        const progress = (currentTime / duration) * 100;
        const currentTimeElements = document.querySelectorAll('.current-time');
        currentTimeElements.forEach(el => el.textContent = formatTime(currentTime));
        
        // Update CSS custom property for progress bar
        document.documentElement.style.setProperty('--progress-width', `${progress}%`);
        
        if (currentTime >= duration) {
            clearInterval(interval);
            playNext();
        }
    }, 1000);
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
