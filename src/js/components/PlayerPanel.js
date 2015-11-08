import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import PlayerStore from "../stores/PlayerStore";

class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.points = PlayerStore.getPlayerData().points;
  }

  onGetPoints() {
    let points = PlayerStore.getPlayerData().points;
    this.setState({points});
  }

  componentDidMount() {
    this.unsubscribe = [
      PlayerStore.listen(this.onGetPoints.bind(this))
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.map((fn) => fn());
  }

  render() {
    return (
      <div className="snake-game__panel">
        <div>Score: {this.state.points}</div>
        <div className=""></div>
      </div>
    )
  }
}

export default PlayerPanel;
