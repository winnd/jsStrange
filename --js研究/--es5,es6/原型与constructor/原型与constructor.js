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
function AA() {}

const a = new AA()

const result1 = a.__proto__ === AA.prototype
const result2 = a.__proto__.constructor === AA

console.log(result1, result2)  // true, true


// ① 原型继承
function A(name) {
    this.name = 'ccc'
}

A.prototype.myName = function () {
    return this.name
}

function B(name, label) {
    A.call(this, name)
    this.label = label
}

/**
 * 之前如果B.prototype里有东西会被丢弃掉，所以B.prototype.myLabel只能定义在这句话后面
 * - 最好是用Object.setPrototypeOf(B.prototype,A.prototype)来进行扩展
 * @type {A|*}
 */
B.prototype = Object.create(A.prototype)

B.prototype.myLabel = function () {
    return this.label
}
var b = new B('b', 'obj b')
console.log({
    name: b.myName(),
    label: b.myLabel()
})

