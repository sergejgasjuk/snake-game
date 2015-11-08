import Reflux from "reflux";
import PlayerActions from "../actions/PlayerActions";

let _points = 12;

let PlayerStore = Reflux.createStore({
  listenables: PlayerActions,

  onSetPoints() {
    _points += +1;
    this.trigger(_points);
  },

  getPlayerData() {
    return {
      points: _points
    }
  }

});

export default PlayerStore;
