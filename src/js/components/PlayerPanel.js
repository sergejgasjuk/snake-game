import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import PlayerStore from "../stores/PlayerStore";

class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.points = PlayerStore.getPlayerData().points;
    this.state.lives = PlayerStore.getPlayerData().lives;
  }

  onPointsUpdate() {
    let points = PlayerStore.getPlayerData().points;
    this.setState({points});
  }

  onLivesUpdate() {
    let lives = PlayerStore.getPlayerData().lives;
    this.setState({lives});
  }

  componentDidMount() {
    this.unsubscribe = [
      PlayerStore.listen(this.onPointsUpdate.bind(this)),
      PlayerStore.listen(this.onLivesUpdate.bind(this))
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.map((fn) => fn());
  }

  render() {
    let playerLives = [];
    for (let i = 0, l = this.state.lives; i < l; i += 1) {
      playerLives.push(<div className="sg-player-life" key={`life-${i+1}`}></div>);
    }

    return (
      <div className="sg-player-panel">
        <div className="sg-player-points">Points: {this.state.points}</div>
        <div className="sg-player-lives">
          {playerLives}
        </div>
      </div>
    )
  }
}

export default PlayerPanel;
