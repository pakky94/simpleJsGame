class Overlay {
  #div;
  #visible;

  constructor(gameArea, divId = "", inner = document.createElement('div')) {
    this.#div = document.createElement('div');
    this.#div.id = divId;
    this.#div.classList.add('overlay');
    this.#div.appendChild(inner);
    this.#visible = true;

    this.hide();
    gameArea.appendChild(this.#div);
  }

  _hide() {
    if (!this.#visible) return;

    this.#visible = false;
    this.#div.style.visibility = 'hidden';
  }

  _show() {
    if (this.#visible) return;

    this.#visible = true;
    this.#div.style.visibility = '';
  }
}

export class GameOverOverlay extends Overlay {
  #finalScoreSpan;

  constructor(gameArea) {
    let inner = document.createElement('div');
    inner.id = "gameover-inner-div";
    inner.innerHTML = "<h1>GAME OVER</h1><h2 style='text-align: center'>Score: <span id='final-score-span'></span></h2>";

    super(gameArea, "gameover-overlay", inner);
    this.#finalScoreSpan = document.getElementById('final-score-span');
  }

  hide() {
    this._hide();
  }

  show(score) {
    this._show();
    this.#finalScoreSpan.innerText = score;
  }
}

export class PauseOverlay extends Overlay {
  constructor(gameArea, resumeCallback) {

    let inner = document.createElement('div');
    inner.id = "pause-overlay-inner-div";
    inner.innerHTML = "<i class='bi bi-pause-fill' style='font-size: 120px'></i>";

    let resumeBtn = document.createElement('button');
    resumeBtn.innerText = 'Resume';
    resumeBtn.onclick = resumeCallback;
    inner.appendChild(resumeBtn);

    super(gameArea, "pause-overlay", inner);
  }

  hide() {
    this._hide();
  }

  show() {
    this._show();
  }
}
