import Reflux from "reflux";

let PlayerActions = Reflux.createActions([
  "receivePoints",
  "looseLife",
  "startGame"
]);

export default PlayerActions;
