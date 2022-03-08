import { Obstacle } from "./obstacle.js";

export class ObstacleCollection {
  constructor(parent, obstacleSpeed = 10, gapSize = 150) {
    this.obstacles = []
    this._parent = parent;
    this._obstacleSpeed = obstacleSpeed;
    this._gapSize = gapSize;
  }

  get obstacleSpeed() { return this._obstacleSpeed; }
  set obstacleSpeed(value) {
    this._obstacleSpeed = value;
    for (let o of this.obstacles)
      o.speed = value;
  }

  get gapSize() { return this._gapSize; }
  set obstacleSpeed(value) {
    this._gapSize = value;
    for (let o of this.obstacles)
      o.gapSize = value;
  }

  moveAllLeft(value) {
    for (let o of this.obstacles) {
      o.tick();
      //if (o.disabled)
        //continue;

      //o.x -= value;
    }
  }

  createNewRandomized(position, gapSize) {
    let o = this.getNew();
    o.x = position;
    o.randomizeY();
    o.enable();
  }

  getNew() {
    for (let o of this.obstacles) {
      if (o.disabled)
        return o;
    }

    // Create new
    let o = new Obstacle(this._parent, this.obstacleSpeed, this.gapSize);
    o.disable();
    this.obstacles.push(o);
    return o;
  }

  collides(other) {
    for (let o of this.obstacles)
    {
      if (o.disabled) continue;

      if (o.collides(other))
        return true;
    }

    return false;
  }

  lastObstacleX() {
    let lastObstacleX = 0;

    for (let o of this.obstacles) {
      if (o.disabled) continue;

      if (o.x > lastObstacleX)
        lastObstacleX = o.x;
    }

    return lastObstacleX;
  }

  disableAll() {
    for (let o of this.obstacles)
      o.disable();
  }
}
