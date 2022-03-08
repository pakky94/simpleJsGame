import { Player } from "./models/player.js";
import { ObstacleCollection } from "./models/obstacleCollection.js";

document.addEventListener('DOMContentLoaded', () => {
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

  let obstacles = new ObstacleCollection(gameArea, obstacleSpeed, gapSize);

  function reset() {
    player.x = 20;
    player.y = parseInt((screenHeight - 50) / 2);
    obstacles.disableAll();
  }

  function Update() {
    score += 5;
    scoreOut.innerText = score;

    obstacles.moveAllLeft(obstacleSpeed);

    if (obstacles.collides(player)) {
      console.log("COLLISION");
      reset();
    }

    if ((screenWidth - obstacles.lastObstacleX()) > obstaclesDistance) {
      obstacles.createNewRandomized(screenWidth, gapSize);
    }

    setTimeout(Update, tickSpeed);
  }

  setTimeout(Update, tickSpeed);
});
