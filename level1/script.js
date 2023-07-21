import { player, walkingGhost } from "../data.js";
import { enemies } from "../data.js";
import { playersLaser } from "../data.js";
import { xpBar } from "../data.js";
import { collection } from "../data.js";
import { timer } from "../helpers/helpers.js";
import { levelCompleted } from "../helpers/helpers.js";
import { levels } from "../data.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const laser = canvas.getContext("2d");
const ball = document.getElementById("ball");
const enemy = canvas.getContext("2d");
const variableSpeed = 1;
canvas.classList.add("bg");

let image = new Image();
image.src = "img/wizard_frame-0-right.png";
image.classList.add("source");

let imagesRight = [];
let imagesLeft = [];
let currentImage = imagesRight;

let speed = variableSpeed;
let laserCoords = 0;

let ghost = new Image();
let secondFace = new Image();

function generateGif(direction, arr) {
  for (let i = 0; i <= 5; i++) {
    arr.push(`img/wizard_frame-${i}-${direction}.png`);
  }
}
generateGif("right", imagesRight);
generateGif("left", imagesLeft);

setInterval(() => {
  for (let i = 0; i < imagesRight?.length; i++) {
    setTimeout(
      () => {
        image.src = currentImage[i];
      },
      800 * i,
      i
    );
  }
}, 1000);

timer(levels[0].time[0], levels[0].time[1], levels[0]);

function detectWalls() {
  if (player.x < 10) {
    player.x = 10;
  } else if (player.x > canvas.width - (player.w + 10)) {
    player.x = canvas.width - (player.w + 10);
  }
}

function clearEnemies() {
  enemies?.map((el) => {
    enemy.clearRect(el.x, el.y, el.w, el.h);
  });
}

function moveEnemies() {
  if (enemies[0]?.x + enemies[0]?.w <= 70) speed = variableSpeed;
  if (enemies[enemies.length - 1]?.x + enemies[enemies.length - 1]?.w >= 600) {
    speed = -variableSpeed;
  }
  enemies.forEach((en) => (en.x += speed));
}

function drawEnemy() {
  enemies.map((el) => {
    ghost.src = el.avatar;

    if (el.secondFace) {
      secondFace.src = "img/ghost-red.png";
    }

    enemy.drawImage(ghost, el.x, el.y, el.w, el.h);
  });
}

function drawLaser() {
  laser.drawImage(
    ball,
    playersLaser.x,
    playersLaser.y,
    playersLaser.w,
    playersLaser.h
  );
}

let currentLaser = true;

function moveLaser() {
  playersLaser.x = laserCoords;
  playersLaser.y = playersLaser.y - playersLaser.speed;
}

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function changePosition() {
  player.x += player.dx;
  detectWalls();
}

function clear() {
  ctx.clearRect(0, 475, canvas.clientWidth, canvas.height);
}

function detectEnemies() {
  enemies.forEach((el) => {
    if (
      el.x + (el.w - 20) >= playersLaser.x &&
      playersLaser.x + (playersLaser.w - 20) >= el.x &&
      el.y + el.h >= playersLaser.y &&
      playersLaser.y + playersLaser.h >= el.h
    ) {
      if (!el.secondFace) {
        enemies.splice(enemies.indexOf(el), 1);
        enemy.clearRect(el.x, el.y, el.w, el.h);
        xpBar.currentXp += 1;
      } else {
        el.avatar = "img/ghost-red.png";
        setTimeout(() => {
          el.secondFace = false;
        }, 1000);
      }
    }
    if (enemies.length < 1) {
      collection[0].active = false;
      collection[1].active = true;
    }
  });
}

function detectFinalGhost() {
  if (
    walkingGhost.x + walkingGhost.w >= playersLaser.x &&
    playersLaser.x + playersLaser.w >= walkingGhost.x &&
    walkingGhost.y + walkingGhost.h >= playersLaser.y &&
    playersLaser.y + playersLaser.h >= walkingGhost.h
  ) {
    collection[1].active = false;
    xpBar.currentXp += 2;
    setTimeout(() => {
      levelCompleted(1);
    }, 1000);
  }
}

function clearLaser() {
  laser.clearRect(
    playersLaser.x,
    playersLaser.y,
    playersLaser.w,
    playersLaser.h
  );
}

function updateEnemies() {
  if (collection[0].active === true) {
    clearEnemies();
    moveEnemies();
    drawEnemy();
  }
}

function updateWizard() {
  clear();
  changePosition();
  drawPlayer();
}

function createLasser() {
  clearLaser();
  moveLaser();
  drawLaser();
  if (collection[1].active) {
    detectFinalGhost();
  }
}

let disableLaser = false;
function updateLaser() {
  if (playersLaser.y + playersLaser.h > 1) {
    createLasser();
    requestAnimationFrame(updateLaser);
  } else {
    playersLaser.y = canvas.height - 150;
    playersLaser.x = laserCoords;
    clearLaser();
  }
  if (playersLaser.y <= 10 || playersLaser.y === 450) {
    disableLaser = false;
  } else if (playersLaser.y > 10) {
    disableLaser = true;
  }
}
function update() {
  updateEnemies();
  detectEnemies();

  updateWizard();

  requestAnimationFrame(update);
}

update();

function keyDown(e) {
  if (e.key == "ArrowRight" || e.key == "Right") {
    player.dx = +player.speed;
    currentImage = imagesRight;
  }
  if (e.key == "ArrowLeft" || e.key == "Left") {
    player.dx = -player.speed;
    currentImage = imagesLeft;
  }

  if (e.key == "Enter") {
    if (disableLaser) {
      e.preventDefault();
      return false;
    } else if (!disableLaser) {
      laserCoords = player.x + player.w / 2;
      updateLaser();
    }
  }
}

function keyUp(e) {
  if (
    e.key == "ArrowLeft" ||
    e.key == "Left" ||
    e.key == "ArrowRight" ||
    e.key == "Right"
  ) {
    player.dx = 0;
  }
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
