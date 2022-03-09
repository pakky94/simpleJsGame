import { Block } from "./block.js";

export class Barrier {
  constructor(parent, gapSize = 150) {
    this._parent = parent;

    this.upperBlock = new Block(parent, "barrier");
    this.lowerBlock = new Block(parent, "barrier");
    this.randomizeY(gapSize);
    this.x = this._parent.clientWidth;
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
    let r = parseInt(Math.random() * (this._parent.clientHeight - gapSize));

    this.upperBlock.y = 0;
    this.upperBlock.height = r;
    this.lowerBlock.y = r + gapSize;
    this.lowerBlock.height = this._parent.clientHeight - gapSize - r;
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
