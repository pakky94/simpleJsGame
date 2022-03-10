import { Player } from "./models/player.js";
import { ObstacleCollection } from "./models/obstacleCollection.js";
import { Keyboard } from "./keyboard.js";
import { GameState } from "./gameState.js";
import { GameOverOverlay, PauseOverlay } from "./overlay.js";

export class Game {
  constructor(gameArea, scoreOut) {
    this._screenWidth = parseInt(gameArea.style.width);
    this._screenHeight = parseInt(gameArea.style.height);

    this.currentStep = "init";

    this.state = new GameState(scoreOut);
    this.player = new Player(gameArea);
    this.keyboard = new Keyboard();
    this.obstacles = new ObstacleCollection(gameArea, this._screenWidth);

    this.gameOverOverlay = new GameOverOverlay(gameArea);
    this.pauseOverlay = new PauseOverlay(gameArea, () => this.play());
  }

  tick() {
    switch (this.currentStep) {
      case "init":
        this.state.score.reset();
        this.player.x = 20;
        this.player.y = parseInt((this._screenHeight - 50) / 2);
        this.obstacles.destroyAll();

        this.gameOverOverlay.hide();

        this.currentStep = "playing";
        break;
      case "playing":
        this.state.score.increase();
        this.player.processKeys(this.keyboard);

        this.obstacles.moveAllLeft(this.state.obstacleSpeed);
        this.obstacles.addNewBarrierIfGap(this.state.obstaclesDistance, this.state.gapSize);
        this.obstacles.addBulletWithProbability(this.state.bulletChance);

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
        this.gameOverOverlay.show(this.state.score.current);
        break;
    }
  }

  play() {
    if (this.currentStep === "gameover" || this.currentStep === "death") {
      this.currentStep = "init";
    }
    else if (this.currentStep === "paused") {
      this.currentStep = "playing";
      this.pauseOverlay.hide();
    }
  }

  pause() {
    if (this.currentStep === "playing") {
      this.currentStep = "paused"
      this.pauseOverlay.show();
    }
  }

  reset() {
    this.currentStep = "init";
  }
}
