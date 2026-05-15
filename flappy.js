const canvas = document.getElementById("flappy");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let bird = { x: 50, y: 200, vel: 0 };
  let pipes = [{ x: 400, gap: 150 }];
  let score = 0;

  let gameRunning = true; // ✅ IMPORTANT

  // 🎮 CLICK / TAP
  document.addEventListener("click", () => {
    if (gameRunning) bird.vel = -6;
  });

  // ⌨️ SPACEBAR
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameRunning) {
      bird.vel = -6;
    }
  });

  function gameOver() {
    gameRunning = false; // ❌ stop game
    saveScore("flappy", score);
    showLeaderboard("flappy");

    // show restart button
    document.getElementById("restartBtn").style.display = "block";
  }

  function loop() {
    if (!gameRunning) return; // 🛑 stops loop

    ctx.fillStyle = "white";
ctx.fillRect(0, 0, 400, 500);
  ctx.fillStyle = "black";

    // bird physics
    bird.vel += 0.3;
    bird.y += bird.vel;

    ctx.fillRect(bird.x, bird.y, 20, 20);

    pipes.forEach(p => {
      p.x -= 2;

      ctx.fillRect(p.x, 0, 40, p.gap);
      ctx.fillRect(p.x, p.gap + 120, 40, 500);

      // new pipe
      if (p.x < 0) {
        pipes = [{ x: 400, gap: Math.random() * 200 }];
        score++;
      }

      // collision
      if (
        bird.y < 0 ||
        bird.y > 500 ||
        (bird.x > p.x &&
         bird.x < p.x + 40 &&
         (bird.y < p.gap || bird.y > p.gap + 120))
      ) {
        gameOver();
      }
    });

    // score display
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(loop);
  }

  loop();
}
window.jump = () => {
  bird.vel = -6;
};

window.restartGame = () => location.reload();
ctx.font = "20px Arial";
ctx.fillText("Score: " + score, 10, 30);
let controls = {
  left: false,
  right: false,
  up: false
};
document.getElementById("leftBtn")?.addEventListener("click", () => {
  controls.left = true;
});

document.getElementById("rightBtn")?.addEventListener("click", () => {
  controls.right = true;
});

document.getElementById("upBtn")?.addEventListener("click", () => {
  controls.up = true;
});

document.getElementById("restartBtn")?.addEventListener("click", () => {
  location.reload();
});
if (controls.up) {
  bird.vel = -6;
  controls.up = false;
}
playSound(jumpSound);