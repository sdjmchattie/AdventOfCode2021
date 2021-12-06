import { readLines } from '../lib/file-access.js'

const rawInput = readLines('./day06/input.txt')
var lanternFish = rawInput[0].split(',').map((x) => parseInt(x))

for (var i = 0; i < 80; i++) {
  const newFish = lanternFish.filter((v) => v === 0).length
  const nextGeneration = lanternFish.map((f) => f === 0 ? 6 : f - 1)
  lanternFish = [...nextGeneration, ...Array(newFish).fill(8)]
}

console.log('Part 1:  ' + lanternFish.length)

console.log('Part 2:  ')
