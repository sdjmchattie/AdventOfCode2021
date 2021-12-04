import fs from 'fs'

export function readLines(filename, dropLastLine = true, mapFunc=(x) => x) {
  var lines = fs.readFileSync(filename)
    .toString()
    .split("\n")

  if (dropLastLine) {
    lines = lines.slice(0, -1)
  }

  return lines.map(mapFunc)
}

export function readIntList(filename) {
  return readLines(filename, item => parseInt(item)).map(item => parseInt(item))
}
