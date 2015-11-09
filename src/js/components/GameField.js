import React from "reactWithAddons";
import ReactDom from "reactDom";
import * as utls from "../utils/helpers"

import PlayerStore from "../stores/PlayerStore";
import PlayerActions from "../actions/PlayerActions";

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

class GameField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.cols = COLS; // grid width
    this.state.rows = ROWS; // grid height
    this.state.grid = utls.generateGrid.apply(this, [this.state.cols, this.state.rows, EMPTY_CELL_VAL]);
    // direction
    this.state.direction = 'up';
    // speed
    this.state.speed = 300;
    // snake
    this.state.snake = this.generateSnakeObject(this.state.direction);
    this.state.snake.forEach((cell, i) => this.state.grid[cell.y][cell.x] = SNAKE_CELL_VAL);
    // food
    this.state.emptyCells = this.getEmptyCells(this.state.grid);
    this.state.randomPos = utls.getRandomPos.apply(this, [this.state.emptyCells]);
    this.state.grid[this.state.randomPos.y][this.state.randomPos.x] = FOOD_CELL_VAL;

    this.state.playerData = PlayerStore.getPlayerData();
    //game loop
    this.loop = setInterval(this.updateGame.bind(this), this.state.speed);
    //this.loop = null;
    //this.state.started = this.props.started;
  }

  updateGame() {
    let grid = this.state.grid.slice(0);
    let snake = this.state.snake.slice(0);
    let {direction} = this.state;
    let snakeHead = {y: snake[0].y, x: snake[0].x};
    let lives = this.state.playerData.lives;

    switch (direction) {
      case 'left':
        snakeHead.x -= 1;
        break;
      case 'up':
        snakeHead.y -= 1;
        break;
      case 'right':
        snakeHead.x += 1;
        break;
      case 'down':
        snakeHead.y += 1;
        break;
    }

    if (grid[snakeHead.y] === undefined || grid[snakeHead.y][snakeHead.x] === undefined) {
      if (snakeHead.y < 0)
        snakeHead.y = grid.length - 1;
      if (snakeHead.y >= grid.length)
        snakeHead.y = 0;
      if (snakeHead.x < 0)
        snakeHead.x = grid[0].length - 1;
      if (snakeHead.x >= grid[0].length)
        snakeHead.x = 0;
    }

    if (grid[snakeHead.y][snakeHead.x] === FOOD_CELL_VAL) {
      snake.unshift(snakeHead);
      snake.forEach((cell, i) => grid[cell.y][cell.x] = SNAKE_CELL_VAL);
      PlayerActions.receivePoints();
      PlayerActions.looseLife();
      let emptyCells = this.getEmptyCells(grid);
      let randomPos = utls.getRandomPos.apply(this, [emptyCells]);
      grid[randomPos.y][randomPos.x] = FOOD_CELL_VAL;
    } else if (grid[snakeHead.y][snakeHead.x] === SNAKE_CELL_VAL) {
      PlayerActions.looseLife();
      clearInterval(this.loop);
      this.loop = null;
      console.log(lives);

      return;
    } else {
      let snakeTail = snake.pop();
      snake.unshift(snakeHead);
      grid[snakeTail.y][snakeTail.x] = EMPTY_CELL_VAL;
      snake.forEach((cell, i) => grid[cell.y][cell.x] = SNAKE_CELL_VAL);
    }

    this.setState({grid, snake});
  }

  //setPlayerPoints() {
  //  PlayerActions.setPoints();
  //}
  //
  //removePlayerLife() {
  //  PlayerActions.looseLife();
  //}

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

  changeDirection(e) {
    let key = e.keyCode;
    let direction = this.state.direction;

    if (key === KEY_LEFT && direction !== "right")
      direction = "left";
    if (key === KEY_UP && direction !== "down")
      direction = "up";
    if (key === KEY_RIGHT && direction !== "left")
      direction = "right";
    if (key === KEY_DOWN && direction !== "up")
      direction = "down";

    this.setState({direction});
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
      length = 5, // snake length
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

  onPlayerDataChange() {
    this.setState({
      playerData: PlayerStore.getPlayerData()
    });
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.changeDirection.bind(this));

    this.unsubscribe = PlayerStore.listen(this.onPlayerDataChange.bind(this));
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.changeDirection.bind(this));

    this.unsubscribe();
  }

  render() {

    // TODO: refactor
    let setCellClassName = (val) => {
      if (val === SNAKE_CELL_VAL) {
        return "sg-field-cell--snake";
      } else if (val === FOOD_CELL_VAL) {
        return "sg-field-cell--food";
      } else {
        return '';
      }
    };

    return (
      <div className="sg-field">
        {this.state.grid.map((row, y) =>
            <div className="sg-field-row" key={`row_${y}`}>
            {row.map((cell, x) =>
                <div className={`sg-field-cell ` + setCellClassName(cell)} key={`cell_y=${y}_x=${x}`}></div>
            )}
            </div>
        )}
      </div>
    )
  }
}

export default GameField;
