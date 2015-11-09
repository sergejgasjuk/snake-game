import Reflux from "reflux";
import PlayerActions from "../actions/PlayerActions";

let _points = 0;
let _lives = 3;
let _gameStarted = false;

let PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  onStartGame() {
    _gameStarted = !_gameStarted;
    this.trigger(_gameStarted);
  },

  onSetPoints() {
    _points += +1;
    this.trigger(_points);
  },

  onLooseLife() {
    _lives -= 1;
    this.trigger(_lives);

    if (_lives === 0) {
      return;
      // endGame = true;
    }
  },

  getPlayerData() {
    return {
      points: _points,
      lives: _lives,
      gameStarted: _gameStarted
    }
  }

});

export default PlayerStore;
