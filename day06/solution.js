import { readLines } from '../lib/file-access.js'
import { countValues, sumArray } from '../lib/array-func-tools.js'

function growOneDay(fishCounts) {
  const reproducingFish = fishCounts[0] || 0
  ; [...Array(8).keys()].forEach((i) => fishCounts[i] = fishCounts[i + 1] || 0)
  fishCounts[6] = fishCounts[6] + reproducingFish
  fishCounts[8] = reproducingFish
  return fishCounts
}

const rawInput = readLines('./day06/input.txt')
var lanternFish = rawInput[0].split(',').map((x) => parseInt(x))
const fishCountsPart1 = countValues(lanternFish)

for (var i = 0; i < 80; i++) {
  growOneDay(fishCountsPart1)
}

console.log('Part 1:  ' + sumArray(Object.values(fishCountsPart1)))


const fishCountsPart2 = countValues(lanternFish)
for (var i = 0; i < 256; i++) {
  growOneDay(fishCountsPart2)
}

console.log('Part 2:  ' + sumArray(Object.values(fishCountsPart2)))
