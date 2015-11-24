define([
    'gameState/gameState',
    'utils/eventList'
  ], function(GameState, EventList) {

    var GameStateManager = function(initialState, maxDeltaTime) {
      this.eventBuffer = new EventList();

      this.baseState = initialState;
      this.prediction = initialState.copyTo();
      this.maxDeltaTime = maxDeltaTime || 0;
    };

    GameStateManager.prototype.playForward = function(gameState, maxTime) {
      var eventBuffer = this.eventBuffer;
      for (var i = 0; i < eventBuffer.size(); i++) {
        var event = eventBuffer.getEvent(i);
        if (event.time > maxTime) {
          break;
        }

        this.updateGameStateUntil(gameState, event.time);
        gameState.doEvent(event);
      }

      this.updateGameStateUntil(gameState, maxTime);

      return gameState.time;
    };

    GameStateManager.prototype.updateGameStateUntil = function(gameState, untilTime) {
      if (gameState.time < untilTime) {
        while (gameState.time + this.maxDeltaTime < untilTime) {
          gameState.update(gameState.time + this.maxDeltaTime);
        }
        if (gameState.time < untilTime) {
          gameState.update(untilTime);
        }
      }
    };

    GameStateManager.prototype.addEvent = function(event) {
      this.eventBuffer.push(event);
    };

    GameStateManager.prototype.replayUntil = function(endTime) {
      this.baseState.copyTo(this.prediction);
      this.playForward(this.prediction, this.eventBuffer);
    };

    GameStateManager.prototype.updateBaseState = function(newBaseTime) {
      this.playForward(this.baseState, this.eventBuffer, newBaseTime);
    };

    return GameStateManager;
});
