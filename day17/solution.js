import { readLines } from '../lib/file-access.js';

const rawInput = readLines('./day17/input.txt');
const matches = rawInput[0].match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/);
const targetMinX = Math.min(parseInt(matches[1]), parseInt(matches[2]));
const targetMaxX = Math.max(parseInt(matches[1]), parseInt(matches[2]));
const targetMinY = Math.min(parseInt(matches[3]), parseInt(matches[4]));
const targetMaxY = Math.max(parseInt(matches[3]), parseInt(matches[4]));

const possibleXs = Array(targetMaxX / 2)
  .fill(null)
  .map((_, i) => i)
  .filter((x) => {
    var ix = 0;
    var dx = x;
    while (dx > 0 && ix <= targetMaxX) {
      if (ix >= targetMinX && ix <= targetMaxX) {
        return true;
      }
      ix += dx;
      dx--;
    }
    return false;
  });

const initials = possibleXs
  .map((initX) => {
    var initY = 1000;
    while (initY > 0) {
      var ix = 0;
      var iy = 0;
      var maxY = 0;
      var dx = initX;
      var dy = initY;
      while (ix <= targetMaxX && iy >= targetMinY) {
        ix += dx;
        iy += dy;
        maxY = Math.max(maxY, iy);
        if (
          ix >= targetMinX &&
          ix <= targetMaxX &&
          iy >= targetMinY &&
          iy <= targetMaxY
        ) {
          return [initX, initY, maxY];
        }
        dx = Math.max(dx - 1, 0);
        dy--;
      }
      initY--;
    }
  })
  .filter((x) => x);

const maxHeight = initials.map((x) => x[2]).reduce((a, x) => Math.max(a, x), 0);

console.log('Part 1:  ' + maxHeight);

console.log('Part 2:  ');
