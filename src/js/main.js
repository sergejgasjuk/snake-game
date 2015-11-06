import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "utils/helpers"
import SnakeGame from "components/SnakeGame"
import Reflux from "reflux"

ReactDom.render(<SnakeGame/>, document.getElementById("container"));
