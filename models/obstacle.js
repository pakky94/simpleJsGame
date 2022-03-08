import { Block } from "./block.js";

export class Obstacle {
  constructor(parent) {
    this._parent = parent;
    this._parentWidth = parseInt(parent.style.width);
    this._parentHeight = parseInt(parent.style.height);

    this.upperBlock = new Block(parent);
    this.lowerBlock = new Block(parent);
    this.disabled = false;
    this._visibility = "unset";
  }

  get visibility() {
    return this._visibility;
  }
  set visibility(val) {
    this.lowerBlock.div.style.visibility = val;
    this.upperBlock.div.style.visibility = val;
  }

  set x(value) {
    this.lowerBlock.x = value;
    this.upperBlock.x = value;
  }
  get x() {
    return this.upperBlock.x;
  }

  randomizeY(gapSize) {
    let r = parseInt(Math.random() * (this._parentHeight - gapSize));

    this.upperBlock.y = 0;
    this.upperBlock.height = r;
    this.lowerBlock.y = r + gapSize;
    this.lowerBlock.height = this._parentHeight - gapSize - r;
  }

  enable() {
    this.disabled = false;
    this.visibility = "unset";
  }
  disable() {
    this.disabled = true;
    this.visibility = "hidden";
  }

  collides(other) {
    if (this.disabled) return false;
    return this.upperBlock.collides(other) || this.lowerBlock.collides(other);
  }
}
