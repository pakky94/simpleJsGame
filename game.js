import { Player } from "./models/player.js";
import { ObstacleCollection } from "./models/obstacleCollection.js";
import { Keyboard } from "./keyboard.js";
import { ScoreOutput } from "./models/scoreOutput.js";

const screenWidth = 600, screenHeight = 400;

document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById("game-area");
  const scoreOut = new ScoreOutput("score");

  let tickSpeed = 15;

  let game = new Game(gameArea, scoreOut);
  document.getElementById("play-btn").onclick = () => game.play();
  document.getElementById("pause-btn").onclick = () => game.pause();
  document.getElementById("reset-btn").onclick = () => game.reset();
  game.ondeath = () => document.getElementById("death-audio").play();

  game.state.onscoreupdated = score => scoreOut.updateScore(score);

  setInterval(() => game.tick(), tickSpeed);
});

class GameState {
  constructor(scoreOut) {
    this.scoreOut = scoreOut;

    this.score = 0;
    this.playerSpeed = 5;
    this.obstaclesDistance = parseInt(screenWidth / 2);
    this.gapSize = 150;
    this.onscoreupdated = null;
  }

  get score() { return this._score; }
  set score(val) {
    this._score = val;
    this.onscoreupdated?.(val);
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
    this.obstacles = new ObstacleCollection(gameArea, screenWidth);
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
        this.obstacles.addNewObstacleIfGap(this.state.obstaclesDistance, this.state.gapSize);

        if (this.obstacles.collides(this.player)) {
          this.currentStep = "death";
        }
        break;
      case "paused":
        break;
      case "death":
        this.ondeath?.();
        this.currentStep = "gameover";
        break;
      case "gameover":
        break;
    }
  }

  play() {
    if (this.currentStep === "gameover" || this.currentStep === "death")
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
