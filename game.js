const gameArea = document.getElementById("game-area");
const screenWidth = 600, screenHeight = 400;
let playerSpeed = 5;
let obstaclesDistance = parseInt(screenWidth / 2);
let obstacleSpeed = 10;
let tickSpeed = 400;
let gapSize = 150;

let obstacles = [];


function createBlock(divName) {
  let x = 0, y = 0;
  let width = 20;
  let height = 50;
  let div = document.getElementById(divName);
  div.style.position = "absolute";
  div.style.background = "green";
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;

  return {
    div: div,

    _x: x,
    get x() {
      return this._x;
    },
    set x(value) {
      this._x = value;
      this.div.style.left = `${value}px`;
    },

    _y: y,
    get y() {
      return this._y;
    },
    set y(value) {
      this._y = value;
      this.div.style.top = `${value}px`;
    },

    _width: width,
    get width() {
      return this._width;
    },
    set width(value) {
      this._width = value;
      this.div.style.width = `${value}px`;
    },

    _height: height,
    get height() {
      return this._height;
    },
    set height(value) {
      this._height = value;
      this.div.style.height = `${value}px`;
    },

    moveLeft: function (n) {
      this.x = clamp(this.x - n, 0, screenWidth);
    },
    moveRight: function (n) {
      this.x = clamp(this.x + n, 0, screenWidth);
    },
    moveUp: function (n) {
      this.y = clamp(this.y - n, 0, screenHeight);
    },
    moveDown: function (n) {
      this.y = clamp(this.y + n, 0, screenHeight);
    },

    collides: function (other) {
      let xCross = (this.x <= (other.x + other.width)) && ((this.x + this.width) >= other.x);
      let yCross = (this.y <= (other.y + other.height)) && ((this.y + this.height) >= other.y);
      return xCross && yCross;
    }
  }
}

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

    tick: function() {
      if (this.disabled)
        return;

      this.upperBlock.moveLeft(obstacleSpeed);
      this.lowerBlock.moveLeft(obstacleSpeed);

      if (this.upperBlock.x === 0) {
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

    randomizeY: function() {
      let r = parseInt(Math.random() * (screenHeight - gapSize));

      this.upperBlock.y = 0;
      this.upperBlock.height = r;
      this.lowerBlock.y = r + gapSize;
      this.lowerBlock.height = screenHeight - gapSize - r;
    },

    enable: function() {
      this.disabled = false;
      this.visibility = "unset";
    },
    disable: function() {
      this.disabled = true;
      this.visibility = "hidden";
    },

    collides: function(other) {
      if (this.disabled) return false;
      return this.upperBlock.collides(other) || this.lowerBlock.collides(other);
    },
  }
}

let player = createBlock('player-div');
player.div.style.background = "red";
player.width = 50;
player.height = 50;
player.x = 20;
player.y = parseInt((screenHeight - 50) / 2);

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

function createObstacleBlock(id, parent) {
  let div = document.createElement('div');
  div.id = id;
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  parent.appendChild(div);
  return createBlock(id);
}

let lastObstacleId = 0;
function getDisabledObstacle() {
  for (let o of obstacles) {
    if (o.disabled)
      return o;
  }

  // Create new
  lastObstacleId += 1;
  let blockId1 = `obstacle${lastObstacleId}`;
  let block1 = createObstacleBlock(blockId1, gameArea);

  lastObstacleId += 1;
  let blockId2 = `obstacle${lastObstacleId}`;
  let block2 = createObstacleBlock(blockId2, gameArea);

  let o = createObstacle(block1, block2);
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

function clamp(val, low, high) {
  if (val < low)
    return low;
  if (val > high)
    return high;
  return val;
}
