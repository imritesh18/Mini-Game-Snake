const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const levelEl = document.getElementById("level");
const statusEl = document.getElementById("status");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const overlayButton = document.getElementById("overlayButton");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const GRID = 20;
const CELL = canvas.width / GRID;

let snake;
let food;
let direction;
let nextDirection;
let score;
let highScore = Number(localStorage.getItem("snakeHighScore") || 0);
let level;
let gameState = "ready";
let timer = null;

highScoreEl.textContent = highScore;

function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  level = 1;
  createFood();
  updateStats();
  draw();
}

function createFood() {
  do {
    food = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID)
    };
  } while (snake.some(part => part.x === food.x && part.y === food.y));
}

function speed() {
  return Math.max(65, 155 - (level - 1) * 12);
}

function updateStats() {
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  levelEl.textContent = level;
}

function setStatus(state) {
  gameState = state;
  statusEl.className = "status " + state;
  statusEl.textContent = state === "gameover" ? "GAME OVER" : state.toUpperCase();
}

function showOverlay(title, text, buttonText) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlayButton.textContent = buttonText;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

function startGame() {
  if (gameState === "playing") return;
  if (gameState === "gameover") resetGame();
  setStatus("playing");
  hideOverlay();
  pauseBtn.textContent = "Ⅱ Pause";
  clearInterval(timer);
  timer = setInterval(tick, speed());
  draw();
}

function pauseGame() {
  if (gameState === "playing") {
    clearInterval(timer);
    setStatus("paused");
    pauseBtn.textContent = "▶ Resume";
    showOverlay("Game Paused", "Take a break and continue when you're ready.", "Resume");
  } else if (gameState === "paused") {
    startGame();
  }
}

function restartGame() {
  clearInterval(timer);
  resetGame();
  setStatus("ready");
  pauseBtn.textContent = "Ⅱ Pause";
  showOverlay("Ready to Play?", "Press Start or use an arrow key to begin.", "Start Game");
}

function gameOver() {
  clearInterval(timer);
  setStatus("gameover");
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("snakeHighScore", highScore);
  }
  updateStats();
  showOverlay("Game Over", `Your score is ${score}. Try again!`, "Play Again");
  draw();
}

function changeDirection(dir) {
  const opposites = { up: "down", down: "up", left: "right", right: "left" };
  const current =
    direction.x === 1 ? "right" :
    direction.x === -1 ? "left" :
    direction.y === 1 ? "down" : "up";

  if (dir === opposites[current]) return;

  const map = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  nextDirection = map[dir];
  if (gameState === "ready") startGame();
}

function tick() {
  direction = nextDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  const hitsWall = head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID;
  const eatsFood = head.x === food.x && head.y === food.y;
  const bodyToCheck = eatsFood ? snake : snake.slice(0, -1);
  const hitsSelf = bodyToCheck.some(part => part.x === head.x && part.y === head.y);

  if (hitsWall || hitsSelf) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (eatsFood) {
    score += 10;
    level = Math.floor(score / 50) + 1;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
    }

    createFood();
    updateStats();
    clearInterval(timer);
    timer = setInterval(tick, speed());
  } else {
    snake.pop();
  }

  draw();
}

function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#06101c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,.035)";
  ctx.lineWidth = 1;
  for (let i = 1; i < GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(canvas.width, i * CELL);
    ctx.stroke();
  }

  const fx = food.x * CELL + CELL / 2;
  const fy = food.y * CELL + CELL / 2;
  ctx.shadowBlur = 18;
  ctx.shadowColor = "#ff5f6d";
  ctx.fillStyle = "#ff5f6d";
  ctx.beginPath();
  ctx.arc(fx, fy, CELL * 0.27, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  snake.forEach((part, index) => {
    const padding = index === 0 ? 3 : 4;
    const x = part.x * CELL + padding;
    const y = part.y * CELL + padding;
    const size = CELL - padding * 2;

    ctx.shadowBlur = index === 0 ? 14 : 6;
    ctx.shadowColor = "#39e58c";
    ctx.fillStyle = index === 0 ? "#57f3a3" : "#28cc7c";
    roundedRect(x, y, size, size, 7);
    ctx.shadowBlur = 0;

    if (index === 0) {
      ctx.fillStyle = "#062016";
      const eyeY = y + size * 0.34;
      const eyeX1 = x + size * 0.30;
      const eyeX2 = x + size * 0.70;
      ctx.beginPath();
      ctx.arc(eyeX1, eyeY, 2.3, 0, Math.PI * 2);
      ctx.arc(eyeX2, eyeY, 2.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

document.addEventListener("keydown", event => {
  const keyMap = {
    ArrowUp: "up", w: "up", W: "up",
    ArrowDown: "down", s: "down", S: "down",
    ArrowLeft: "left", a: "left", A: "left",
    ArrowRight: "right", d: "right", D: "right"
  };

  const dir = keyMap[event.key];
  if (dir) {
    event.preventDefault();
    changeDirection(dir);
  }

  if (event.key === " " && gameState !== "ready" && gameState !== "gameover") {
    event.preventDefault();
    pauseGame();
  }

  if (event.key === "Enter" && (gameState === "ready" || gameState === "gameover")) {
    startGame();
  }
});

document.querySelectorAll("[data-dir]").forEach(button => {
  button.addEventListener("click", () => changeDirection(button.dataset.dir));
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", restartGame);
overlayButton.addEventListener("click", () => {
  if (gameState === "paused") pauseGame();
  else startGame();
});

resetGame();
setStatus("ready");
showOverlay("Ready to Play?", "Press Start or use an arrow key to begin.", "Start Game");
