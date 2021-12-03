import { readLines } from '../lib/file-access.js'

const rawInput = readLines('./day03/input.txt')

const summedBits = rawInput.reduce((acc, line) => {
  return acc.map((_, i) => acc[i] + parseInt(line[i]))
}, Array(rawInput[0].length).fill(0))

const thresh = rawInput.length / 2
const binaryGammaRate = summedBits.map((bitSum) => bitSum > thresh ? '1' : '0').join('')
const gammaRate = parseInt(binaryGammaRate, 2)
const binaryEpsilonRate = summedBits.map((bitSum) => bitSum > thresh ? '0' : '1').join('')
const epsilonRate = parseInt(binaryEpsilonRate, 2)

console.log('Part 1:  ' + gammaRate * epsilonRate)

console.log('Part 2:  ')
