import { readLines } from '../lib/file-access.js'

const braceComplement = { '(': ')', '[': ']', '{': '}', '<': '>' }
const braceScore = { ')': 3, ']': 57, '}': 1197, '>': 25137 }

function syntaxErrorScore(line) {
  const expected = []
  for(var char of line) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        expected.push(braceComplement[char])
        break
      case ')':
      case ']':
      case '}':
      case '>':
        if (expected.pop() !== char) { return braceScore[char] }
    }
  }

  return 0
}

const rawInput = readLines('./day10/input.txt')

console.log('Part 1:  ' + rawInput.reduce((acc, line) => acc + syntaxErrorScore(line), 0))

console.log('Part 2:  ')
