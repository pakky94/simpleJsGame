import { Player } from "./models/player.js";
import { Obstacle } from "./models/obstacle.js";

const gameArea = document.getElementById("game-area");
const scoreOut = document.getElementById("score");
let score = 0;

const screenWidth = 600, screenHeight = 400;
let playerSpeed = 5;
let obstaclesDistance = parseInt(screenWidth / 2);
let obstacleSpeed = 10;
let tickSpeed = 400;
let gapSize = 150;

let player = new Player(gameArea, playerSpeed);
player.bindKeyEvents(document);

let obstacles = [];

function getDisabledObstacle() {
  for (let o of obstacles) {
    if (o.disabled)
      return o;
  }

  // Create new
  let o = new Obstacle(gameArea, obstacleSpeed, gapSize);
  o.disable();
  obstacles.push(o);
  return o;
}

function reset() {
  player.x = 20;
  player.y = parseInt((screenHeight - 50) / 2);

  for (let o of obstacles) {
    o.disable();
  }
}

function Update() {
  let lastObstacleX = 0;
  score += 5;
  scoreOut.innerText = score;

  for (let o of obstacles) {
    if (o.disabled) continue;

    if (o.x > lastObstacleX)
      lastObstacleX = o.x;

    o.tick();

    if (o.collides(player)) {
      console.log("COLLISION");
      reset();
    }
  }

  if ((screenWidth - lastObstacleX) > obstaclesDistance) {
    let o = getDisabledObstacle();
    o.x = screenWidth;
    o.randomizeY();
    o.enable();
  }

  setTimeout(Update, tickSpeed);
}

setTimeout(Update, tickSpeed);
