const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

let snake, food, direction, gameRunning;

function init() {
  snake = [{ x: 200, y: 200 }];
  food = randomFood();
  direction = "RIGHT";
  gameRunning = true;
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function changeDirection(newDir) {
  const opposites = {
    LEFT: "RIGHT",
    RIGHT: "LEFT",
    UP: "DOWN",
    DOWN: "UP"
  };

  if (direction !== opposites[newDir]) {
    direction = newDir;
  }
}

function gameLoop() {
  if (!gameRunning) return;

  setTimeout(() => {
    ctx.clearRect(0, 0, 400, 400);

    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= 20;
    if (direction === "RIGHT") head.x += 20;
    if (direction === "UP") head.y -= 20;
    if (direction === "DOWN") head.y += 20;

    // collision
    if (
      head.x < 0 || head.y < 0 ||
      head.x >= 400 || head.y >= 400 ||
      snake.some(s => s.x === head.x && s.y === head.y)
    ) {
      gameRunning = false;
      alert("Game Over 😭 Score: " + snake.length);
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = randomFood();
    } else {
      snake.pop();
    }

    ctx.fillStyle = "#00c2b2";
    snake.forEach(s => ctx.fillRect(s.x, s.y, 20, 20));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);

    gameLoop();
  }, 100);
}

// controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") changeDirection("LEFT");
  if (e.key === "ArrowRight") changeDirection("RIGHT");
  if (e.key === "ArrowUp") changeDirection("UP");
  if (e.key === "ArrowDown") changeDirection("DOWN");
});

document.getElementById("leftBtn").onclick = () => changeDirection("LEFT");
document.getElementById("rightBtn").onclick = () => changeDirection("RIGHT");
document.getElementById("upBtn").onclick = () => changeDirection("UP");
document.getElementById("downBtn").onclick = () => changeDirection("DOWN");

document.getElementById("restartBtn").onclick = () => {
  init();
  gameLoop();
};

document.addEventListener("touchstart", () => {
  changeDirection("UP");
});

// 🚀 START
init();
gameLoop();