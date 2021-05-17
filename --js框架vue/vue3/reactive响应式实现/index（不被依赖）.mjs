import {Dep, effectWatch, reactive} from './reactive.mjs'

let c = new Dep(10)         // 基本值监听demo
let a = reactive({          // 对象监听demo
    value: 1,
    value2: 2,
})

effectWatch(() => {                 // 注册监听的内容
    const b = a.value + 10
    const c = a.value2 + 10
    console.log({b, c})
})

// 对被监听的值进行修改
a.value = 10
a.value2 = 20
console.log(a)
