import { readLines } from '../lib/file-access.js'
import Bingo from './bingo.js'

const rawInput = readLines('./day04/input.txt', false)
const drawnNumbers = rawInput[0].split(',').map((n) => parseInt(n))
const boards = []
var board = []
rawInput.slice(2).forEach((line) => {
  if (line.length === 0) {
    boards.push(new Bingo(board, drawnNumbers))
    board = []
    return
  }

  board.push(line.trim().split(/\s+/).map((n) => parseInt(n)))
})

const winningBoard = boards.sort((boardA, boardB) => boardA.winningDraw < boardB.winningDraw ? -1 : 1)[0]

console.log('Part 1:  ' + winningBoard.score)

console.log('Part 2:  ')
