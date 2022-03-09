import { Block } from "./block.js";

export class Bullet extends Block {
  constructor(parent) {
    super(parent, "bullet");

    this.width = 30;
    this.height = 30;
    this.x = this._parentWidth;
    this.y = Math.random() * (this._parentHeight - this.height);
  }

  moveLeft(value) {
    this.x -= 1.4 * value;
  }
}
