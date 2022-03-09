export class Block {
  constructor(parent, className) {
    this._parent = parent;
    this._parentWidth = parseInt(parent.style.width);
    this._parentHeight = parseInt(parent.style.height);

    this.div = document.createElement('div');
    this.div.style.position = "absolute";
    if (className !== undefined)
      this.div.classList.add(className);

    this._parent.appendChild(this.div);

    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 50;
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

  collides(other) {
    let xCross = (this.x <= (other.x + other.width)) && ((this.x + this.width) >= other.x);
    let yCross = (this.y <= (other.y + other.height)) && ((this.y + this.height) >= other.y);
    return xCross && yCross;
  }

  destroy() {
    this._parent.removeChild(this.div);
  }
}
