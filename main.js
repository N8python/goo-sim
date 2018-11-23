var canvas; var ctx; var beadSize; var beadList; var width; var height; var beadsPerCollum; var beadsPerRow; var clientX; var clientY;
//Loading Window Before Starting Program is always good
function genGoo(beadSize){
  //Variables
  canvas = document.getElementById("gooLand");
  ctx = canvas.getContext("2d")
  beadSize = 5;
  beadList = []
  width = canvas.width;
  height = canvas.height;
  beadsPerCollum = canvas.height / beadSize;
  beadsPerRow = canvas.width / beadSize;
  // Track mouse move
  clientX = 0;
  clientY = 0;
  canvas.addEventListener('mousemove', function(e) {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min))
  }
  function randFloat(min, max) {
    return min + Math.random() * (max - min)
  }
  //Bead Constructor
  function Bead(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  Bead.prototype.draw = function() {
    ctx.fillStyle = this.color;
    drawCircle(this.x, this.y, beadSize);
  }
  //Nice code found on stack overflow that made my life easier:
  function diff(num1, num2) {
    if (num1 > num2) {
      return (num1 - num2);
    } else {
      return (num2 - num1);
    }
  };

  function dist(x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
  };
  //End of stack overflow code
  //Make all the beads
  for (var col = 0; col < beadsPerCollum; col++) {
    for (var row = 0; row < beadsPerRow; row++) {
      beadList.push(new Bead(row * beadSize, col * beadSize, "rgba("+randFloat(175, 255)+", 0," + randFloat(175, 255) + ", " + randFloat(0.5, 1) + ")"));
    }
  }
  //Now, set up a "loop" function to draw the beads
  function mainLoop() {
    ctx.clearRect(0, 0, width, height)
    //Bead Loop
    for (var bead = 0; bead < beadList.length; bead++) {
      beadList[bead].draw()
    }
    //Getting past some annoying glitches of mouse tracking
    realX = clientX;
    realY = clientY - 75;
    //See if beads need to move to mouse
    for (var bead = 0; bead < beadList.length; bead++) {
      if(dist(beadList[bead].x, beadList[bead].y, realX, realY)<=beadSize*randInt(2, 6)){
        beadList[bead].x+=(beadList[bead].x - realX)/beadSize*randFloat(0.4, 1.6);
        beadList[bead].y+=(beadList[bead].y - realY)/beadSize*randFloat(0.4, 1.6);
      }
    }
  }
  //Finally, we run the loop with a set interval
  var intervalId = setInterval(mainLoop, 100)
}
window.onload = function() {
  genGoo(5)
}();
function gooUp(){
    genGoo(newSize)

}
