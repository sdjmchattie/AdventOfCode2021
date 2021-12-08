import { readLines } from '../lib/file-access.js'

const groupByLength = (values) => values.reduce((acc, v) => {
  acc[v.length].push(v)
  return acc
}, { 2: [], 3: [], 4: [], 5: [], 6: [], 7:[] })

class Display {
  constructor(input) {
    this.input = input
  }

  getDigits = (index) => this.input.split('|')[index].trim().split(' ')

  get everyDigit() {
    if (!this._everyDigit) { this._everyDigit = this.getDigits(0) }
    return this._everyDigit
  }

  get displayDigits() {
    if (!this._displayDigits) { this._displayDigits = this.getDigits(1) }
    return this._displayDigits
  }
}

const rawInput = readLines('./day08/input.txt')
const displays = rawInput.map((input) => new Display(input))
const sumOfUniqueDigits = displays.reduce((acc, disp) => {
  const groups = groupByLength(disp.displayDigits)
  return acc + groups[2].length + groups[3].length + groups[4].length + groups[7].length
}, 0)

console.log('Part 1:  ' + sumOfUniqueDigits)

console.log('Part 2:  ')
