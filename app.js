const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const playerOne = {
  x: 10,
  y: H/2 - 90/2,
  h: 90,
  w: 10
}
function run() {
  requestAnimationFrame(run);
  clear();
  drawPlayerOne();
}
requestAnimationFrame(run);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      movePlayerOne(-1);
      break;
    case "ArrowDown":
      movePlayerOne(1);
      break;
  }
});

function movePlayerOne(dir){
  playerOne.y += dir* 20;
}

function clear(){
  canvas.width = 0;
  canvas.width = W;
}

function drawPlayerOne(){
  ctx.beginPath();
  ctx.rect(playerOne.x, playerOne.y, playerOne.w, playerOne.h)
  ctx.stroke();
  ctx.fillStyle = "gray";
  ctx.fill();
}

