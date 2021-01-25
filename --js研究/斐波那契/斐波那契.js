function fibFn (x) {
  if (x === 0 || x === 1) {
    return x
  } else {
    return fibFn(x - 1) + fibFn(x - 2)
  }
}

console.time('fibFn1')
// const a = fibFn(40)
// console.log(a)
console.timeEnd('fibFn1')

const fibFn2Obj = {}

function fibFn2 (x) {
  if (x === 0 || x === 1) {
    fibFn2Obj[`${x}`] = x
    return x
  } else {
    let a, b
    if (fibFn2Obj[`${x - 1}`]) {
      a = fibFn2Obj[`${x - 1}`]
    } else {
      fibFn2Obj[`${x - 1}`] = fibFn2(x - 1)
      a = fibFn2(x - 1)
    }
    if (fibFn2Obj[`${x - 2}`]) {
      b = fibFn2Obj[`${x - 2}`]
    } else {
      fibFn2Obj[`${x - 2}`] = fibFn2(x - 2)
      b = fibFn2(x - 2)
    }
    return a + b
  }
}

console.time('fibFn2')
const c = fibFn2(40)
console.log(c)
console.timeEnd('fibFn2')


// ③
function fib3 (x) {
}


