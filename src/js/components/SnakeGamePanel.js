import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

class SnakeGamePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="snake-game__panel">
        Score: {this.props.score}
      </div>
    )
  }
}

export default SnakeGamePanel;
