import { Player } from "./models/player.js";
import { ObstacleCollection } from "./models/obstacleCollection.js";
import { Keyboard } from "./keyboard.js";

const screenWidth = 600, screenHeight = 400;

document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById("game-area");
  const scoreOut = document.getElementById("score");

  let tickSpeed = 15;

  let game = new Game(gameArea, scoreOut);
  document.getElementById("play-btn").onclick = () => game.play();
  document.getElementById("pause-btn").onclick = () => game.pause();
  document.getElementById("reset-btn").onclick = () => game.reset();

  setInterval(() => game.tick(), tickSpeed);
});

class GameState {
  constructor(scoreOut) {
    this.scoreOut = scoreOut;

    this.score = 0;
    this.playerSpeed = 5;
    this.obstaclesDistance = parseInt(screenWidth / 2);
    this.gapSize = 150;
  }

  get score() { return this._score; }
  set score(val) {
    this._score = val;
    this.scoreOut.innerText = val;
  }

  get obstacleSpeed() {
    return 1.2 + (this.score / 3000);
  }
}

class Game {
  constructor(gameArea, scoreOut) {
    this.currentStep = "init";

    this.state = new GameState(scoreOut);
    this.player = new Player(gameArea);
    this.keyboard = new Keyboard();
    this.obstacles = new ObstacleCollection(gameArea);
  }

  tick() {
    switch (this.currentStep) {
      case "init":
        this.state.score = 0;
        this.player.x = 20;
        this.player.y = parseInt((screenHeight - 50) / 2);
        this.obstacles.destroyAll();

        this.currentStep = "playing";
        break;
      case "playing":
        this.state.score += 1;
        this.player.processKeys(this.keyboard);

        this.obstacles.moveAllLeft(this.state.obstacleSpeed);

        if ((screenWidth - this.obstacles.lastObstacleX()) > this.state.obstaclesDistance) {
          this.obstacles.createNewBarrier(screenWidth, this.state.gapSize);
        }

        if (this.obstacles.collides(this.player)) {
          this.currentStep = "gameover";
        }
        break;
      case "paused":
        break;
      case "gameover":
        break;
    }
  }

  play() {
    if (this.currentStep === "gameover")
      this.currentStep = "init"
    else if (this.currentStep === "paused")
      this.currentStep = "playing"
  }

  pause() {
    if (this.currentStep === "playing")
      this.currentStep = "paused"
  }

  reset() {
    this.currentStep = "init";
  }
}
