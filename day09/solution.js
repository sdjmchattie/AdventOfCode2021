import _ from 'lodash'
import { readLines } from '../lib/file-access.js'

const rawInput = readLines('./day09/input.txt')
const heightMap = rawInput.map((y) => y.split('').map((x) => parseInt(x)))
const maxY = heightMap.length - 1
const maxX = heightMap[0].length - 1

const lowPoints = []
var riskLevel = 0
for (var x = 0; x <= maxX; x++) {
  for (var y = 0; y <= maxY; y++) {
    const height = heightMap[y][x]
    if (
      (x == 0 || height < heightMap[y][x - 1]) &&
      (x == maxX || height < heightMap[y][x + 1]) &&
      (y == 0 || height < heightMap[y - 1][x]) &&
      (y == maxY || height < heightMap[y + 1][x])
    ) {
      lowPoints.push({ x: x, y: y })
      riskLevel += height + 1
    }
  }
}

console.log('Part 1:  ' + riskLevel)


const neighbourDeltas = [[0, -1], [0, 1], [1, 0], [-1, 0]]

function higherNeighbours(point) {
  const height = heightMap[point.y][point.x]
  const neighbours = []
  neighbourDeltas.forEach((delta) => {
    const neighbour = { x: point.x + delta[0], y: point.y + delta[1] }
    if (neighbour.x >= 0 && neighbour.x <= maxX && neighbour.y >= 0 && neighbour.y <= maxY) {
      const neighbourHeight = heightMap[neighbour.y][neighbour.x]
      if (neighbourHeight < 9 && neighbourHeight > height) {
        neighbours.push(neighbour)
      }
    }
  })

  return neighbours
}

function basinSize(point) {
  var toReview = [point]
  const reviewed = []

  while(toReview.length > 0) {
    const inReview = toReview.pop()
    toReview = [...toReview, ...higherNeighbours(inReview)]
    reviewed.push(inReview)
    toReview = _.uniqWith(toReview, _.isEqual)
    toReview = _.differenceWith(toReview, reviewed, _.isEqual)
  }

  return reviewed.length
}

const basinSizes = _.sortBy(lowPoints.map(basinSize), (v) => parseInt(v))
console.log(basinSizes)

console.log('Part 2:  ' + basinSizes.pop() * basinSizes.pop() * basinSizes.pop())
