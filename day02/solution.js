import { readLines } from '../lib/file-access.js'
import { productArray } from '../lib/array-func-tools.js'

const deltas = readLines('./day02/input.txt', (line) => {
  const parts = line.split(' ')
  const direction = parts[0]
  const delta = parseInt(parts[1])

  switch (direction) {
    case 'forward':
      return [delta, 0]
    case 'up':
      return [0, -1 * delta]
    case 'down':
      return [0, delta]
  }
})

const finalPosition = deltas.reduce(
  (acc, current) => [acc[0] + current[0], acc[1] + current[1]],
  [0, 0]
)

console.log('Part 1:')
console.log('  Final position:  ' + finalPosition)
console.log('  Product of position:  ' + productArray(finalPosition))


const finalState = deltas.reduce(
  ({ aim, position }, current) => {
    position[0] += current[0]
    position[1] += current[0] * aim
    aim += current[1]

    return { aim, position }
  },
  { aim: 0, position: [0, 0] }
)

console.log()
console.log('Part 2:  ')
console.log('  Final position:  ' + finalState.position)
console.log('  Product of position:  ' + productArray(finalState.position))
