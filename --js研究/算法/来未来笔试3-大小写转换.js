function convert(jsonObj) {
  // 请实现
  toCamelCase(jsonObj)
  return jsonObj
}

function isObj(arg) {return Object.prototype.toString.call(arg) === '[object Object]'}

function isArr(arg) {Object.prototype.toString.call(arg) === '[object Array]'}

function toCamelCase (obj) {
  const keys = Object.keys(obj)
  keys.forEach(oldKeyName => {
    const keyWords = oldKeyName.split('_')
    const newKey = keyWords.map(x => {     // 首字母大写
      const [_firstLetter, ..._restLetter] = x.split('')
      const newKeyfragmentWord = [_firstLetter.toUpperCase(), _restLetter.join('')].join('')
      return newKeyfragmentWord
    })
    newKey.shift()
    const newKeyName = `${keyWords[0]}${newKey.join('')}`
    obj[`${newKeyName}`] = obj[`${oldKeyName}`]
    delete obj[`${oldKeyName}`]
  })

  for (let i in obj) {
    if (obj[i] instanceof Array) {
      obj[i].forEach(x => toCamelCase(x))
    } else if (obj[i] instanceof Object) {
      toCamelCase(obj[i])
    }
  }
  return obj
}

function aa (obj2) {
  toCamelCase(obj2)
  return obj2
}

// ------ 测试 ---------
// console.log(convert({ 'a_bc_def': 1 }));
// console.log(convert({ 'a_bc_def': { 'foo_bar': 'a_bc_def' } }));
console.log(convert({ 'a_bc_def': [{ 'foo_bar': 2 }, { 'goo_xyz': 3 }] }));
