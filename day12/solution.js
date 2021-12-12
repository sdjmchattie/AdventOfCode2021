import { readLines } from '../lib/file-access.js';
import _ from 'lodash';

function twiceVisitedSmallCave(path) {
  const smallCaves = path.filter((cave) => cave.match(/^[a-z]+$/));
  return smallCaves.length !== _.uniq(smallCaves).length;
}

function buildPaths(routes, oneCaveTwice, paths = [['start']]) {
  const pathsToBuild = paths.filter((path) => _.last(path) !== 'end');
  if (pathsToBuild.length === 0) {
    return paths;
  }
  const filteredPaths = [...paths].filter(
    (path) => !pathsToBuild.includes(path)
  );
  const extendedPaths = pathsToBuild.flatMap((path) => {
    const nextCaves = routes[_.last(path)].filter((cave) => {
      const bigCave = cave.match(/^[A-Z]+$/) !== null;
      const alreadyVisited = path.includes(cave);
      return (
        !alreadyVisited ||
        (cave !== 'start' && oneCaveTwice && !twiceVisitedSmallCave(path)) ||
        bigCave
      );
    });
    return nextCaves.map((cave) => [...path, cave]);
  });
  return buildPaths(routes, oneCaveTwice, [...filteredPaths, ...extendedPaths]);
}

const rawInput = readLines('./day12/input.txt');
const routes = rawInput.reduce((acc, routeDesc) => {
  const [caveA, caveB] = routeDesc.split('-');
  acc[caveA] = [...(acc[caveA] || []), caveB];
  acc[caveB] = [...(acc[caveB] || []), caveA];
  return acc;
}, {});

const pathsPart1 = buildPaths(routes, false);

console.log('Part 1:  ' + pathsPart1.length);

const pathsPart2 = buildPaths(routes, true);

console.log('Part 2:  ' + pathsPart2.length);
