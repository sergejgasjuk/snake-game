import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "utils/helpers"

// constants
const COLS = 12; // x
const ROWS = 12; // y
const EMPTY_CELL_VAL = 0;
const SNAKE_CELL_VAL = 1;
const FOOD_CELL_VAL = 2;
const KEY_LEFT = 37,
      KEY_UP = 38,
      KEY_RIGHT = 39,
      KEY_DOWN = 40;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.cols = COLS;
    this.state.rows = ROWS;
    this.state.grid = utls.generateGrid.apply(this, [this.state.cols, this.state.rows, EMPTY_CELL_VAL]);
  }

  getEmptyCells() {
    let emptyCells = [];
    let grid = this.state.grid;

    grid.forEach((row, y) =>
      row.filter((cell, x) => {
        if (cell === EMPTY_CELL_VAL) {
          emptyCells.push({x, y});
        }
      })
    );

    return emptyCells;
  }

  render() {
    let e = this.getEmptyCells();
    console.log(e);
    return (
      <div className="game">
        <div className="game__field">
          {this.state.grid.map((row, y) =>
            <div className="field-row" key={`row_${y}`}>
              {row.map((cell, x) =>
                <div className="field-cell" key={`cell_y=${y}_x=${x}`}></div>
              )}
            </div>
          )}
        </div>
        <div className="game__panel"></div>
        <div className="game__message"></div>
      </div>
    )
  }
}

ReactDom.render(<Game/>, document.getElementById("container"));
