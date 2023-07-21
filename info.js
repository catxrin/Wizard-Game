import { xpBar } from "./data.js";
import { healthBar } from "./data.js";

const infoBar = document.getElementById("information-bar");
const infoCtx = infoBar.getContext("2d");

infoCtx.roundRect(20, 20, 300, 300, 8);
infoCtx.fillStyle = "#202020";
infoCtx.fill();

infoCtx.font = "30px Arial";
infoCtx.fillStyle = "white";
infoCtx.fillText("Vital Signs", 100, 75);

infoCtx.font = "15px Arial";
infoCtx.fillStyle = "white";
infoCtx.fillText("Level 1", 212, 95);

export function createBar(value, y, color, score, type) {
  infoCtx.font = "14px Roses are FF0000";
  infoCtx.fillStyle = "white";
  infoCtx.fillText(value, 215, y - 5);

  infoCtx.font = "16px Roses are FF0000";
  infoCtx.fillStyle = "white";
  infoCtx.fillText(type, 55, y - 5);

  infoCtx.strokeStyle = "black";
  infoCtx.beginPath();
  infoCtx.roundRect(50, y, 240, 35, 50);
  infoCtx.fillStyle = "#444444";
  infoCtx.fill();

  infoCtx.beginPath();
  infoCtx.shadowColor = "#202020c4";
  infoCtx.shadowBlur = 10;
  infoCtx.shadowOffsetX = 3;
  infoCtx.shadowOffsetY = 1;

  infoCtx.roundRect(50, y, score * 2 + 40, 35, 50);
  infoCtx.fillStyle = color;
  infoCtx.fill();
}

function updateBar() {
  infoCtx.clearRect(0, 475, canvas.clientWidth, canvas.height);

  createBar(
    `${xpBar.currentXp}/${xpBar.maxXp}`,
    140,
    xpBar.color,
    xpBar.currentXp,
    "XP"
  );

  createBar(
    `${healthBar.currentLife}/${healthBar.maxLife}`,
    220,
    healthBar.color,
    healthBar.currentLife,
    "Health"
  );
  requestAnimationFrame(updateBar);
}
updateBar();
