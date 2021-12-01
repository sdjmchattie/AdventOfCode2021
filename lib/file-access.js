import fs from 'fs'

export function readLines(filename, mapFunc=(x) => x) {
  return fs.readFileSync(filename).toString().split("\n").map(mapFunc)
}

export function readIntList(filename) {
  return readLines(filename, item => parseInt(item)).map(item => parseInt(item))
}
