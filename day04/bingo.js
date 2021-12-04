import { sumArray, transposeArray } from '../lib/array-func-tools.js'

export default class Bingo {
  constructor(board, drawnNumbers) {
    this.board = board
    this.drawnNumbers = drawnNumbers
  }

  get lines() {
    if (!this._lines) {
      this._lines = [...this.board, ...transposeArray(this.board)]
    }
    return this._lines
  }

  get winningDraw() {
    if (!this._winningDraw) {
      this._winningDraw = this.lines.reduce((acc, line) => {
        const winningDrawIndexes = line.map((v) => this.drawnNumbers.indexOf(v))
        return Math.min(acc, Math.max(...winningDrawIndexes))
      }, 100)
    }
    return this._winningDraw
  }

  get score() {
    const allNumbers = this.board.flat()
    const remainingNumbers = allNumbers.filter((v) => this.drawnNumbers.indexOf(v) > this.winningDraw)
    return sumArray(remainingNumbers) * this.drawnNumbers[this.winningDraw]
  }
}
