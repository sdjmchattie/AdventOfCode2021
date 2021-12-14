import _ from 'lodash';
import { maxArray, minArray } from '../lib/array-func-tools.js';
import { readLines } from '../lib/file-access.js';

const makeCountingDictWithKeys = (keys) =>
  keys.reduce((acc, key) => {
    return { ...acc, [key]: 0 };
  }, {});

const countRange = (countDict) =>
  maxArray(Object.values(countDict)) - minArray(Object.values(countDict));

const stepFunc = (componentMap) =>
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

const rawInput = readLines('./day14/input.txt');
const startChain = rawInput[0];
const componentMap = rawInput.slice(2).reduce((acc, item) => {
  const matches = item.match(/(..) -> (.)/);
  return { ...acc, [matches[1]]: matches[2] };
}, {});
const step = stepFunc(componentMap);

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

for (var i = 0; i < 10; i++) {
  [singleCounts, pairCounts] = step(singleCounts, pairCounts);
}

console.log('Part 1:  ' + countRange(singleCounts));

for (var i = 0; i < 30; i++) {
  [singleCounts, pairCounts] = step(singleCounts, pairCounts);
}

console.log('Part 2:  ' + countRange(singleCounts));
