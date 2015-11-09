import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import PlayerStore from "../stores/PlayerStore";

class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let playerLives = [];
    for (let i = 0, l = this.props.lives; i < l; i += 1) {
      playerLives.push(<div className="sg-player-life" key={`life-${i+1}`}></div>);
    }
    console.log(this.props.lives)
    return (
      <div className="sg-player-panel">
        <div className="sg-player-points">Points: {this.props.points}</div>
        <div className="sg-player-lives">
          {playerLives}
        </div>
      </div>
    )
  }
}

export default PlayerPanel;
