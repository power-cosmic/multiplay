/**
 * Array-based implementation of a priority queue.
 * Really it's more of an array that stores things in a given order
 */
define(['utils/event'], function(Event) {

    var EventList = function(compare) {
    this.compare = compare || Event.compare;

    this.elements = [];
    this.numElements = 0;
  };

  EventList.prototype.push = function(value) {
    var inserted = false;
    for (var i = this.numElements - 1; i >= 0; i--) {
      if (compare(value, this.elements[i]) > 0) {
        this.elements.splice(i + 1, 0, value);
        inserted = true;
        return;
      }
    }
    if (!inserted) {
      this.elements.push(value);
    }
    this.numElements++;
  };

  EventList.prototype.peek = function() {
    return this.elements[0];
  };

  EventList.prototype.pop = function() {
    var output = this.elements[0];
    this.elements.splice(0, 1);
    this.numElements--;
    return output;
  }

  EventList.prototype.removeAll = function(callback) {

    // default behavior is to remove consequents
    callback = callback || function(element) {
      return element.isConsequent;
    };

    for (var i = this.numElements - 1; i >= 0; i--) {
      if (callback(this.elements[i])) {
        this.elements.splice(i, 1);
        this.numElements--;
      }
    }
  };

  EventList.prototype.size = function() {
    return this.numElements;
  };

  EventList.prototype.isEmpty = function() {
    return this.size() === 0;
  };

  return EventList;
});
