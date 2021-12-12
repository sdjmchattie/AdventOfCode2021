import { readLines } from '../lib/file-access.js';
import _ from 'lodash';

function buildPaths(routes, paths = [['start']]) {
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
      return !alreadyVisited || bigCave;
    });
    return nextCaves.map((cave) => [...path, cave]);
  });
  return buildPaths(routes, [...filteredPaths, ...extendedPaths]);
}

const rawInput = readLines('./day12/input.txt');
const routes = rawInput.reduce((acc, routeDesc) => {
  const [caveA, caveB] = routeDesc.split('-');
  acc[caveA] = [...(acc[caveA] || []), caveB];
  acc[caveB] = [...(acc[caveB] || []), caveA];
  return acc;
}, {});

const paths = buildPaths(routes);

console.log('Part 1:  ' + paths.length);

console.log('Part 2:  ');
