/**
 * - 很像动态作用域
 * - r：因为是动态绑定的，this只与调用位置有关。
 * - ① 像回调函数这种是在全局作用域里调用的，上下文在全局，所以this会绑到window上，
 * - ② 单层嵌套对象的this会记录最近一层对象作为this的上下文；深层嵌套对象的this同
 * - ↑ 这是因为隐式绑定，本来的话对象里的函数不属于该对象，属于全局，而this只根据调用位置确定，所以es6的匿名函数绑定是对的而es5是一种特殊处理（this显示为对象）
 * - ~~箭头函数是试图把this绑回词法作用域，全部绑到写的位置上去了（一般全都是window）~~
 * - 箭头函数的this统统嗝屁，绑到window上去）（除了回调函数能绑定到对象上面去）
 * - 箭头函数没有自己的this指针， 不能用call，apply，bind绑定this
 * - 总结： es5的对象函数声明有隐式绑定（绑定this到就近对象上），匿名函数没有，且匿名函数无法进行显示绑定
 */
var id = 'not awesome'       // 放在window里
var obj = {
    id: 'awesome',
    cool: function coolFn() {   // this指向obj
        console.log('obj:', {this: this})
        console.log(this.id)
    },
    cool_: () => {              // this指向window
        console.log('obj:', {this: this})
        console.log(this.id)
    },
    cool2: {
        id: 'cool2',
        cool3: function () {        // this指向cool2对象
            debugger
            console.log(this)
            console.log(this.id)
        }
    },
    cool2_: {
        cool3: () => {              // this指向window
            console.log(this)
            console.log(this.id)
        }
    }
}

function cool2_(){
    debugger
    console.log(this)
    console.log(this.id)
}
var cool2__ = ()=>{
    debugger
    console.log(this)
    console.log(this.id)
}

obj.cool()                   // ① 单层嵌套对象的this 'awesome'
obj.cool2.cool3()            // ② 深层嵌套的this     undefinded（因为cool2里面没有id这个属性）
setTimeout(obj.cool, 100)    // ③ 回调里的this      'not awesome'        （因为this只记录一层上下文）

console.log('====箭头函数======')

cool2_.call(obj)             // obj
cool2__.call(obj)            // window      箭头函数绑定到写的地方

function aa() {                 // ④ 普通的嵌套函数里的this，因为没有被对象式调用，所以this还在window上
    console.log('aa')

    function bb() {
        console.log('aa', {this: this})
    }

    bb()
}

aa()

console.log('==========')
