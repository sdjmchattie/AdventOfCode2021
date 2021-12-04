import { readLines } from '../lib/file-access.js'
import Bingo from './bingo.js'

const rawInput = readLines('./day04/input.txt')
const drawnNumbers = rawInput[0].split(',').map((n) => parseInt(n))
const boards = []
var board = []
rawInput.slice(2).forEach((line) => {
  if (line.length === 0) {
    boards.push(new Bingo(board))
    board = []
    return
  }

  board.push(line.split(/\s+/).map((n) => parseInt(n)))
})

console.log('Part 1:  ')

console.log('Part 2:  ')
