define(function() {

  var Server = function(io) {
    this.io = io;
  };

  Server.prototype.connect = function() {

  };

  Server.prototype.disconnect = function() {

  };

  Server.prototype.getEvent = function(event) {

  };

  Server.prototype.on = function(id, event) {
    this.io.on(id, event);
  };

  Server.prototype.emit = function(id, event) {
    this.io.emit(id, event);
  };

  return Server;
});
