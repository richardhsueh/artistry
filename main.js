var tmp = true;
window.onload = function() {
  renderStroke("#000");
};

function renderStroke(color) {
  if (color === "#000") {
    document.getElementById("content").style.backgroundColor = "white";
  } else {
    document.getElementById("content").style.backgroundColor = "black";
  }
  var canvas = document.getElementById("tutorial");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  var size = canvas.width;
  var dpr = window.devicePixelRatio;
  // context.scale(dpr, dpr);
  context.lineWidth = 2;

  var step = 15;
  var lines = [];

  // Create the lines
  for (var i = step; i <= size - step; i += step) {
    var line = [];
    for (var j = step; j <= size - step; j += step) {
      var distanceToCenter = Math.abs(j - size / 2);
      var variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
      var random = ((Math.random() * variance) / 2) * -1;
      var point = { x: j, y: i + random };
      line.push(point);
    }
    lines.push(line);
  }
  // Do the drawing
  for (var i = 5; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);

    for (var j = 0; j < lines[i].length - 2; j++) {
      var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
      context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }

    context.quadraticCurveTo(
      lines[i][j].x,
      lines[i][j].y,
      lines[i][j + 1].x,
      lines[i][j + 1].y
    );
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.fill();
    context.restore();
    context.strokeStyle = color;
    context.stroke();
  }
}
function clickHandler() {
  if (tmp) {
    renderStroke("#fff");
    tmp = false;
  } else {
    renderStroke("#000");
    tmp = true;
  }
}
