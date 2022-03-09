import { Barrier } from "./barrier.js";
import { Bullet } from "./bullet.js";

export class ObstacleCollection {
  constructor(parent, screenWidth) {
    this.obstacles = []
    this._parent = parent;
    this._screenWidth = screenWidth;
  }

  moveAllLeft(value) {
    for (let o of this.obstacles) {
      o.moveLeft(value);

      if (o.x <= 0)
        o.destroy();
    }
    this.obstacles = this.obstacles.filter(o => o.x > 0);
  }

  addBulletWithProbability(chance) {
    if (Math.random() < chance)
      this.obstacles.push(new Bullet(this._parent))
  }

  addNewBarrierIfGap(gap, gapSize) {
    if (this._screenWidth - this.lastBarrierX() >= gap) {
      this.createNewBarrier(this._screenWidth, gapSize);
    }
  }

  createNewBarrier(position, gapSize) {
    this.obstacles.push(new Barrier(this._parent, gapSize));
  }

  collides(other) {
    for (let o of this.obstacles)
    {
      if (o.collides(other))
        return true;
    }

    return false;
  }

  lastBarrierX() {
    return Math.max(this.obstacles.filter(o => o instanceof Barrier).map(o => o.x));
  }

  destroyAll() {
    for (let o of this.obstacles)
      o.destroy();
    this.obstacles = [];
  }
}
