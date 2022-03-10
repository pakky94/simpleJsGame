import { Block } from "./block.js";

export class Barrier {
  #upperBlock; #lowerBlock;

  constructor(parent, gapSize = 150) {
    this._parent = parent;

    let r = parseInt(Math.random() * (this._parent.clientHeight - gapSize));
    this.#upperBlock = new Block(parent, "barrier", 0, 0, r);
    this.#lowerBlock = new Block(parent, "barrier", 0, r + gapSize, this._parent.clientHeight - gapSize - r);
    this.x = this._parent.clientWidth;
  }

  moveLeft(value) {
    this.x -= value;
  }

  get x() {
    return this.#upperBlock.x;
  }
  set x(value) {
    this.#lowerBlock.x = value;
    this.#upperBlock.x = value;
  }

  collides(other) {
    return this.#upperBlock.collides(other) || this.#lowerBlock.collides(other);
  }

  destroy() {
    this.#upperBlock.destroy();
    this.#lowerBlock.destroy();
  }
}
