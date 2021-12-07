import { readLines } from '../lib/file-access.js'

function median(values){
  if (values.length === 0) { throw new Error("No inputs") }
  values.sort((a, b) => a - b)
  const half = Math.floor(values.length / 2)
  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2.0
}

const rawInput = readLines('./day07/input.txt')
const positions = rawInput[0].split(',').map((x) => parseInt(x))
const medianPos = median(positions)

const totalFuel = positions.reduce((acc, x) => acc + Math.abs(medianPos - x), 0)

console.log('Part 1:  ' + totalFuel)

console.log('Part 2:  ')
