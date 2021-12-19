import { readLines } from '../lib/file-access.js';

function explode(number) {
  const matches = number.match(/\[\d+,\d+\]/g);
  if (matches) {
    for (const match of matches) {
      const index = number.indexOf(match);
      const left = number.slice(0, index);
      const right = number.slice(index + match.length);
      const openingBraces = right.match(/\[/g)?.length || 0;
      const closingBraces = right.match(/\]/g)?.length || 0;
      if (closingBraces - openingBraces == 4) {
        const leftMatch = left.match(/^(.+)(\d+)(\D+)$/);
        const rightMatch = right.match(/^(\D+)(\d+)(.+)$/);
        const matchNums = match.match(/\[(\d+),(\d+)\]/);

        var newLeft = leftMatch
          ? leftMatch[1] +
            (parseInt(leftMatch[2]) + parseInt(matchNums[1])) +
            leftMatch[3]
          : left;

        var newRight = rightMatch
          ? rightMatch[1] +
            (parseInt(rightMatch[2]) + parseInt(matchNums[2])) +
            rightMatch[3]
          : right;

        return { number: newLeft + '0' + newRight, didExplode: true };
      }
    }
  }

  return { number: number, didExplode: false };
}

function split(number) {
  const match = number.match(/\d{2,}/);
  if (match) {
    const newLeft = number.slice(0, match.index);
    const newRight = number.slice(match.index + match[0].length);
    const matchNum = parseInt(match[0]);

    return {
      number:
        newLeft +
        ('[' + Math.floor(matchNum / 2) + ',' + Math.ceil(matchNum / 2) + ']') +
        newRight,
      didSplit: true,
    };
  }

  return { number: number, didSplit: false };
}

function reduce(number) {
  var reducedNumber = number;
  var incomplete = true;
  while (incomplete) {
    console.log(reducedNumber);
    const explodeResult = explode(reducedNumber);
    reducedNumber = explodeResult.number;
    if (!explodeResult.didExplode) {
      const splitResult = split(reducedNumber);
      reducedNumber = splitResult.number;
      incomplete = splitResult.didSplit;
    }
  }
  console.log();

  return reducedNumber;
}

function magnitude(number) {
  var magNumber = number;
  while (!parseInt(magNumber)) {
    const match = magNumber.match(/\[(\d+),(\d+)\]/);
    const newLeft = magNumber.slice(0, match.index);
    const newRight = magNumber.slice(match.index + match[0].length);
    magNumber =
      newLeft + (3 * parseInt(match[1]) + 2 * parseInt(match[2])) + newRight;
  }

  return magNumber;
}

//const rawInput = readLines('./day18/input.txt');
const rawInput = [
  '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
  '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
  '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
];

var number = reduce(rawInput[0]);
for (const nextNumber of rawInput.slice(1)) {
  number = '[' + number + ',' + nextNumber + ']';
  number = reduce(number);
}

console.log('Part 1:  ' + magnitude(number));

console.log('Part 2:  ');
