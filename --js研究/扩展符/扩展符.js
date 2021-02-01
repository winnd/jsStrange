// ① 判断几个值是否相等
function recurisivelyCheckEqual (x, ...rest) {
  return Object.is(x, rest[0]) && (rest.length < 2 || recurisivelyCheckEqual(...rest))
}

const result = recurisivelyCheckEqual(1, 1, 2)
console.log(result)

