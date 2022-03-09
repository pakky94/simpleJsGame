import { Barrier } from "./barrier.js";

export class ObstacleCollection {
  constructor(parent, screenWidth) {
    this.obstacles = []
    this._parent = parent;
    this._screenWidth = screenWidth;
  }

  moveAllLeft(value) {
    for (let o of this.obstacles) {
      o.x -= value;

      if (o.x <= 0)
        o.destroy();
    }
    this.obstacles = this.obstacles.filter(o => o.x > 0);
  }

  addNewObstacleIfGap(gap, gapSize) {
    if (this._screenWidth - this.lastObstacleX() >= gap) {
      this.createNewBarrier(this._screenWidth, gapSize);
    }
  }

  createNewBarrier(position, gapSize) {
    this.obstacles.push(new Barrier(this._parent, gapSize, position));
  }

  collides(other) {
    for (let o of this.obstacles)
    {
      if (o.collides(other))
        return true;
    }

    return false;
  }

  lastObstacleX() {
    return Math.max(this.obstacles.map(o => o.x))
  }

  destroyAll() {
    for (let o of this.obstacles)
      o.destroy();
    this.obstacles = [];
  }
}
