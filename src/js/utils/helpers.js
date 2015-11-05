export function generateGrid(rows, cols, val) {
  let grid = [];

  for (let y = 0; y < rows; y += 1) {
    grid.push([]);

    for (let x = 0; x < cols; x += 1) {
      grid[y].push(val);
    }
  }

  return grid;
}

export function getRandomPos(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
