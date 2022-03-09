export class ScoreOutput {
  constructor(divId) {
    this._animationThreshold = 1000;

    this.div = document.getElementById(divId);
    this._currentScore = 0;
    this._lastScore = 0;
  }

  updateScore(score) {
    this._currentScore = score;
    this.div.innerHTML = score;

    if (this.isAnimationThreshold() && !this.isDivAnimated()) {
      this.addAnimation();
    }

    this._lastScore = this._currentScore;
  }

  isAnimationThreshold() {
    if (this._lastScore > this._currentScore)
      return false;

    const lastMilestone = parseInt(this._lastScore / this._animationThreshold);
    const currentMilestone = parseInt(this._currentScore / this._animationThreshold);
    return lastMilestone !== currentMilestone;
  }

  isDivAnimated() {
    return this.div.classList.contains("animated");
  }

  addAnimation() {
    this.div.classList.add("animated");
    setTimeout(() => {
      this.div.classList.remove("animated");
    }, 1000);
  }
}
