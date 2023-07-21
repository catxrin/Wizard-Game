import { walkingGhost } from "../data.js";
import { collection } from "../data.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ghost = new Image();
ghost.src = `img/walkingGhost/walking-ghost-right-0.png`;
let speed = 5;

let ghostLeft = [];
let ghostRight = [];
let currentImage = ghostRight;

function generateGifGhost(direction, arr) {
  for (let i = 0; i < 4; i++) {
    arr.push(`img/walkingGhost/walking-ghost-${direction}-${i}.png`);
  }
}

generateGifGhost("left", ghostLeft);
generateGifGhost("right", ghostRight);
setInterval(() => {
  for (let i = 0; i < ghostRight?.length; i++) {
    setTimeout(
      () => {
        ghost.src = currentImage[i];
      },
      200 * i,
      i
    );
  }
}, 1000);

function clearGhost() {
  ctx.clearRect(walkingGhost.x, walkingGhost.y, walkingGhost.w, walkingGhost.h);
}

function drawGhost() {
  ctx.drawImage(
    ghost,
    walkingGhost.x,
    walkingGhost.y,
    walkingGhost.w,
    walkingGhost.h
  );
}

function changePosition() {
  if (walkingGhost.x >= 600) {
    speed = -5;
    currentImage = ghostLeft;

    walkingGhost.y = Math.round(Math.random() * 300);
  } else if (walkingGhost.x < 0) {
    speed = 5;
    currentImage = ghostRight;
  }
  walkingGhost.x += speed;
}

function updateGost() {
  if (collection[1].active === true) {
    clearGhost();
    changePosition();
    drawGhost();
  } else {
    clearGhost();
  }
  requestAnimationFrame(updateGost);
}

updateGost();
