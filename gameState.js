export class GameState {
  #score;

  constructor(score) {
    this.#score = score;

    this.playerSpeed = 5;
    this.obstaclesDistance = 300;
    this.gapSize = 150;
  }

  get score() {
    return this.#score;
  }

  get obstacleSpeed() {
    return 1.2 + (this.score.current / 2000);
  }

  get bulletChance() {
    return 0.01 * (1 + this.score.current * 0.00001);
  }
}
