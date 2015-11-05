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
    // grid
    this.state.cols = COLS; // grid width
    this.state.rows = ROWS; // grid height
    this.state.grid = utls.generateGrid.apply(this, [this.state.cols, this.state.rows, EMPTY_CELL_VAL]);
    // direction
    this.state.direction = 'up';
    // snake
    this.state.snake = this.generateSnakeObject(this.state.direction);
    this.state.snake.forEach((cell, i) => this.state.grid[cell.y][cell.x] = SNAKE_CELL_VAL);
    // food
    this.state.emptyCells = this.getEmptyCells(this.state.grid);
    this.state.randomPos = utls.getRandomPos.apply(this, [this.state.emptyCells]);
    this.state.grid[this.state.randomPos.y][this.state.randomPos.x] = FOOD_CELL_VAL;

  }

  getEmptyCells(arr) {
    let emptyCells = [];

    arr.forEach((row, y) =>
      row.filter((cell, x) => {
        if (cell === EMPTY_CELL_VAL) {
          emptyCells.push({x, y});
        }
      })
    );

    return emptyCells;
  }

  setRandomDirection() {
    let dir = '';
    let randomInt = utls.getRandomInt(0, 4);

    switch (randomInt) {
      case 0:
        dir = 'left';
        break;
      case 1:
        dir = 'up';
        break;
      case 2:
        dir = 'right';
        break;
      case 3:
        dir = 'down';
        break;
      default:
        dir = 'up';
    }

    return dir;
  }

  generateSnakeObject(direction) {
    let snake = [],
        length = 2, // snake length
        x,
        y;

    switch (direction) {
      case 'left':
        x = utls.getRandomInt(length, this.state.cols);
        y = utls.getRandomInt(length, this.state.rows);

        for (let i = 0 ; i < length ; i += 1) {
          snake.unshift({x: x, y: y - i});
        }

        break;
      case 'up':
        x = utls.getRandomInt(0, this.state.cols);
        y = utls.getRandomInt(length, this.state.rows);

        for (let i = 0 ; i < length ; i += 1) {
          snake.unshift({x: x, y: y - i});
        }

        break;
      case 'right':
        x = utls.getRandomInt(length-1, this.state.cols - 1);
        y = utls.getRandomInt(0, this.state.rows);

        for (let i = 0 ; i < length ; i += 1) {
          snake.push({x: x - i, y: y});
        }

        break;
      case 'down':
        x = utls.getRandomInt(0, this.state.cols);
        y = utls.getRandomInt(length-1, this.state.rows - 1);

        for (let i = 0 ; i < length ; i += 1) {
          snake.push({x: x, y: y - i});
        }

        break;
    }

    return snake;

  }

  render() {
    let e = this.state.snake;
    console.log(e);

    // TODO: refactor
    let setCellClassName = (val) => {
      if (val === SNAKE_CELL_VAL) {
        return "field-cell--snake";
      } else if (val === FOOD_CELL_VAL) {
        return "field-cell--food";
      } else {
        return '';
      }
    };

    return (
      <div className="game">
        <div className="game__field">
          {this.state.grid.map((row, y) =>
            <div className="field-row" key={`row_${y}`}>
              {row.map((cell, x) =>
                <div className={`field-cell ` + setCellClassName(cell)} key={`cell_y=${y}_x=${x}`}></div>
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
