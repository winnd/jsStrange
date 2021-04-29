/**
 * ```txt
 * AA ▽
 *    prototype:  ▽
 *      constructor: ƒ AA()
 *    __proto__: ƒ ()
 *
 * a  ▽
 *    AA ▽
 *        __proto__: Object
 * ```
 */
function AA () {}

const a = new AA()

const result1 = a.__proto__ === AA.prototype
const result2 = a.__proto__.constructor === AA

console.log(result1, result2)  // true, true
