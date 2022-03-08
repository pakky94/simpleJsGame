import { Obstacle } from "./obstacle.js";

export class ObstacleCollection {
  constructor(parent) {
    this.obstacles = []
    this._parent = parent;
  }

  moveAllLeft(value) {
    for (let o of this.obstacles) {
      if (o.disabled)
        continue;

      o.x -= value;
      if (o.x <= 0) {
        o.disable();
      }
    }
  }

  createNewRandomized(position, gapSize) {
    let o = this.getNew();
    o.x = position;
    o.randomizeY(gapSize);
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
