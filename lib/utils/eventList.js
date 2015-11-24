/**
 * Array-based implementation of a priority queue.
 * Really it's more of an array that stores things in a given order
 */
define(['utils/event'], function(Event) {

    var EventList = function(compare) {
    this.compare = compare || Event.compare;

    this.elements = [];
  };

  EventList.prototype.push = function(value) {
    var inserted = false;
    for (var i = this.elements.length - 1; i >= 0; i--) {
      if (compare(value, this.elements[i]) > 0) {
        this.elements.splice(i + 1, 0, value);
        inserted = true;
        return;
      }
    }
    if (!inserted) {
      this.elements.push(value);
    }
  };

  EventList.prototype.peek = function() {
    return this.elements[0];
  };

  EventList.prototype.getEvent = function(index) {
    return this.elements[index];
  };

  EventList.prototype.pop = function() {
    return this.elements.shift();
  }

    EventList.prototype.size = function() {
    return this.elements.length;
  };

  EventList.prototype.isEmpty = function() {
    return this.size() === 0;
  };

  return EventList;
});
