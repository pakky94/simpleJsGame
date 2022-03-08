import { Block } from "./block.js";

export class Player extends Block {
  constructor(parent) {
    super(parent);

    this.div.style.background = "red";
    this.width = 50;
    this.height = 50;
    this.x = 20;
    this.y = parseInt((this._parentHeight - 50) / 2);
  }

  moveLeft(n) {
    this.x = clamp(this.x - n, 0, this._parentWidth);
  }
  moveRight(n) {
    this.x = clamp(this.x + n, 0, this._parentWidth - this.width);
  }
  moveUp(n) {
    this.y = clamp(this.y - n, 0, this._parentHeight);
  }
  moveDown(n) {
    this.y = clamp(this.y + n, 0, this._parentHeight - this.height);
  }
}


function clamp(val, low, high) {
  if (val < low)
    return low;
  if (val > high)
    return high;
  return val;
}
