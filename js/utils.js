// Helper for safe storage access
export function getStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("localStorage not accessible:", e);
        return null;
    }
}

export function setStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("localStorage not accessible:", e);
    }
}

export function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
