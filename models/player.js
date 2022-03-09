import { Block } from "./block.js";

export class Player extends Block {
  constructor(parent, speed = 5) {
    super(parent, "player");

    this.speed = speed;

    this.width = 50;
    this.height = 50;
  }

  moveLeft() {
    this.x = clamp(this.x - this.speed, 0, this._parentWidth);
  }
  moveRight() {
    this.x = clamp(this.x + this.speed, 0, this._parentWidth - this.width);
  }
  moveUp() {
    this.y = clamp(this.y - this.speed, 0, this._parentHeight);
  }
  moveDown() {
    this.y = clamp(this.y + this.speed, 0, this._parentHeight - this.height);
  }

  processKeys(keyboard) {
    keyboard.pressed.forEach(key => {
      switch (key) {
        case "ArrowUp":
          this.moveUp();
          break;
        case "ArrowDown":
          this.moveDown();
          break;
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
      }});
  }
}

function clamp(val, low, high) {
  if (val < low)
    return low;
  if (val > high)
    return high;
  return val;
}
