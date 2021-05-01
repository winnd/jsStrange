/**
 * - 很像动态作用域
 * - r：因为是动态绑定的，this只与调用位置有关。
 * - ①像回调函数这种是在全局作用域里调用的，上下文在全局，所以this会绑到window上，
 * - ②普通对象的this会记录最近一层对象作为this的上下文
 * - 箭头函数是试图把this绑回词法作用域
 */
var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log( 'obj:',{this:this} );
        console.log(this.id)
    },
    cool2:{
        cool3: function (){
            debugger
            console.log(this)
            console.log(this.id)
        }
    }
};


var id = "not awesome"
obj.cool();                     // ① 单层嵌套对象的this 'awesome'
obj.cool2.cool3()               // ② 深层嵌套的this     undefinded
setTimeout( obj.cool, 100 );    // ③ 回调里的this      'not awesome'        （因为this只记录一层上下文）

console.log('==========')

function aa (){                 // ④ 普通的嵌套函数里的this，因为没有被对象式调用，所以this还在window上
    console.log('aa')
    function bb(){
        console.log('aa',{this:this})
    }
    bb()
}
aa()

console.log('==========')
