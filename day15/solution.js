import _ from 'lodash';
import { readLines } from '../lib/file-access.js';

const neighboursFunc =
  (maxX, maxY) =>
  ([x, y]) =>
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ].filter(([x, y]) => x >= 0 && x <= maxX && y >= 0 && y <= maxY);

function runDijkstra(distanceMap, start, finish) {
  const visited = [];
  const unvisited = [];
  const distance = {};
  const maxX = distanceMap[0].length - 1;
  const maxY = distanceMap.length;
  const neighbours = neighboursFunc(maxX, maxY);

  for (var x = 0; x <= maxX; x++) {
    for (var y = 0; y < maxY; y++) {
      const point = [x, y].toString();
      unvisited.push(point);
      distance[point] = Infinity;
    }
  }
  distance[start] = 0;

  var current = start.toString();
  while (current !== finish.toString()) {
    const [x, y] = current.split(',').map((v) => parseInt(v));
    const unvisitedNeighbours = neighbours([x, y]).filter((neighbour) =>
      unvisited.includes(neighbour.toString())
    );
    for (var neighbour of unvisitedNeighbours) {
      const newDist =
        distanceMap[neighbour[1]][neighbour[0]] + distance[current];
      const tentDist = distance[neighbour];
      distance[neighbour] = Math.min(newDist, tentDist);
    }

    visited.push(current);
    unvisited.splice(unvisited.indexOf(current), 1);

    current = _.minBy(unvisited, (point) => distance[point]);
  }

  return distance[finish];
}

const rawInput = readLines('./day15/input.txt');
const risks = rawInput.map((row) => row.split('').map((v) => parseInt(v)));

const lowestRisk = runDijkstra(
  risks,
  [0, 0],
  [risks[0].length - 1, risks.length - 1]
);

console.log('Part 1:  ' + lowestRisk);

const bigRisks = [];
for (var yRep = 0; yRep < 5; yRep++) {
  for (var y = 0; y < risks.length; y++) {
    var row = [];
    for (var xRep = 0; xRep < 5; xRep++) {
      const extraRisk = yRep + xRep;
      for (var x = 0; x < risks[0].length; x++) {
        var newRisk = risks[y][x] + extraRisk;
        while (newRisk > 9) {
          newRisk -= 9;
        }
        row.push(newRisk);
      }
    }
    bigRisks.push(row);
  }
}

const lowestBigRisk = runDijkstra(
  bigRisks,
  [0, 0],
  [bigRisks[0].length - 1, bigRisks.length - 1]
);

console.log('Part 2:  ' + lowestBigRisk);
