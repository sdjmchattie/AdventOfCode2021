import { readLines } from '../lib/file-access.js';

const step = (octopuses) => octopuses.map((row) => row.map((octopus) => ++octopus));

function findFlash(octopuses) {
  for (var y = 0; y < octopuses.length; y++) {
    for (var x = 0; x < octopuses[y].length ; x++) {
      if (octopuses[y][x] > 9) {
        return [x, y];
      }
    }
  }
}

function resolveFlashes(state) {
  var { octopuses, flashes } = state;
  const maxY = octopuses.length - 1;
  const maxX = octopuses[0].length - 1;
  const adjacent = adjacentFunc(maxX, maxY);

  while (findFlash(octopuses)) {
    const [locX, locY] = findFlash(octopuses);
    flashes += 1;

    // Set the flashed octopus to a low number so it doesn't flash again.
    octopuses[locY][locX] = -999999;

    // Increment adjacent octopuses.
    for (const [adjX, adjY] of adjacent([locX, locY])) {
      octopuses[adjY][adjX] = octopuses[adjY][adjX] + 1;
    }
  }

  // Set all flashed Octopuses back to 0.
  octopuses = octopuses.map((row) => row.map((octopus) => Math.max(octopus, 0)));

  return { octopuses, flashes };
}

const adjacentFunc = (maxX, maxY) =>
  ([x, y]) => [
    [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
    [x,     y - 1],             [x,     y + 1],
    [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
  ].filter(([x, y]) => x >= 0 && x <= maxX && y >= 0 && y <= maxY);

const rawInput = readLines('./day11/input.txt');
const parsed = rawInput.map((y) => y.split('').map((x) => parseInt(x)));

var state = { octopuses: [...parsed], flashes: 0 };
for (var i = 0; i < 100; i++) {
  state.octopuses = step(state.octopuses);
  state = resolveFlashes(state);
}


console.log('Part 1:  ' + state.flashes);

console.log('Part 2:  ');
