import { readLines } from '../lib/file-access.js'

const rawInput = readLines('./day09/input.txt')
const heightMap = rawInput.map((y) => y.split('').map((x) => parseInt(x)))
const maxY = heightMap.length - 1
const maxX = heightMap[0].length - 1

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
      riskLevel += height + 1
    }
  }
}

console.log('Part 1:  ' + riskLevel)

console.log('Part 2:  ')
