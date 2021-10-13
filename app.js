const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const w = 20;
const h = 150;
const gap = 20;
const playerOne = {
  x: gap,
  y: H/2 - h/2,
  h: h,
  w: w
}
const playerTwo = {
  x: W - gap - w,
  y: H/2 - h/2,
  h: h,
  w: w
}
function run() {
  requestAnimationFrame(run);
  clear();
  drawPlayer(playerOne);
  drawPlayer(playerTwo);
}
requestAnimationFrame(run);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      movePlayer(-1, playerOne);
      break;
    case "ArrowDown":
      movePlayer(1, playerOne);
      break;
    case "KeyW":
      movePlayer(-1, playerTwo);
      break;
    case "KeyS":
      movePlayer(1, playerTwo);
      break;
  }
});

function movePlayer(dir, player){
  player.y += dir* 20;
}

function clear(){
  canvas.width = 0;
  canvas.width = W;
}

function drawPlayer(player){
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.w, player.h)
  ctx.stroke();
  ctx.fillStyle = "gray";
  ctx.fill();
}