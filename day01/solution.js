import { readIntList } from '../lib/file-access.js'
import { sumArray } from '../lib/lib.js'

const rawDepths = readIntList('./day01/input.txt')

var increases = 0
for (var i = 1; i < rawDepths.length; i++) {
  increases += rawDepths[i] > rawDepths[i - 1] ? 1 : 0
}

console.log('Part 1:  ' + increases)


increases = 0
for (var i = 3; i < rawDepths.length; i++) {
  const prevWindow = sumArray(rawDepths.slice(i - 3, i))
  const curWindow = sumArray(rawDepths.slice(i - 2, i + 1))
  increases += curWindow > prevWindow ? 1 : 0
}

console.log('Part 2:  ' + increases)
