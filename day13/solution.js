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

const folded = foldAt(coords, 0, 655);

console.log('Part 1:  ' + folded.length);

console.log('Part 2:  ');
