export class Score {
  #gameArea;
  #animationThreshold;
  #currentScore;
  #lastScore;

  constructor(gameArea, divId) {
    this.#animationThreshold = 1000;
    this.#gameArea = gameArea;

    this.div = document.getElementById(divId);
    this.#currentScore = 0;
    this.#lastScore = 0;
  }

  get current() {
    return this.#currentScore;
  }

  increase() {
    this.updateScore(this.#currentScore + 1);
  }

  reset() {
    this.#currentScore = 0;
    this.#lastScore = 0;
  }

  updateScore(score) {
    this.#currentScore = score;
    this.div.innerHTML = score;

    if (this.isAnimationThreshold() && !this.isDivAnimated()) {
      this.addAnimation();
    }

    this.#lastScore = this.#currentScore;
  }

  isAnimationThreshold() {
    if (this.#lastScore > this.#currentScore)
      return false;

    const lastMilestone = Math.floor(this.#lastScore / this.#animationThreshold);
    const currentMilestone = Math.floor(this.#currentScore / this.#animationThreshold);
    return lastMilestone !== currentMilestone;
  }

  isDivAnimated() {
    return this.div.classList.contains("animated");
  }

  addAnimation() {
    this.div.classList.add("animated");
    this.#gameArea.classList.add('shake');

    setTimeout(() => {
      this.div.classList.remove("animated");
      this.#gameArea.classList.remove("shake");
    }, 1000);
  }
}
