import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import SnakeGameField from "./SnakeGameField"
import SnakeGamePanel from "./SnakeGamePanel"

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.state.score = 0;
    this.state.lives = 3;
  }

  render() {
    return (
      <div className="snake-game">
        <SnakeGameField/>
        <SnakeGamePanel score={this.state.score}/>
      </div>
    )
  }
}

export default SnakeGame;
