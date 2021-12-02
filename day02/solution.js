import { readLines } from '../lib/file-access.js'
import { productArray } from '../lib/array-func-tools.js'

const input = readLines('./day02/input.txt', (line) => {
  const parts = line.split(' ')
  const direction = parts[0]
  const distance = parseInt(parts[1])

  switch (direction) {
    case 'forward':
      return [distance, 0]
    case 'up':
      return [0, -1 * distance]
    case 'down':
      return [0, distance]
  }
}).filter((x) => x !== undefined)

const finalPosition = input.reduce(
  (acc, current) => [acc[0] + current[0], acc[1] + current[1]],
  [0, 0]
)

console.log('Part 1:')
console.log('  Final position:  ' + finalPosition)
console.log('  Product of position:  ' + productArray(finalPosition))

console.log()
console.log('Part 2:  ')
