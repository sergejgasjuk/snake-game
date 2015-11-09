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
    this.state.lives = PlayerStore.getPlayerData().lives;
    this.state.points = PlayerStore.getPlayerData().points;
  }

  onStartGame(e) {
    if (e.keyCode === 13 && !this.state.gameStarted) {
      PlayerActions.startGame();
    }

    return false;
  }

  onGameStatusChange() {
    this.setState({gameStarted: PlayerStore.getPlayerData().gameStarted});
  }

  onLivesChange() {
    this.setState({lives: PlayerStore.getPlayerData().lives});
  }

  onPointsChange() {
    this.setState({points: PlayerStore.getPlayerData().points});
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onStartGame.bind(this));

    this.unsubscribe = [
      PlayerStore.listen(this.onGameStatusChange.bind(this)),
      PlayerStore.listen(this.onLivesChange.bind(this)),
      PlayerStore.listen(this.onPointsChange.bind(this))
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.map((fn) => fn());
  }

  render() {
    return (
      <div className="sg-wrap">
        <GameField lives={this.state.lives} />
        <PlayerPanel lives={this.state.lives} points={this.state.points}/>
        {!true &&
          <div className="sg-overlay">

          </div>
        }
      </div>
    )
  }
}

export default Game;
