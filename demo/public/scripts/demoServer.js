define(['serverProgram', 'ball'], function(Server, Ball) {

  var DemoServer = function(io) {
    Server.call(this, io);
  };

  DemoServer.prototype = Object.create(Server.prototype);

  DemoServer.prototype.start = function() {
    this.on('connection', function(socket) {
      console.log('a user connected');
      socket.on('disconnect', function() {
        console.log('user disconnected');
      });
      socket.on('event', function(message) {
        console.log(message)
      });
      socket.emit('start', {
        playerId: 2,
        gameState: {
          players: [
            {x: 40, y: 40, color: '#ff0000'},
            {x: 100, y: 40, color: '#0000ff'}
          ]
        }
      });
    });

  };

  return DemoServer;
});
