define(function() {

  var Ball = function(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  Ball.prototype.setVelocity = function(x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
  }

  Ball.prototype.update = function(deltaTime) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  };

  return Ball;
});
