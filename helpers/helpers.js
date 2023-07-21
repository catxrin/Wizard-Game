import { collection } from "../data.js";
import { map } from "../data.js";
import { levels } from "../data.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function gameOver() {
  ctx.font = "40px Roses are FF0000";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

export function levelCompleted(levelNum) {
  canvas.classList.remove("bg");
  canvas.classList.add("win-bg");
  ctx.font = "40px Roses are FF0000";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Level Completed!", canvas.width / 2, canvas.height / 2);
  levels[levelNum - 1].completed = true;
  map.map = true;
}

export function timer(minutes, seconds, level) {
  let timeLeft = document.createElement("p");
  timeLeft.innerText = `Time left: ${minutes}:${seconds}`;
  const game = document.querySelector(".game");
  game.appendChild(timeLeft);

  let interval = setInterval(() => {
    if (seconds >= 1) {
      seconds--;
    }
    if (seconds === 0 && minutes >= 1) {
      seconds = 59;
      minutes--;
    }
    if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
    }

    if (level.completed === true) {
      clearInterval(interval);
    }

    timeLeft.innerText = `Time left: ${minutes}:${
      seconds >= 0 && seconds < 10 ? "0" : ""
    }${seconds}`;

    if (minutes <= 0 && seconds <= 10) {
      timeLeft.classList.add("timeOut");
    }
    if (
      (seconds === 0 && minutes === 0 && collection[0].active === true) ||
      (seconds === 0 && minutes === 0 && collection[1].active === true)
    ) {
      gameOver();
    }
  }, 1000);
}
