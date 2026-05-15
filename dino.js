const dinoCanvas = document.getElementById("dino");

if (dinoCanvas) {

  const ctx = dinoCanvas.getContext("2d");

  let dino = {
    x: 50,
    y: 150,
    vel: 0
  };

  let score = 0;

  let cactusTypes = [
    { w: 20, h: 40 },
    { w: 30, h: 50 },
    { w: 15, h: 30 }
  ];

  let obstacle = {
    x: 500,
    y: 190,
    type: cactusTypes[0]
  };

  function newCactus() {
    obstacle.type =
      cactusTypes[Math.floor(Math.random() * cactusTypes.length)];

    obstacle.x = 500;
  }

  function jump() {

    if (dino.y >= 150) {

      dino.vel = -10;

      playSound(jumpSound);
    }
  }

  // KEYBOARD
  document.addEventListener("keydown", e => {

    if (e.code === "Space") {
      jump();
    }

  });

  // BUTTON
  document.getElementById("jumpBtn")?.addEventListener("click", () => {
    jump();
  });

  function loop() {

    ctx.clearRect(0, 0, 400, 400);

    // gravity
    dino.vel += 0.6;
    dino.y += dino.vel;

    if (dino.y > 150) {
      dino.y = 150;
      dino.vel = 0;
    }

    // move cactus
    obstacle.x -= 5;

    if (obstacle.x < -50) {

      newCactus();

      score++;

      playSound(scoreSound);
    }

    // collision
    if (
      obstacle.x < 70 &&
      obstacle.x + obstacle.type.w > 50 &&
      dino.y > 130
    ) {

      playSound(hitSound);

      saveScore("dino", score);

      showLeaderboard();

      alert("Game Over 💀 Score: " + score);

      return;
    }

    // draw dino
    ctx.fillStyle = "black";

    ctx.fillRect(
      dino.x,
      dino.y,
      20,
      20
    );

    // draw cactus
    ctx.fillRect(
      obstacle.x,
      obstacle.y - obstacle.type.h,
      obstacle.type.w,
      obstacle.type.h
    );

    // score
    ctx.font = "20px Arial";

    ctx.fillText(
      "Score: " + score,
      10,
      30
    );

    requestAnimationFrame(loop);
  }

  loop();
}

// restart
function restartGame() {
  location.reload();
}