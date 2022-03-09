import { Block } from "./block.js";

export class Barrier {
  constructor(parent, gapSize = 150, position = 0) {
    this._parent = parent;
    this._parentWidth = parseInt(parent.style.width);
    this._parentHeight = parseInt(parent.style.height);

    this.upperBlock = new Block(parent, "barrier");
    this.lowerBlock = new Block(parent, "barrier");
    this.randomizeY(gapSize);
    this.x = position;
  }

  moveLeft(value) {
    this.x -= value;
  }

  get x() {
    return this.upperBlock.x;
  }
  set x(value) {
    this.lowerBlock.x = value;
    this.upperBlock.x = value;
  }

  randomizeY(gapSize) {
    let r = parseInt(Math.random() * (this._parentHeight - gapSize));

    this.upperBlock.y = 0;
    this.upperBlock.height = r;
    this.lowerBlock.y = r + gapSize;
    this.lowerBlock.height = this._parentHeight - gapSize - r;
  }

  collides(other) {
    if (this.disabled) return false;
    return this.upperBlock.collides(other) || this.lowerBlock.collides(other);
  }

  destroy() {
    this.upperBlock.destroy();
    this.lowerBlock.destroy();
  }
}
