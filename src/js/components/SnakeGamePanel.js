import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import UserStore from "../stores/UserStore";

class SnakeGamePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.points = UserStore.getUserPoint();
  }

  render() {
    return (
      <div className="snake-game__panel">
        Score: {this.state.points}
      </div>
    )
  }
}

export default SnakeGamePanel;
