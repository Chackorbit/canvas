const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  isPressed: false,
  down: null,
  current: null,
  up: null,
  setDown: function (e, element) {
    this.isPressed = true;
    this.down = this.getPosition(e, element);
  },
  setUp: function (e, element) {
    this.isPressed = false;
    this.up = this.getPosition(e, element);
  },
  setCurrent: function (e, element) {
    this.current = this.getPosition(e, element);
  },
  getPosition: (e, element) => {
    let position = {
      x: e.clientX - element.offsetLeft,
      y: e.clientY - element.offsetTop,
    };
    return position;
  },
};

function clear(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const lines = [];

function drawLine(ctx, line) {
  const { start, end, lineWidth = 1 } = line;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function draw() {
  clear(ctx);
  lines.forEach((line) => {
    drawLine(ctx, line);
  });
}

function handleMouseDown(e) {
  mouse.isPressed = true;
  mouse.setDown(e, canvas);

  const line = {
    start: mouse.down,
    end: mouse.down,
  };
  lines.push(line);
  draw();
}
function handleMouseUp(e) {
  mouse.setUp(e, canvas);
  console.log("lines: ", lines);
}
function handleMouseMove(e) {
  if (mouse.isPressed) {
    mouse.setCurrent(e, canvas);

    let line = {
      start: mouse.down,
      end: mouse.current,
    };
    lines.pop();
    lines.push(line);

    clear(ctx);
    draw();
  }
}
function getIntersection() {}

document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mousemove", handleMouseMove);
