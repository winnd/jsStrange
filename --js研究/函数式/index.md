###导引

函数式是一种编程范式, 所谓编程范式, 就是一种根据语言的功能对编程语言进行分类的方法, 常见的范式分为2个大类

- 命令式编程 告诉计算机如何改变状态 (使用状态搭建程序)
    - 过程式编程 是把一组指令转化成程序的编程方式 (c等语言, 调用各种api结合变量存储状态从而构成程序)
    - 面向对象编程 将指令与他们所操作的状态的一部分进行分组, 代码被组织成对象, 这些对象包装了他们各自的代码修改状态 (封装指令和状态为一个对象, 然后调用)
    - 特征: ① 能说明并控制操作发生的顺序, ② 允许副作用的产生, 可以共享一个外部变量(所以操作共用变量时要注意)
```js
const fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
let fruit
for(var i =0; i<fruits.legnth;i++){
    if(fruits[i].name === 'apple') {
        fruit = fruits[i]
    }
}
console.log(fruit)                 // 过程式获得fruit
```

```js

```


```js
const fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
const fruit = fruits.filter(x=>x.name === 'apple')   // 描述了如何从fruits里面拿对应名字水果这一行为
console.log(fruit)
```

```js
of(1,2,3)                             // 获取初始值并包装为可观察对象 (可以当作被proxy包起来)
  .pipe(                              // 应用到每一个对象上
      filter(item=>item % 2 === 1),   // filter
      map(item=>item * 3),            // map
).subscribe(item=> {                  // 
  console.log(item)
})
```

- 声明式编程 程序员只定义获取结果的属性, 而不直接计算获得结果 (弱化了结果 而强化了(思考/程序声明)过程本身)
    - in which the programmer merely(仅) declares(定义) properties of the desired(想要的) result, but not how to compute it
    - 函数式 (functional) 将所需结果声明为一系列函数应用的值 (当这句程序声明出来的时候逻辑已经写完了, 变量名只是用于给结果赋值的)
    - 逻辑式 (logic) (不懂)
    - 数学式 (mathematical) (不懂, 经济等领域用的多)
    - 反应式 (reactive) 响应式, 通过数据流和变化来声明 (r: 事件流,事件监听后的回调,vue等数据绑定,监听数据然后被动获得结果)
    - 特征: 不需要关心状态(变量)的执行顺序(即副作用); 控制流程更自由(组合式)

In contrast, languages that fit the declarative paradigm do not state the order in which to execute operations. 
Instead, they supply a number of available operations in the system, along with the conditions under which each is allowed to execute. 
The implementation of the language's execution model tracks which operations are free to execute and chooses the order independently.
More at Comparison of multi-paradigm programming languages.

总结一下两大编程范式就是
- 命令式编程是通过创建并改变状态变量来构成程序的
- 声明式编程是通过函数定义和函数组合构成程序, 程序功能在声明时构建完成


###函数式是什么


函数式是一种编程范式, 通过声明、应用和组合函数来构造程序, 其中函数声明是将值映射到其他值的表达式树, 而不是一系列更新程序运行状态的命令性语句


