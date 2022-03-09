export class GameState {
  constructor(scoreOut) {
    this.scoreOut = scoreOut;

    this.score = 0;
    this.playerSpeed = 5;
    this.obstaclesDistance = 300;
    this.gapSize = 150;
    this.onscoreupdated = null;
  }

  get score() { return this._score; }
  set score(val) {
    this._score = val;
    this.onscoreupdated?.(val);
  }

  get obstacleSpeed() {
    return 1.2 + (this.score / 2000);
  }

  get bulletChance() {
    return 0.01 * (1 + this.score * 0.00001);
  }
}
