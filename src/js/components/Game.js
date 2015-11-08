import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import GameField from "./GameField"
import PlayerPanel from "./PlayerPanel"

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.score = 0;
    this.state.lives = 3;
  }

  render() {
    return (
      <div className="snake-game">
        <GameField/>
        <PlayerPanel score={this.state.score}/>
      </div>
    )
  }
}

export default Game;