### 函数式起源
- 来源于学术界的[lambda演算](https://en.wikipedia.org/wiki/Lambda_calculus)
    - lambda演算 是使用函数抽象和变量绑定、替换的数理逻辑来表达计算的一个**形式系统**, 是一套通用[计算模型](https://en.wikipedia.org/wiki/Model_of_computation)
        - 形式系统是(数学中)用来根据一套规则从公理推断定理的。这些用于进行从公理推断定理的规则，就是形式系统的逻辑计算。形式系统本质上是一个 "公理系统"
            - 说人话就是(形式系统是)从公理推断定理的一套方法, 再说的简单点就是一套方法
        - 计算模型 计算模型是描述给定输入如何计算数学函数的输出的模型
            - 通俗点就是怎么写代码的方法论, 包括有限状态机,λ演算,组合逻辑,抽象重写系统等。具体看维基
    - 那么翻译下就是 lambda 是学术中用`函数抽象和变量绑定、替换`来表达计算的一套方法, 是一套代码写法

- 翻译下就是 函数式编程起源于学术中用`函数抽象和变量绑定、替换`来表达计算的一套方法, 是一套代码写法


### 函数式特性
1. 一等公民
    - 指函数可以作为参数和返回值进行传递
    - 高阶函数
        - 指输入一个函数或输出一个函数的函数
        - 高度抽象的概念, 如: filter 抽象了一个过滤的能力,部分应用了过滤这个功能; map 抽象了一个映射的能力
        1. 部分应用 (Partial application) 指生成一个部分应用了的新函数
        2. 柯里化
            - 部分应用是生成一个新函数, 而柯里化是只采用单个参数传参的函数序列化技术, 柯里化用到了部分应用而不是部分应用本身
        3. 组合式编程
            1. 函数式里的组合式编程 f(g()) === g(f()) , 跟map,filter可以对调用差不多, 但是在js里比较难用, 因为没有类型
            2. 因为纯函数干净, 函数调用之间不会相互影响, 可以组合编程语句  (todo 这个有问题)[vue组合式](./vue.png)
        3. 配合声明式和组合式方法编写程序, 可以使功能更加模块化
```js
const a = (count1) => (count2)=> count1+count2
const b = a(1)
b(4)

// -----部分应用-------
function a(str){
  try{
    const b = JSON.parse(str)
    return function (props){
      console.log(b[`${props}`])
    }
  } catch(err){
    throw new Error('解析失败')
  }
}
const obj = {a:'1',b:'2'}
var objStr = JSON.stringify(obj)
var parseJsonFunc = a(objStr)
parseJsonFunc('a')                  // 这是部分应用

a(objStr)('a')                      // 这是柯里化


// --- filter, map
var fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
var newbatchFruits = fruits.filter(x=>x.price === 2).map(x=>({...x,price:++x.price}))
console.log({newbatchFruits, fruits})

// -- 组合式编程 --
var fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]

function aa(fruits){
  const _fruits = fruits
  _fruits.filter(x=>x.price === 2)
  return _fruits
}

function bb(fruits){
  return fruits.map(x=>({...x,price:++x.price}))
}

function comp(fn1,fn2){
  return function (list){
    return bb(aa(list))
  }
}

var a = comp(aa,bb)
a(fruits)

```

2. 纯函数
    - 是函数式编程概念里的子集, 使用纯函数时,固定的入参会返回固定的结果, 并且不受任何可变状态或副作用的影响
        - 可变状态, 全局变量, js里外部包裹函数的变量等不固定因素, 实在要用可以参数的形式传入
        - 副作用(side effect), 会导致不确定结果的动作, 如io输入,db,网络数据等, 可变状态也算副作用(内存操作)
    - 无外部依赖, 容易删除
    - 结果稳定(参照透明或幂等性), 可使用[备忘录模式](https://en.wikipedia.org/wiki/Memoization) 进行缓存优化
    - 可组合性, 可安全修改两条调用语句的执行顺序([线程安全](https://en.wikipedia.org/wiki/Thread_safety))


3. 递归
    - 尾递归优化, 这是一种语言功能, 具体概念来自于函数式语言实现的尾调用中, 因为js也是函数式的一种语言实现所以有该功能


-- 总结
1. 引入了新的编程思想 (高阶函数, 组合式编程, 响应式编程)
2. 可维护性强 (模块化, 纯函数, 组合式编程)
3. 高性能(尾调用)


---------其他 -------------
monad 单子
    - 衍生的 io monad, 是专门处理副作用的
    - future, promise 模式
组合子
immutable 不可变元素
map, filter cpu核心友好
closure 闭包

-- 设计原则 --
关注点分离 SoC(Separation_of_concerns)
    程序员必须同时做几件事，即
        描述要计算的内容；
        将计算顺序组织成小步；
        在计算过程中组织内存管理。
当关注点分离开来时，就有更多的机会进行模块升级，重用和独立开发

