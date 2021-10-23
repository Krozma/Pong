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
  dir: 0
};
const rightPlayer = {
  x: W - gap - w,
  y: H / 2 - h / 2,
  h: h,
  w: w,
  score: 0,
  dir: 0
};
const ball = {
  x: W / 2,
  y: H / 2,
  r: 8,
  dir: 1,
  velocity: 10,
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
  movePlayer(leftPlayer);
  movePlayer(rightPlayer);
  //log();
}
requestAnimationFrame(run);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      leftPlayer.dir = -1;
      break;
    case "KeyS":
      leftPlayer.dir = 1;
      break;
    case "ArrowUp":
      rightPlayer.dir = -1;
      break;
    case "ArrowDown":
      rightPlayer.dir = 1;
    break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      leftPlayer.dir = 0;
      break;
    case "KeyS":
      leftPlayer.dir = 0;
      break;
    case "ArrowUp":
      rightPlayer.dir = 0;
      break;
    case "ArrowDown":
      rightPlayer.dir = 0;
    break;
  }
});

function log(){
  document.getElementById('dir').innerText = 'd:' + ball.dir;
  document.getElementById('angle').innerText = 'a:' + ball.angle;
  document.getElementById('x').innerText = 'x:' + parseInt(ball.x);
  document.getElementById('y').innerText = 'y:' + parseInt(ball.y);
}

function movePlayer(player) {
  player.y += player.dir * 10;
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
    ball.dir = 1;
    const y = leftPlayer.y + leftPlayer.h/2 - ball.y;
    const p = y/(leftPlayer.h/2);
    ball.angle = -45* p;
    }
  if (
    ball.x > rightPlayer.x - w &&
    ball.x < rightPlayer.x + w &&
    ball.y > rightPlayer.y &&
    ball.y < rightPlayer.y + h
  ) {
    ball.dir = -1;
    const y = rightPlayer.y + rightPlayer.h/2 - ball.y;
    const p = y/(rightPlayer.h/2);
    ball.angle = 45* p;
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
  return Math.cos(ball.angle * (Math.PI / 180)) * ball.velocity* ball.dir;
}

function getBallY(ball) {
  return Math.sin(ball.angle * (Math.PI / 180)) * ball.velocity* ball.dir;
}
