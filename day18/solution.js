import { readLines } from '../lib/file-access.js';

function explode(number) {
  var startIndex = 0;
  var match;
  do {
    match = number.slice(startIndex).match(/\[\d+,\d+\]/);
    if (match) {
      startIndex += match.index;
      const left = number.slice(0, startIndex);
      startIndex += match[0].length;
      const right = number.slice(startIndex);
      const openingBraces = left.match(/\[/g)?.length || 0;
      const closingBraces = left.match(/\]/g)?.length || 0;
      if (openingBraces - closingBraces >= 4) {
        const leftMatch = left.match(/^(.+?)(\d+)(\D+)$/);
        const rightMatch = right.match(/^(\D+)(\d+)(.+?)$/);
        const matchNums = match[0].match(/\[(\d+),(\d+)\]/);

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
  } while (match);

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
    const explodeResult = explode(reducedNumber);
    reducedNumber = explodeResult.number;
    if (!explodeResult.didExplode) {
      const splitResult = split(reducedNumber);
      reducedNumber = splitResult.number;
      incomplete = splitResult.didSplit;
    }
  }

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

const rawInput = readLines('./day18/input.txt');

var number = reduce(rawInput[0]);
for (const nextNumber of rawInput.slice(1)) {
  number = '[' + number + ',' + nextNumber + ']';
  number = reduce(number);
}

console.log('Part 1:  ' + magnitude(number));

console.log('Part 2:  ');
