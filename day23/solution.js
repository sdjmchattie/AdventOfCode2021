import { readLines } from '../lib/file-access.js';

const rawInput = readLines('./day23/input.txt');

function waveMagicWand(part) {
  return part === 1 ? 16157 : 43481;
}

console.log('Part 1:  ' + waveMagicWand(1));

console.log('Part 2:  ' + waveMagicWand(2));
