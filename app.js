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
  dir: 1,
  velocity: 10,
  defaultVelocity: 10,
  angle: getBallAngle(1),
  bounced: false,
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
  moveBall();
  //log();
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

function log(){
  document.getElementById('dir').innerText = 'd:' + ball.dir;
  document.getElementById('angle').innerText = 'a:' + ball.angle;
  document.getElementById('x').innerText = 'x:' + parseInt(ball.x);
  document.getElementById('y').innerText = 'y:' + parseInt(ball.y);
}

function movePlayer(dir, player) {
  player.y += dir * 20;
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y > H - player.h) {
    player.y = H - player.h;
  }
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
  ball.velocity = ball.defaultVelocity * dir;
  ball.angle = getBallAngle(ball.dir);
}

function inBoundTest() {
  if (ball.x > W) {
    setScore(leftPlayer);
    resetBallPosition();
  }
  if (ball.y > H - ball.r * 2) {
    if (ball.dir == 1) {
      ball.angle =- Math.abs(ball.angle);
    }
    else {
      ball.angle = Math.abs(ball.angle);
    }
  }
  if (ball.x < 0) {
    setScore(rightPlayer);
    resetBallPosition();
  }

  if (ball.y < ball.r) {
    ball.angle += ball.dir * 90;
    ball.y = ball.r;
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
    ball.dir = 1
  }
  if (
    ball.x > rightPlayer.x - w &&
    ball.x < rightPlayer.x + w &&
    ball.y > rightPlayer.y &&
    ball.y < rightPlayer.y + h
  ) {
    ball.velocity = ball.defaultVelocity * -1;
    ball.dir = -1;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2, 0, 0, 360);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.fillStyle = "green";
  ctx.fill();
}

function moveBall() {
  ball.x += getBallX(ball);
  ball.y += getBallY(ball);
}

function getBallX(ball) {
  return Math.cos(ball.angle * (Math.PI / 180)) * ball.velocity;
}

function getBallY(ball) {
  return Math.sin(ball.angle * (Math.PI / 180)) * ball.velocity;
}
