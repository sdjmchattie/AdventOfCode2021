import { readLines } from '../lib/file-access.js'

const braceComplement = { '(': ')', '[': ']', '{': '}', '<': '>' }
const invalidBraceScore = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
const incompleteBraceScore = { ')': 1, ']': 2, '}': 3, '>': 4 }

function syntaxErrorScore(line) {
  const expected = []
  for(var char of line) {
    if (char in braceComplement) {
      expected.push(braceComplement[char])
    } else if (char in invalidBraceScore && expected.pop() !== char) {
      return invalidBraceScore[char]
    }
  }

  return 0
}

function autocompleteStatementScore(line) {
  const remaining = []
  for (var char of line) {
    if (char in braceComplement) {
      remaining.push(braceComplement[char])
    } else {
      remaining.pop()
    }
  }

  return remaining.reverse().reduce((acc, char) => acc * 5 + incompleteBraceScore[char], 0)
}

const rawInput = readLines('./day10/input.txt')

console.log('Part 1:  ' + rawInput.reduce((acc, line) => acc + syntaxErrorScore(line), 0))

const incompleteLines = rawInput.filter((line) => syntaxErrorScore(line) === 0)
const autocompleteScores = incompleteLines.map((line) => autocompleteStatementScore(line))
const sortedScores = autocompleteScores.sort((a, b) => a - b)
const middleIndex = Math.floor(sortedScores.length / 2.0)

console.log('Part 2:  ' + sortedScores[middleIndex])
