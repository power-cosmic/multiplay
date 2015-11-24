/**
 * Event model.
 * A brief overview of the significance of instance variables:
 *  time: Events MUST be ordered by time
 *  command: Name of the command (e.g. beginAccelerating or spawnShip)
 *  user: username of user who did the action
 *  data: Data specific to the command
 */
define(function() {

  /*
   * Ranking of "importance" of instance variables.
   * Used in the compare function.
   */
  var importance = ['time', 'command', 'user'];

  var Event = function(time, command, user, data) {
    this.time = time;
    this.command = command;
    this.user;
    this.data = data || null;
  };

  Event.prototype.getTime = function() {
    return this.time;
  };

  Event.prototype.getUser = function() {
    return this.user;
  };

  Event.prototype.getCommand = function() {
    return this.command;
  };

  Event.prototype.getData = function() {
    return this.data;
  };

  /**
   * Compare two events to see which should be ordered first
   * @param {Event} a First event
   * @param {Event} b Second event
   * @return {Number} -1 if a < b, 1 if a > b, 0 if a == b
   */
  Event.compare = function(a, b) {
    for (var i = 0; i < importance.length; i++) {
      var attribute = importance[i],
          aAttribute = a[attribute],
          bAttribute = b[attribute];

      if (aAttribute < bAttribute) {
        return -1;
      } else if (aAttribute > bAttribute) {
        return 1;
      }
    }
    return 0;
  };

  return Event;
});
