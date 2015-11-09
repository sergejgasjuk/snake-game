import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers";

import GameField from "./GameField";
import PlayerPanel from "./PlayerPanel";

import PlayerStore from "../stores/PlayerStore";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.gameStarted = PlayerStore.getPlayerData().gameStarted;
    this.state.fuck = 1;
  }

  startGame(e) {
    if (e.keyCode !== 13) {
      return false;
    }

    //let fuck = this.state.fuck + 1;
    //
    //this.setState({fuck});
    //this.setState({gameStarted: !this.state.gameStarted});
  }

  componentDidMount() {
    document.addEventListener("keydown", this.startGame.bind(this));
  }

  render() {
    return (
      <div className="sg-wrap">
        <GameField started={this.state.gameStarted}/>
        <PlayerPanel/>
        {this.state.gameStarted &&
          <div className="sg-overlay">
            fuck
          </div>
        }
      </div>
    )
  }
}

export default Game;
