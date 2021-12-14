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

const makeCountingDictWithKeys = (keys) =>
  keys.reduce((acc, key) => {
    return { ...acc, [key]: 0 };
  }, {});

const newStepFunc = (componentMap) =>
  function (singleCounts, pairCounts) {
    const newPairCounts = makeCountingDictWithKeys(Object.keys(pairCounts));
    Object.keys(pairCounts).forEach((key) => {
      const qty = pairCounts[key];
      const newComponent = componentMap[key];
      newPairCounts[key[0] + newComponent] += qty;
      newPairCounts[newComponent + key[1]] += qty;
      singleCounts[newComponent] += qty;
    });

    return [singleCounts, newPairCounts];
  };

var singleCounts = makeCountingDictWithKeys(
  _.uniq(Object.values(componentMap))
);
var pairCounts = makeCountingDictWithKeys(Object.keys(componentMap));

var chain = startChain;
for (var i = 0; i < chain.length - 1; i++) {
  singleCounts[chain[i]] += 1;
  pairCounts[chain.slice(i, i + 2)] += 1;
}
singleCounts[chain[chain.length - 1]] += 1;

const newStep = newStepFunc(componentMap);
for (var i = 0; i < 40; i++) {
  [singleCounts, pairCounts] = newStep(singleCounts, pairCounts);
}

console.log(singleCounts);

console.log(
  'Part 2:  ' +
    (maxArray(Object.values(singleCounts)) -
      minArray(Object.values(singleCounts)))
);
