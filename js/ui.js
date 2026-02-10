import { formatTime } from './utils.js';

const DOM = {
    songList: document.getElementById('song-list'),
    playlistList: document.getElementById('playlist-list'),
    albumArt: document.getElementById('album-art'),
    songName: document.getElementById('song-name'),
    artistName: document.getElementById('artist-name'),
    playPauseBtn: document.getElementById('play-pause-btn'),
    currentTime: document.getElementById('current-time'),
    duration: document.getElementById('duration'),
    seekBar: document.getElementById('seek-bar'),
    playlistSearch: document.getElementById('playlist-search'),
    songSearch: document.getElementById('song-search'),
    genreSelect: document.getElementById('genre-filter'),
    themeToggleBtn: document.getElementById('theme-toggle'),
    playlistTitle: document.querySelector('.all-song-div h2')
};

export function getDOM() {
    return DOM; // Expose DOM elements for event binding
}

export function renderSongs(songs, currentPlaylist, onPlay, onRemove) {
    DOM.songList.innerHTML = '';

    if (songs.length === 0) {
        DOM.songList.innerHTML = '<li>No songs found</li>';
        return;
    }

    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${song.img}" alt="${song.name}">
            <div class="song-info">
                <span>${song.name}</span>
                <span style="font-size: 0.8em; color: var(--secondary-color); display: block;">${song.artist}</span>
            </div>
        `;

        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) return;
            onPlay(song);
        });

        if (currentPlaylist) {
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.className = 'remove-btn';
            removeBtn.title = 'Remove from Playlist';
            // Inline styles migrated to class or kept here for now
            Object.assign(removeBtn.style, {
                marginLeft: 'auto',
                backgroundColor: '#e74c3c',
                padding: '8px',
                fontSize: '12px',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%'
            });

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onRemove(currentPlaylist, song.id);
            });
            li.appendChild(removeBtn);
        }

        DOM.songList.appendChild(li);
    });
}

export function renderPlaylists(playlists, activePlaylist, onSelect) {
    DOM.playlistList.innerHTML = '';

    // "All Songs" Item
    const allSongsLi = document.createElement('li');
    allSongsLi.textContent = "All Songs";
    if (!activePlaylist) allSongsLi.style.fontWeight = 'bold';

    allSongsLi.addEventListener('click', () => onSelect(null));
    DOM.playlistList.appendChild(allSongsLi);

    playlists.forEach(pl => {
        const li = document.createElement('li');
        li.textContent = pl.name;
        if (activePlaylist && activePlaylist.id === pl.id) li.style.fontWeight = 'bold';

        li.addEventListener('click', () => onSelect(pl));
        DOM.playlistList.appendChild(li);
    });
}

export function updatePlayerInfo(song) {
    DOM.albumArt.src = song.img;

    // Safety check if textContent is not null
    if (DOM.songName) DOM.songName.textContent = song.name;
    if (DOM.artistName) DOM.artistName.textContent = song.artist;
}

export function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
        DOM.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        DOM.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

export function updateProgress(currentTime, duration) {
    if (!isNaN(duration)) {
        DOM.duration.textContent = formatTime(duration);
        DOM.seekBar.max = Math.floor(duration);
    }
    DOM.currentTime.textContent = formatTime(currentTime);
    DOM.seekBar.value = Math.floor(currentTime);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    updateSeekBarBackground(progress);
}

function updateSeekBarBackground(progress) {
    const currentTheme = document.body.getAttribute('data-theme');
    const color = currentTheme === 'dark' ? '#bb86fc' : '#007bff';
    DOM.seekBar.style.background = `linear-gradient(to right, ${color} ${progress}%, var(--secondary-color) ${progress}%)`;
}

export function updatePlaylistTitle(name) {
    DOM.playlistTitle.textContent = name;
}
