import { Block } from "./models/block.js";
import { Player } from "./models/player.js";

const gameArea = document.getElementById("game-area");
const screenWidth = 600, screenHeight = 400;
let playerSpeed = 5;
let obstaclesDistance = parseInt(screenWidth / 2);
let obstacleSpeed = 10;
let tickSpeed = 400;
let gapSize = 150;

let player = new Player(gameArea, playerSpeed);
player.bindKeyEvents(document);

let obstacles = [];

function createObstacle(block1, block2) {
  return {
    upperBlock: block1,
    lowerBlock: block2,
    disabled: false,

    _visibility: "unset",
    get visibility() {
      return this._visibility;
    },
    set visibility(val) {
      this.lowerBlock.div.style.visibility = val;
      this.upperBlock.div.style.visibility = val;
    },

    tick: function () {
      if (this.disabled)
        return;

      this.x -= obstacleSpeed;

      if (this.upperBlock.x <= 0) {
        this.x = screenWidth;
        this.disable();
      }
    },

    set x(value) {
      this.lowerBlock.x = value;
      this.upperBlock.x = value;
    },
    get x() {
      return this.upperBlock.x;
    },

    randomizeY: function () {
      let r = parseInt(Math.random() * (screenHeight - gapSize));

      this.upperBlock.y = 0;
      this.upperBlock.height = r;
      this.lowerBlock.y = r + gapSize;
      this.lowerBlock.height = screenHeight - gapSize - r;
    },

    enable: function () {
      this.disabled = false;
      this.visibility = "unset";
    },
    disable: function () {
      this.disabled = true;
      this.visibility = "hidden";
    },

    collides: function (other) {
      if (this.disabled) return false;
      return this.upperBlock.collides(other) || this.lowerBlock.collides(other);
    },
  }
}

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowUp":
      player.moveUp(playerSpeed);
      break;
    case "ArrowDown":
      player.moveDown(playerSpeed);
      break;
    case "ArrowLeft":
      player.moveLeft(playerSpeed);
      break;
    case "ArrowRight":
      player.moveRight(playerSpeed);
      break;
  }
}

function getDisabledObstacle() {
  for (let o of obstacles) {
    if (o.disabled)
      return o;
  }

  // Create new
  let o = createObstacle(new Block(gameArea), new Block(gameArea));
  o.disable();
  obstacles.push(o);
  return o;
}

function Update() {
  let lastObstacleX = 0;

  for (let o of obstacles) {
    if (o.disabled) continue;

    if (o.x > lastObstacleX)
      lastObstacleX = o.x;

    o.tick();

    if (o.collides(player)) {
      console.log("COLLISION");
    }
  }

  if ((screenWidth - lastObstacleX) > obstaclesDistance) {
    let o = getDisabledObstacle();
    o.x = screenWidth;
    o.randomizeY();
    o.enable();
  }

  setTimeout(Update, tickSpeed);
}

setTimeout(Update, tickSpeed);
