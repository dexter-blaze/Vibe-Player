import { songs } from './constants.js';
import { getState, setCurrentSong, setCurrentPlaylist, setIsPlaying, addPlaylist, addToPlaylist, removeFromPlaylist } from './state.js';
import { initTheme, toggleTheme } from './theme.js';
import { getDOM, renderSongs, renderPlaylists, updatePlayerInfo, updatePlayPauseButton, updateProgress, updatePlaylistTitle } from './ui.js';
import { Player } from './player.js';

// Initialize
const player = new Player();
const DOM = getDOM();

function init() {
    initTheme();
    renderAll();
    setupEventListeners();
}

function renderAll() {
    const state = getState();
    const activePlaylist = state.currentPlaylist;

    // Render Playlists
    renderPlaylists(state.playlists, activePlaylist, handlePlaylistSelect);

    // Render Songs
    const songsToRender = activePlaylist ? activePlaylist.songs : state.songs;
    renderSongs(songsToRender, activePlaylist, handleSongSelect, handleRemoveSong);

    // Filter Logic needs to re-run on render if inputs have value
    // For simplicity in this structure, we let events handle filtering or 
    // we could move filtering logic to state/selector. 
    // Here we'll just respect the current render call.
}

function handlePlaylistSelect(playlist) {
    setCurrentPlaylist(playlist);
    updatePlaylistTitle(playlist ? playlist.name : "All Songs");

    // Clear search
    DOM.songSearch.value = '';
    DOM.genreSelect.value = 'All';

    renderApp();
}

function handleSongSelect(song) {
    setCurrentSong(song);
    updatePlayerInfo(song);
    player.load(song);
    player.play();
    setIsPlaying(true);
    updatePlayPauseButton(true);
}

function handleRemoveSong(playlist, songId) {
    removeFromPlaylist(playlist, songId);
    renderApp();
}

// Re-render based on current state and filters
function renderApp() {
    const state = getState();
    let currentList = state.currentPlaylist ? state.currentPlaylist.songs : state.songs;

    // 1. Filter by Search
    const searchTerm = DOM.songSearch.value.toLowerCase();
    if (searchTerm) {
        currentList = currentList.filter(s => s.name.toLowerCase().includes(searchTerm));
    }

    // 2. Filter by Genre (Only if viewing all songs)
    if (!state.currentPlaylist) {
        const genre = DOM.genreSelect.value;
        if (genre !== 'All') {
            currentList = currentList.filter(s => s.genre === genre);
        }
    }

    // Pass filtered list to UI
    renderSongs(currentList, state.currentPlaylist, handleSongSelect, handleRemoveSong);

    // Also re-render playlists to show active state
    renderPlaylists(state.playlists, state.currentPlaylist, handlePlaylistSelect);
}

function setupEventListeners() {
    // Theme
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    // Search & Filter
    DOM.songSearch.addEventListener('input', renderApp);
    DOM.genreSelect.addEventListener('change', renderApp);

    DOM.playlistSearch.addEventListener('input', () => {
        const state = getState();
        const term = DOM.playlistSearch.value.toLowerCase();
        const filtered = state.playlists.filter(p => p.name.toLowerCase().includes(term));
        renderPlaylists(filtered, state.currentPlaylist, handlePlaylistSelect);
    });

    // Create Playlist
    document.getElementById('create-playlist-btn').addEventListener('click', () => {
        const name = prompt("Enter playlist name:");
        if (name) {
            addPlaylist(name);
            renderApp();
        }
    });

    // Player Controls
    DOM.playPauseBtn.addEventListener('click', () => {
        const isPlaying = player.toggle();
        setIsPlaying(isPlaying);
        updatePlayPauseButton(isPlaying);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        const state = getState();
        if (!state.currentSong) return;

        const contextList = state.currentPlaylist ? state.currentPlaylist.songs : state.songs;
        const currentIndex = contextList.findIndex(s => s.id === state.currentSong.id);

        let nextIndex = currentIndex + 1;
        if (nextIndex >= contextList.length) nextIndex = 0;

        handleSongSelect(contextList[nextIndex]);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        const state = getState();
        if (!state.currentSong) return;

        const contextList = state.currentPlaylist ? state.currentPlaylist.songs : state.songs;
        const currentIndex = contextList.findIndex(s => s.id === state.currentSong.id);

        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = contextList.length - 1;

        handleSongSelect(contextList[prevIndex]);
    });

    // Add to Playlist
    document.getElementById('add-to-playlist-btn').addEventListener('click', () => {
        const state = getState();
        if (!state.currentSong) {
            alert("No song selected!");
            return;
        }

        if (state.currentPlaylist) {
            const success = addToPlaylist(state.currentPlaylist.id, state.currentSong);
            if (success) {
                alert(`Added to ${state.currentPlaylist.name}`);
                renderApp();
            } else {
                alert("Song already in this playlist!");
            }
        } else {
            const playlistNames = state.playlists.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
            const selection = prompt(`Select playlist to add to (enter number):\n${playlistNames}`);

            const index = parseInt(selection) - 1;
            if (index >= 0 && index < state.playlists.length) {
                const target = state.playlists[index];
                const success = addToPlaylist(target.id, state.currentSong);
                if (success) {
                    alert(`Added to ${target.name}`);
                } else {
                    alert("Song already in this playlist!");
                }
            }
        }
    });

    // Audio & Seek Bar
    player.audio.addEventListener('timeupdate', () => {
        updateProgress(player.currentTime, player.duration);
    });

    player.audio.addEventListener('loadedmetadata', () => {
        updateProgress(player.currentTime, player.duration);
    });

    DOM.seekBar.addEventListener('input', () => {
        player.seek(DOM.seekBar.value);
    });
}

// Start
init();
