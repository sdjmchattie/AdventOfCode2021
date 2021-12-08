import { readLines } from '../lib/file-access.js'
import { sumArray } from '../lib/array-func-tools.js'

class Display {
  constructor(input) {
    this.input = input
  }

  getDigits = (index) => this.input.split('|')[index].trim().split(' ').map((x) => x.split('').sort())

  get everyDigit() {
    if (!this._everyDigit) { this._everyDigit = this.getDigits(0) }
    return this._everyDigit
  }

  get displayDigits() {
    if (!this._displayDigits) { this._displayDigits = this.getDigits(1) }
    return this._displayDigits
  }
}

const groupByLength = (values) => values.reduce((acc, v) => {
  (acc[v.length] = acc[v.length] || []).push(v)
  return acc
}, [])

const rawInput = readLines('./day08/input.txt')
const displays = rawInput.map((input) => new Display(input))
const sumOfUniqueDigits = displays.reduce((acc, disp) => {
  const groups = groupByLength(disp.displayDigits)
  return acc +
    (groups[2]?.length || 0) +
    (groups[3]?.length || 0) +
    (groups[4]?.length || 0) +
    (groups[7]?.length || 0)
}, 0)

console.log('Part 1:  ' + sumOfUniqueDigits)


const intersect = (a, b) => a.filter(x => b.includes(x))

function determineDisplayedValue(display) {
  const allDigitsGrouped = groupByLength(display.everyDigit)

  const one = allDigitsGrouped[2][0]
  const four = allDigitsGrouped[4][0]
  const seven = allDigitsGrouped[3][0]
  const eight = allDigitsGrouped[7][0]
  const two = allDigitsGrouped[5].filter((digit) => intersect(digit, four).length === 2)[0]
  const three = allDigitsGrouped[5].filter((digit) => intersect(digit, one).length === 2)[0]
  const five = allDigitsGrouped[5].filter((digit) => digit !== three && digit !== two)[0]
  const nine = allDigitsGrouped[6].filter((digit) => intersect(digit, four).length === 4)[0]
  const zero = allDigitsGrouped[6].filter((digit) => intersect(digit, seven).length === 3 && digit !== nine)[0]
  const six = allDigitsGrouped[6].filter((digit) => digit !== nine && digit !== zero)[0]

  const digits = {
    [zero]: 0, [one]: 1, [two]: 2, [three]: 3, [four]: 4,
    [five]: 5, [six]: 6, [seven]: 7, [eight]: 8, [nine]: 9
  }

  return parseInt(display.displayDigits.map((d) => digits[d]).join(''))
}

const displayedNumbers = displays.map(determineDisplayedValue)

console.log('Part 2:  ' + sumArray(displayedNumbers))
