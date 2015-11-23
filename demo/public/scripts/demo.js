define([
    'keyboardController',
    'ball',
    'animator',
    'socketio/socket.io',
    'multiplay/client'
  ], function(KeyboardController, Ball, Animator, _socket, MultiplayConnector) {

    var Demo = function(canvas) {

        this.width = canvas.width;
        this.height = canvas.height;
        this.canvasContext = canvas.getContext('2d');

        var keyboard = new KeyboardController();
        this.keyboard = keyboard;

        this.animator = new Animator(this.onFrame, this);
    };
    console.log(MultiplayConnector);
    Demo.prototype = Object.create(MultiplayConnector.prototype);

    Demo.prototype.connect = function() {
      this.socket = io();
      this.socket.on('start', function(message) {
        console.log(message);
      });
    };

    Demo.prototype.start = function(gameState, playerId) {
      this.players = gameState.players;
      this.playerId = playerId;
      this.animator.start();
    };

    Demo.prototype.onFrame = function(deltaTime) {
      this.handleControls();
      this.moveAll(deltaTime);
      this.render();
    };

    Demo.prototype.handleControls = function() {
      var velocity = this.keyboard.getVelocity();
      this.players[this.playerId].setVelocity(velocity.x * 10, velocity.y * 10);
    };

    Demo.prototype.moveAll = function(deltaTime) {
      for (var player in this.players) {
        player.update(deltaTime);
      }
    };

    Demo.prototype.render = function() {
      var ctx = this.canvasContext;

      ctx.fillStyle = '#444444';
      ctx.fillRect(0, 0, this.width, this.height);

      for (var player in this.players) {
        this.drawPlayer(player);
      }
    };

    Demo.prototype.drawPlayer = function(player) {
      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(player.x, player.y, 40, 0, Math.PI * 2);
      ctx.fill();
    };

    return Demo;
});
