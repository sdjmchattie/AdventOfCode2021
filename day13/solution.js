import { minArray, maxArray } from '../lib/array-func-tools.js';
import { readLines } from '../lib/file-access.js';
import _ from 'lodash';

function foldAt(coords, axis, fold) {
  const updatedCoords = coords.map((coord) => {
    var newCoord = [...coord];
    if (newCoord[axis] > fold) {
      newCoord[axis] = 2 * fold - newCoord[axis];
    }
    return newCoord;
  });
  return _.uniqWith(updatedCoords, _.isEqual);
}

const rawInput = readLines('./day13/input.txt');
const coords = rawInput
  .slice(0, 835)
  .map((c) => c.split(',').map((v) => parseInt(v)));
const folds = rawInput.slice(836).map((instruction) => {
  const m = instruction.match(/([xy])=(\d+)/);
  return [m[1] === 'x' ? 0 : 1, parseInt(m[2])];
});

const part1 = foldAt(coords, folds[0][0], folds[0][1]);

console.log('Part 1:  ' + part1.length);

var folded = [...coords];
for (const fold of folds) {
  folded = foldAt(folded, fold[0], fold[1]);
}

const minX = minArray(folded.map((c) => c[0]));
const maxX = maxArray(folded.map((c) => c[0]));
const minY = minArray(folded.map((c) => c[1]));
const maxY = maxArray(folded.map((c) => c[1]));

console.log('Part 2:  ');

for (var y = minY; y <= maxY; y++) {
  for (var x = minX; x <= maxX; x++) {
    process.stdout.write(
      _.findIndex(folded, (e) => _.isEqual(e, [x, y])) >= 0 ? '#' : '.'
    );
  }
  console.log();
}
