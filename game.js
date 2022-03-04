const screenWidth = 600, screenHeight = 400;
let playerSpeed = 5;
let obstaclesDistance = parseInt(screenWidth / 2);
let obstacleSpeed = 10;
let tickSpeed = 400;
let gapSize = 150;

let gameArea = document.getElementById("game-area");

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
    x: x,
    y: y,
    width: width,
    height: height,

    moveLeft: function (n) {
      this.x -= n;
      this.x = clamp(this.x, 0, screenWidth);
      this.div.style.left = `${this.x}px`;
    },
    moveRight: function (n) {
      this.x += n;
      this.x = clamp(this.x, 0, screenWidth);
      this.div.style.left = `${this.x}px`;
    },
    moveUp: function (n) {
      this.y -= n;
      this.y = clamp(this.y, 0, screenHeight);
      this.div.style.top = `${this.y}px`;
    },
    moveDown: function (n) {
      this.y += n;
      this.y = clamp(this.y, 0, screenHeight);
      this.div.style.top = `${this.y}px`;
    },

    setX: function (x) {
      this.x = x;
      this.div.style.left = `${this.x}px`;
    },
    setY: function (y) {
      this.y = y;
      this.div.style.top = `${this.y}px`;
    },
    setWidth: function (w) {
      this.width = w;
      this.div.style.width = `${this.width}px`;
    },
    setHeight: function (h) {
      this.height = h;
      this.div.style.height = `${this.height}px`;
    },

    collides: function (other) {
      let xCross = (this.x <= (other.x + other.width)) && ((this.x + this.width) >= other.x);
      let yCross = (this.y <= (other.y + other.height)) && ((this.y + this.height) >= other.y);
      return xCross && yCross;
    }
  }
}

function obstacle(o1, o2) {
  return {
    o1: o1,
    o2: o2,
    disabled: false,
    visibility: "unset",

    tick: function() {
      if (this.disabled)
        return;

      o1.moveLeft(obstacleSpeed);
      o2.moveLeft(obstacleSpeed);

      if (o1.x === 0) {
        this.setX(screenWidth);
        this.disable();
      }
    },
    setX: function(x) {
      o1.setX(x);
      o2.setX(x);
    },
    randomizeY: function() {
      setObstaclePairRandomPos(this, gapSize);
    },

    enable: function() {
      this.disabled = false;
      this.setVisibility(true);
    },
    disable: function() {
      this.disabled = true;
      this.setVisibility(false);
    },

    collides: function(other) {
      if (this.disabled) return false;
      return this.o1.collides(other) || this.o2.collides(other);
    },

    setVisibility: function(val) {
      this.visibility = val ? "unset" : "hidden";
      this.o1.div.style.visibility = this.visibility;
      this.o2.div.style.visibility = this.visibility;
    },
  }
}

let player = createBlock('player-div');
player.div.style.background = "red";
player.setWidth(50);
player.setHeight(50);
player.setX(20);
player.setY(parseInt((screenHeight - 50) / 2));

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

function setObstaclePairRandomPos(oPair, gapSize) {
  let r = randomObsPos(gapSize);
  oPair.o1.setY(r.y1);
  oPair.o1.setHeight(r.h1);
  oPair.o2.setY(r.y2);
  oPair.o2.setHeight(r.h2);
}

let obstacles = [];

function randomObsPos(gapSize = 150) {
  let r = parseInt(Math.random() * (screenHeight - gapSize));

  return {
    y1: 0,
    h1: r,
    y2: r + gapSize,
    h2: screenHeight - gapSize - r
  };
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
  let oId1 = `obstacle${lastObstacleId}`;
  let o1 = createObstacleBlock(oId1, gameArea);

  lastObstacleId += 1;
  let oId2 = `obstacle${lastObstacleId}`;
  let o2 = createObstacleBlock(oId2, gameArea);

  let o = obstacle(o1, o2);
  o.disable();
  obstacles.push(o);
  return o;
}

function Update() {
  let lastObstacleX = 0;

  for (let o of obstacles) {
    if (o.disabled) continue;

    if (o.o1.x > lastObstacleX)
      lastObstacleX = o.o1.x;

    o.tick();

    if (o.collides(player)) {
      console.log("COLLISION");
    }
  }

  if ((screenWidth - lastObstacleX) > obstaclesDistance) {
    let o = getDisabledObstacle();
    o.setX(screenWidth);
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
