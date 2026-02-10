import { songs } from './constants.js';

const state = {
    songs: songs,
    playlists: [
        {
            id: 1,
            name: "My Favorites",
            songs: []
        }
    ],
    currentSong: null,
    currentPlaylist: null,
    isPlaying: false
};

export function getState() {
    return state;
}

export function setCurrentSong(song) {
    state.currentSong = song;
}

export function setCurrentPlaylist(playlist) {
    state.currentPlaylist = playlist;
}

export function setIsPlaying(isPlaying) {
    state.isPlaying = isPlaying;
}

export function addPlaylist(name) {
    state.playlists.push({
        id: Date.now(),
        name: name,
        songs: []
    });
}

export function addToPlaylist(playlistId, song) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist && !playlist.songs.find(s => s.id === song.id)) {
        playlist.songs.push(song);
        return true;
    }
    return false;
}

export function removeFromPlaylist(playlist, songId) {
    playlist.songs = playlist.songs.filter(s => s.id !== songId);
}
