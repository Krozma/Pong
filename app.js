const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;

function run() {
  requestAnimationFrame(run);
}
requestAnimationFrame(run);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      move(-1);
      break;
    case "ArrowDown":
      move(1);
      break;
  }
});

function move(dir){
    console.log(dir)
}