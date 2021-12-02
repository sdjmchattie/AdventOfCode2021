export function sumArray(array) {
  return array.reduce((acc, cur) => acc + cur, 0)
}

export function productArray(array) {
  return array.reduce((acc, cur) => acc * cur, 1)
}
