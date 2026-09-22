# 🐍 Mini Game Project – Snake Game

A modern **Snake Game** with a responsive **HTML/CSS/JavaScript web interface** and a separate **C++ implementation**.

The web version is designed to run directly with **VS Code Live Server**, while the C++ version is provided separately for the C++ implementation requirement.

## 📁 Project Structure

```text
Mini-Game-Snake/
├── cpp/
│   └── main.cpp
│
├── web/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── screenshots/
│   └── README.txt
│
├── .gitignore
└── README.md
```

## 🌐 Web Version – Live Server

The web version is the main playable interface.

### How to Run

1. Clone or download this repository.
2. Open the project folder in **VS Code**.
3. Open:
   ```text
   web/index.html
   ```
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The Snake Game will open in your browser.

> **No C++ server or backend is required for the web version.**

### 🎮 Web Game Features

- Modern responsive UI
- Canvas-based Snake game
- Arrow key controls
- W / A / S / D controls
- On-screen mobile controls
- Start Game
- Pause / Resume
- Restart
- Score tracking
- High Score tracking
- High Score saved using `localStorage`
- Increasing game speed
- Level progression
- Food generation
- Snake growth
- Wall collision detection
- Self-collision detection
- Game-over screen
- Responsive layout for smaller screens

### ⌨️ Web Controls

| Key | Action |
|---|---|
| ↑ | Move Up |
| ↓ | Move Down |
| ← | Move Left |
| → | Move Right |
| W | Move Up |
| S | Move Down |
| A | Move Left |
| D | Move Right |
| Space | Pause / Resume |
| Enter | Start / Play Again |

## 💻 C++ Version

The project also contains a standalone C++ implementation in:

```text
cpp/main.cpp
```

### Compile

Open the project folder in the VS Code terminal and run:

```powershell
g++ -std=c++17 cpp\main.cpp -o SnakeGame.exe
```

### Run

```powershell
.\SnakeGame.exe
```

### C++ Controls

- Arrow Keys – Move
- W / A / S / D – Move
- X – Quit
- R – Restart after Game Over

## 🧩 Technologies Used

### Web Interface
- HTML5
- CSS3
- JavaScript
- HTML5 Canvas
- LocalStorage

### C++ Implementation
- C++17
- STL `deque`
- Windows Console API
- `conio.h`

## ⚙️ How the Game Works

1. The snake starts with three segments.
2. Food is generated at a random position.
3. The snake moves continuously in the selected direction.
4. Eating food increases the score and snake length.
5. The game becomes faster as the level increases.
6. Hitting the wall or the snake's own body ends the game.
7. The highest score is stored locally in the browser.

## 📌 Important Note

The browser cannot directly execute a normal C++ console program.

Therefore, this project intentionally contains two implementations:

- `cpp/main.cpp` → standalone C++ Snake Game
- `web/` → fully playable browser Snake Game

This allows the project to meet the **C++ implementation requirement** while also providing a **proper modern web interface through Live Server**.

## 👨‍💻 Project

**Mini Game Project – Snake Game**

Built as a college mini-game project using C++, HTML, CSS and JavaScript.
