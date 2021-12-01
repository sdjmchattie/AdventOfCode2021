import { readIntList } from '../lib/file-access.js'

const rawDepths = readIntList('./day01/input.txt')

var increases = 0
for (var i = 1; i < rawDepths.length; i++) {
  increases += rawDepths[i] > rawDepths[i - 1] ? 1 : 0
}

console.log('Part 1:  ' + increases)
