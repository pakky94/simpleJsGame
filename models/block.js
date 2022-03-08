const screenWidth = 600, screenHeight = 400;

export class Block {
  constructor(parent) {
    this._parent = parent;
    this._x = 0;
    this._y = 0;
    this._width = 20;
    this._height = 50;

    this.div = document.createElement('div');
    this.div.style.position = "absolute";
    this.div.style.background = "green";
    this.div.style.width = `${this._width}px`
    this.div.style.height = `${this._height}px`
    parent.appendChild(this.div);
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this.div.style.left = `${value}px`;
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this.div.style.top = `${value}px`;
  }

  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this.div.style.width = `${value}px`;
  }

  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this.div.style.height = `${value}px`;
  }

  moveLeft(n) {
    this.x = clamp(this.x - n, 0, screenWidth);
  }
  moveRight(n) {
    this.x = clamp(this.x + n, 0, screenWidth - this.width);
  }
  moveUp(n) {
    this.y = clamp(this.y - n, 0, screenHeight);
  }
  moveDown(n) {
    this.y = clamp(this.y + n, 0, screenHeight - this.width);
  }

  collides(other) {
    let xCross = (this.x <= (other.x + other.width)) && ((this.x + this.width) >= other.x);
    let yCross = (this.y <= (other.y + other.height)) && ((this.y + this.height) >= other.y);
    return xCross && yCross;
  }
}

function clamp(val, low, high) {
  if (val < low)
    return low;
  if (val > high)
    return high;
  return val;
}
