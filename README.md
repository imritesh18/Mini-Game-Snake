# Mini Game Project – Snake Game

A proper Snake Game project with a modern HTML/CSS/JavaScript interface and a separate C++ implementation.

## Project Structure

```text
Mini_Game_Project_Snake_WebUI/
├── cpp/
│   └── main.cpp
├── web/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── screenshots/
│   └── README.txt
├── .gitignore
└── README.md
```

## 1. Run the Web Interface with Live Server

This is the recommended version for the proper interface.

1. Open the project folder in VS Code.
2. Open `web/index.html`.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The Snake Game will open in your browser.

No C++ server is required for the browser version.

### Web Game Features

- Modern responsive interface
- Canvas-based Snake game
- Arrow key controls
- W/A/S/D controls
- Mobile direction buttons
- Start / Pause / Resume / Restart
- Score and high score
- High score saved using localStorage
- Increasing game speed
- Level progression
- Wall and self collision
- Game-over screen
- Responsive layout

## 2. Run the C++ Version

The C++ version is included separately to satisfy the C++ implementation requirement.

Open the project folder in the VS Code terminal:

```powershell
g++ -std=c++17 cpp\main.cpp -o SnakeGame.exe
.\SnakeGame.exe
```

C++ controls:

- Arrow Keys
- W/A/S/D
- X to quit
- R after game over to replay

## Important

Browsers cannot directly run a normal C++ console program. Therefore, the project contains:

- `cpp/main.cpp` → C++ Snake implementation
- `web/` → playable browser interface for Live Server

This keeps the C++ requirement while providing the proper interface requested for the mini-game project.
