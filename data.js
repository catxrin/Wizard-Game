export const player = {
  w: 110,
  h: 120,
  x: 20,
  y: canvas.height - 125,
  speed: 4,
  dx: 0,
};

export const playersLaser = {
  w: 10,
  h: 25,
  y: canvas.height - 150,
  x: 0,
  speed: 7.5,
};

export let enemies = [
  {
    x: 20,
    y: 20,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
  },
  {
    x: 90,
    y: 70,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
  },
  {
    x: 170,
    y: 20,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
    secondFace: true,
  },
  {
    x: 250,
    y: 70,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
  },
  {
    x: 330,
    y: 20,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
  },
  {
    x: 410,
    y: 70,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
  },
  {
    x: 480,
    y: 20,
    w: 85,
    h: 80,
    speed: 1,
    avatar: "img/ghost-enemy.png",
    secondFace: true,
  },
];

export const xpBar = {
  maxXp: 100,
  currentXp: 50,
  color: "#e8c766",
};

export const healthBar = {
  maxLife: 100,
  currentLife: 100,
  color: "#7d2027",
};

export const walkingGhost = {
  w: 160,
  h: 120,
  x: 10,
  y: 200,
};

export const collection = [
  {
    name: "Small Ghosts",
    active: true,
  },
  {
    name: "Big Ghost",
    active: false,
  },
];

export const levels = [
  {
    level: 1,
    time: [0, 59],
    completed: false,
    x: 20,
    y: 20,
  },
  {
    level: 2,
    time: [1, 30],
    completed: false,
    x: 30,
    y: 200,
  },
  {
    level: 3,
    time: [0, 59],
    completed: false,
    x: 200,
    y: 20,
  },
  {
    level: 4,
    time: [0, 59],
    completed: false,
    x: 100,
    y: 100,
  },
];

export const map = { map: false };
