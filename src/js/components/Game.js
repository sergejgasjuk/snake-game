import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers";

import GameField from "./GameField";
import PlayerPanel from "./PlayerPanel";

import PlayerStore from "../stores/PlayerStore";
import PlayerActions from "../actions/PlayerActions";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.gameStarted = PlayerStore.getPlayerData().gameStarted;
  }

  onStartGame(e) {
    if (e.keyCode === 13 && !this.state.gameStarted) {
      PlayerActions.startGame();
    }

    return false;
  }

  onGameStatusChange() {
    let gameStarted = PlayerStore.getPlayerData().gameStarted;
    this.setState({gameStarted});
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onStartGame.bind(this));

    this.unsubscribe = [
      PlayerStore.listen(this.onGameStatusChange.bind(this))
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.map((fn) => fn());
  }

  render() {
    return (
      <div className="sg-wrap">
        <GameField/>
        <PlayerPanel/>
        {!true &&
          <div className="sg-overlay">

          </div>
        }
      </div>
    )
  }
}

export default Game;
