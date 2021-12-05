const countValues = (array) => array.reduce((acc, v) => {
  acc[v] = (acc[v] || 0) + 1
  return acc
}, {})
const productArray = (array) => array.reduce((acc, cur) => acc * cur, 1)
const sumArray = (array) => array.reduce((acc, cur) => acc + cur, 0)
const transposeArray = (array) => array.map((_, i) => array.map((e) => e[i]))

export { countValues, productArray, sumArray, transposeArray }
