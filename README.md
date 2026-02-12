# VibePlayer

A modern, fully functional Single Page Application (SPA) Music Player built with Vanilla JavaScript, HTML5, and CSS3. VibePlayer features a sleek design, playlist management, and dynamic theming.

## Features

*   **🎧 Music Playback**: Play, pause, skip, and seek tracks with a Spotify-style progress bar.
*   **📂 Playlist Management**: Create custom playlists, add/remove songs, and search your library.
*   **🎨 Dynamic Theming**: Toggle between Light and Dark modes with persistent storage.
*   **🖼️ Themed Album Art**: Songs feature dynamic, thematic backgrounds (City, Neon, Mountain, Jazz, Urban) sourced from LoremFlickr.
*   **🔍 Search & Filter**: Instantly search for songs or filter by genre (Pop, Rock, Jazz, etc.).
*   **📱 Responsive Design**: Fully responsive layout that adapts to desktop and mobile devices.
*   **🧩 Modular Architecture**: Clean, maintainable codebase using ES6 modules.

## Technologies Used

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom properties (variables), Flexbox, Grid, and responsive media queries.
*   **JavaScript (ES6+)**: Modular logic with `import`/`export`, local storage, and DOM manipulation.
*   **Google Fonts**: "Nunito" typeface.
*   **FontAwesome**: Scalable vector icons.

## Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dexter-blaze/Vibe-Player.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd vibeplayer
    ```
3.  **Run the application:**
    *   Since this project uses ES6 modules, you must serve it via a local server (opening `index.html` directly will likely fail due to CORS policies).
    *   **VS Code Live Server**: Right-click `index.html` and select "Open with Live Server".
    *   **Python**: `python -m http.server 8080` (then visit `http://localhost:8080`).
    *   **Node**: `npx http-server` (then visit the provided URL).

## Project Structure 

```
vibeplayer/
├── index.html          # Main entry point
├── style.css           # Global styles and theming
├── js/                 # JavaScript Modules
│   ├── app.js          # Main application logic & event listeners
│   ├── constants.js    # Static data (Songs list)
│   ├── player.js       # Audio playback control class
│   ├── state.js        # Centralized state management
│   ├── theme.js        # Theme toggling logic
│   ├── ui.js           # DOM rendering functions
│   └── utils.js        # Helper functions (Formatting, Storage)
└── README.md           # Project documentation
```

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository and submit a pull request.
