import { getStorage, setStorage } from './utils.js';

export function initTheme() {
    const savedTheme = getStorage('theme') || 'light';
    setTheme(savedTheme);
    return savedTheme;
}

export function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    return newTheme;
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    setStorage('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}
