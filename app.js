const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const w = 20;
const h = 150;
const gap = 20;
const leftPlayer = {
  x: gap,
  y: H / 2 - h / 2,
  h: h,
  w: w,
  score: 0,
};
const rightPlayer = {
  x: W - gap - w,
  y: H / 2 - h / 2,
  h: h,
  w: w,
  score: 0,
};
const ball = {
  x: W / 2,
  y: H / 2,
  r: 8,
  dir: -1,
  velocity: 7,
  defaultVelocity: 7,
  angle: getBallAngle(1),
};

function getBallAngle(dir) {
  if (dir == 1) {
    return Math.round(Math.random() * 90) - 45;
  }
  return Math.round(Math.random() * 90) + 135;
}

function run() {
  requestAnimationFrame(run);
  clear();
  drawPlayer(leftPlayer);
  drawPlayer(rightPlayer);
  drawBall();
  inBoundTest();
  hitPlayerTest();
}
requestAnimationFrame(run);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      movePlayer(-1, leftPlayer);
      break;
    case "KeyS":
      movePlayer(1, leftPlayer);
      break;
    case "ArrowUp":
      movePlayer(-1, rightPlayer);
      break;
    case "ArrowDown":
      movePlayer(1, rightPlayer);
      break;
  }
});

function movePlayer(dir, player) {
  player.y += dir * 20;
}

function clear() {
  canvas.width = 0;
  canvas.width = W;
}

function drawPlayer(player) {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.w, player.h);
  ctx.stroke();
  ctx.fillStyle = "gray";
  ctx.fill();
}

function setScore(player) {
  player.score += 1;
  console.log(leftPlayer.score, rightPlayer.score);
}

function resetBallPosition() {
  ball.x = W / 2;
  ball.y = H / 2;
  const rnd = Math.round(Math.random() * 1);
  ball.dir = rnd == 0 ? -1 : 1;
  ball.velocity = ball.defaultVelocity * - 1; //dir;
  ball.angle = getBallAngle(ball.dir);

}

function inBoundTest() {
  if (ball.x > W) {
    setScore(leftPlayer);
    resetBallPosition();
  }
  if (ball.y > H - ball.r) {
    ball.angle -= ball.dir* 90 
    }
  if (ball.x < 0) {
    setScore(rightPlayer);
    resetBallPosition();
  }

  if (ball.y < ball.r) {
    ball.angle += ball.dir* 90
  }
}

function hitPlayerTest() {
  if (
    ball.x < leftPlayer.x + w * 2 &&
    ball.x > leftPlayer.x + w &&
    ball.y > leftPlayer.y &&
    ball.y < leftPlayer.y + h
  ) {
    ball.velocity = ball.defaultVelocity;
  }
  if (
    ball.x > rightPlayer.x - w &&
    ball.x < rightPlayer.x + w &&
    ball.y > rightPlayer.y &&
    ball.y < rightPlayer.y + h
  ) {
    ball.velocity = ball.defaultVelocity * -1;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2, 0, 0, 360);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.fillStyle = "green";
  ctx.fill();
  ball.x += getBallX(ball);
  ball.y += getBallY(ball);
  console.log(ball.angle)
}

function getBallX(ball) {
  return Math.cos(ball.angle * (Math.PI / 180)) * ball.velocity;
}

function getBallY(ball) {
  return Math.sin(ball.angle * (Math.PI / 180)) * ball.velocity;
}
