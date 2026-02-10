export class Player {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.isPlaying = false;

        // Event listeners will be attached by the main app or UI
        // to keep this class focused on audio control
    }

    load(song) {
        if (!song) return;
        this.audio.src = song.source;
    }

    play() {
        this.audio.play().catch(e => console.log("Audio play error:", e));
        this.isPlaying = true;
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    seek(time) {
        this.audio.currentTime = time;
    }

    get duration() {
        return this.audio.duration;
    }

    get currentTime() {
        return this.audio.currentTime;
    }
}
