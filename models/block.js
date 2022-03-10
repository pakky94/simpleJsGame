export class Block {
  #x; #y; #width; #height;

  constructor(parent, className, x = 0, y = 0, height = 50, width = 20) {
    this._parent = parent;

    this.div = document.createElement('div');
    this.div.style.position = "absolute";
    if (className !== undefined)
      this.div.classList.add(className);

    this._parent.appendChild(this.div);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get x() {
    return this.#x;
  }
  set x(value) {
    this.#x = value;
    this.div.style.left = `${value}px`;
  }

  get y() {
    return this.#y;
  }
  set y(value) {
    this.#y = value;
    this.div.style.top = `${value}px`;
  }

  get width() {
    return this.#width;
  }
  set width(value) {
    this.#width = value;
    this.div.style.width = `${value}px`;
  }

  get height() {
    return this.#height;
  }
  set height(value) {
    this.#height = value;
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
