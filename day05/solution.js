import { readLines } from '../lib/file-access.js'
import { countValues } from '../lib/array-func-tools.js'

function coordsBetweenVert(y1, y2, x) {
  const minY = Math.min(y1, y2)
  const range = Math.abs(y1 - y2) + 1
  return [...Array(range).keys()].map((y) => `${x},${y + minY}`)
}

function coordsBetweenHorz(x1, x2, y) {
  const minX = Math.min(x1, x2)
  const range = Math.abs(x1 - x2) + 1
  return [...Array(range).keys()].map((x) => `${x + minX},${y}`)
}

function coordsBetweenDiag(x1, x2, y1, y2) {
  const leftToRight = x1 < x2
  const xLeft = leftToRight ? x1 : x2
  const xRight = leftToRight ? x2 : x1
  const yLeft = leftToRight ? y1 : y2
  const yRight = leftToRight ? y2 : y1

  const gradient = yLeft < yRight ? 1 : -1
  const range = xRight - xLeft + 1

  return [...Array(range).keys()].map((i) => `${xLeft + i},${yLeft + i * gradient}`)
}

function coordsBetween(definition, processDiagonals = false) {
  const coords = definition.match(/(\d+),(\d+) -> (\d+),(\d+)/)
  const x1 = parseInt(coords[1])
  const y1 = parseInt(coords[2])
  const x2 = parseInt(coords[3])
  const y2 = parseInt(coords[4])

  if (x1 === x2) {
    return coordsBetweenVert(y1, y2, x1)
  } else if (y1 === y2) {
    return coordsBetweenHorz(x1, x2, y1)
  } else if (processDiagonals) {
    return coordsBetweenDiag(x1, x2, y1, y2)
  } else {
    return []
  }
}

const rawInput = readLines('./day05/input.txt')
const part1Counts = countValues(rawInput.flatMap((v) => coordsBetween(v, false)))

console.log('Part 1:  ' + Object.values(part1Counts).filter((v) => v > 1).length)


const part2Counts = countValues(rawInput.flatMap((v) => coordsBetween(v, true)))

console.log('Part 2:  ' + Object.values(part2Counts).filter((v) => v > 1).length)
