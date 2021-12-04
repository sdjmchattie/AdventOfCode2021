const productArray = (array) => array.reduce((acc, cur) => acc * cur, 1)
const sumArray = (array) => array.reduce((acc, cur) => acc + cur, 0)
const transposeArray = (array) => array.map((_, i) => array.map((e) => e[i]))

export { productArray, sumArray, transposeArray }
