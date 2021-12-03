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


function bitwiseReduce(values, mostCommon, prefix='') {
  if (values.length === 1 || values[0].length === 0) {
    return prefix + values[0]
  }

  const counts = values.reduce((acc, v) => {
    acc[v[0]] = acc[v[0]] + 1
    return acc
  }, {'0': 0, '1': 0})

  const difference = counts['1'] - counts['0']
  const nextBitForMostCommonMode = difference >= 0 ? '1' : '0'
  const nextBitForLeastCommonMode = difference >= 0 ? '0' : '1'
  const nextBit = mostCommon ? nextBitForMostCommonMode : nextBitForLeastCommonMode

  return bitwiseReduce(
    values.filter((v) => v[0] === String(nextBit)).map((v) => v.substring(1)),
    mostCommon,
    prefix + nextBit
  )
}

const binaryOxyGenRating = bitwiseReduce(rawInput, true)
const oxyGenRating = parseInt(binaryOxyGenRating, 2)
const binaryCo2ScrubRating = bitwiseReduce(rawInput, false)
const co2ScrubRating = parseInt(binaryCo2ScrubRating, 2)

console.log('Part 2:  ' + oxyGenRating * co2ScrubRating)
