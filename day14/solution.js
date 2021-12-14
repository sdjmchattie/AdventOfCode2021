import _ from 'lodash';
import { countValues, maxArray, minArray } from '../lib/array-func-tools.js';
import { readLines } from '../lib/file-access.js';

const stepFunc = (componentMap) =>
  function (chain) {
    const newComponents = chain.split('').reduce((acc, _, i) => {
      const key = chain.slice(i, i + 2);
      return acc + (componentMap[key] || '');
    }, '');

    return _.zip(chain.split(''), newComponents.split('')).flat().join('');
  };

const rawInput = readLines('./day14/input.txt');
const startChain = rawInput[0];
const componentMap = rawInput.slice(2).reduce((acc, item) => {
  const matches = item.match(/(..) -> (.)/);
  return { ...acc, [matches[1]]: matches[2] };
}, {});
const step = stepFunc(componentMap);

var chain = startChain;
for (var i = 0; i < 10; i++) {
  chain = step(chain);
}

const counts = countValues(chain.split(''));

console.log(
  'Part 1:  ' +
    (maxArray(Object.values(counts)) - minArray(Object.values(counts)))
);

console.log('Part 2:  ');
