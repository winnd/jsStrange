###导引

函数式是一种编程范式, 所谓编程范式, 就是一种根据语言的功能对编程语言进行分类的方法, 常见的范式分为2个大类

- 命令式编程 告诉计算机如何改变状态 (使用状态搭建程序)
    1. 过程式编程 是把一组指令转化成程序的编程方式 (c等语言, 调用各种api结合变量存储状态从而构成程序)
    2. 面向对象编程 将指令与他们所操作的状态的一部分进行分组, 代码被组织成对象, 这些对象包装了他们各自的代码修改状态 (封装指令和状态为一个对象, 然后调用)
    - 特征: ① 能说明并控制操作发生的顺序, ② 允许副作用的产生(不同方法里调用io,db,http等), 可以共享一个外部变量(所以操作共用变量时要注意)
```js 命令式编程
const frits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
let fruit
for(var i =0; i<fruits.legnth;i++){
    if(fruits[i].name === 'apple') {
        fruit = fruits[i]
        break
    }
}
console.log(fruit)                 // 过程式获得fruit: 在完整,半完整的流程中获得值
```

```js 声明式编程 - 函数式
const fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
const fruit = fruits.filter(x=>x.name === 'apple')   // 这一行声明描述了如何从fruits里面拿对应名字水果这一行为: 在描述中获得值。 
                                                     // 我们在这里关注偏重会转移到fruit上而不是获取fruit的过程上
console.log(fruit)
```

```js 反应式
of(1,2,3)                             // 获取初始值并包装为可观察对象 (容器构造器)
  .pipe(                              // 定义一个数据处理管道 (组合式)
      filter(item=>item % 2 === 1),   // filter
      map(item=>item * 3),            // map
).subscribe(item=> {                  // 订阅
  console.log(item)
})

option.subscribe(print)
option.subscribe(write)
option.subscribe(console.log)

```

- 声明式编程 程序员只定义获取结果的属性, 而不直接计算获得结果 (声明一句xxx的语句) (弱化了结果 而强化了(思考/程序声明)过程本身)
    - in which the programmer merely(仅) declares(定义) properties of the desired(想要的) result, but not how to compute it

    - 函数式 (functional) 将所需结果声明为一系列函数应用的值 (当这句程序声明出来的时候逻辑已经写完了, 变量名只是用于给结果赋值的)
    - 逻辑式 (logic) (不懂)
    - 数学式 (mathematical) (不懂, 经济等领域用的多)
    - 反应式 (reactive) 响应式, 声明观察器和订阅器, 通过监控数据流完成程序功能 (r: 事件流,事件监听后的回调; 三大框架数据绑定,基本都是种响应式的思想)
    - 特征: 不需要关心状态(变量)的执行顺序(即副作用); 控制流程更自由(组合式)

~~- 相反, 符合声明式编程规范的语言可以不关心状态的执行顺序.~~ 
  ~~作为替代, 他们在(语言)系统里提供了一系列操作符, 和每个操作执行的条件(使用规范/方法)~~
  ~~语言的执行模型的实现 跟踪了哪些操作符是自由执行的和独立指令~~
~~In contrast, languages that fit the declarative paradigm do not state the order in which to execute operations.~~ 
~~Instead, they supply a number of available operations in the system, along with the conditions under which each is allowed to execute.~~ 
~~The implementation of the language's execution model tracks which operations are free to execute and chooses the order independently.~~
~~More at Comparison of multi-paradigm programming languages.~~

总结一下两大编程范式就是
- 命令式编程是通过创建并改变状态变量来构成程序的
- 声明式编程是通过函数定义和函数组合构成程序, 程序功能在声明时构建完成 (非常极端的例子里整个程序里没有变量, 只有常量; 要记录状态的时候通过闭包、 柯里化(部分应用)、 实时计算来记录数据)

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
        - 是高度抽象的概念, 如: filter 抽象了一个过滤的能力,部分应用了过滤这个功能; map 抽象了一个映射的能力
        1. 部分应用 (Partial application) 指生成一个部分应用了的新函数
        2. 柯里化
            - 部分应用是生成一个新函数, 而柯里化是只采用单个参数传参的函数序列化技术, 柯里化用到了部分应用而不是部分应用本身
        3. 配合声明式和组合式方法编写程序, 可以使功能更加模块化
        4. 组合式编程(见下文)
            1. 函数式里的组合式编程是高阶函数的应用,通过传入函数然后嵌套调用达到组合的目的, 但是在js里比较难研究, 因为没有类型约束
            2. 插一句vue的组合式, 组合主要体现在return对象里 [vue组合式js文件](./vue_js.png);  [vue组合式](./vue.png)
                1. 组合式既指代码构建方式, 又指自己的api(api提供了使代码组合化的能力), watch等都是独立代码, 没有以前写watch对象时必须放在一起的约束
                2. 是说把相关功能放在一起属于那块业务的 (GroupSet.vue)

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
parseJsonFunc('a')                  // 这是部分应用, filter也算部分应用,不过里面是抽象了过滤功能

a(objStr)('a')                      // 这是柯里化
```


2. 纯函数
    - 是函数式编程概念里的子集, 使用纯函数时,固定的入参会返回固定的结果, 并且不受任何**可变状态**或**副作用**的影响
        - 可变状态: 全局变量, js里外部包裹函数的局部变量等不固定因素, 实在要用可以参数的形式传入
        - 副作用(side effect), 会导致不确定结果的动作, 如io输入,db,网络数据等, 可变状态也算副作用(内存操作)
    - 无外部依赖, 容易删除
    - 结果稳定(参照透明或幂等性), 可使用[备忘录模式](https://en.wikipedia.org/wiki/Memoization) 进行缓存优化
    - 可组合性, 可安全修改两条调用语句的执行顺序([线程安全](https://en.wikipedia.org/wiki/Thread_safety))


3. 递归
    - 尾递归优化, 这是一种语言功能, 具体概念来自于函数式语言实现的尾调用中, 因为js也是函数式的一种语言实现所以有该功能



### 组合式编程
map是个映射, 获取一个值然后映射为另一个值, 需要应用在容器里, 而js里数组是个天然容器所以可以使用map
为什么容器这么重要, 因为容器可以封装自己的方法属性, 像map方法,value值,
func of: {
    map:fn => of(x=>fn(x))      // {for};
    value: 'xxx'                // [1,2,3]
    maybe: fn => of(x =>x ? null: fn(x))
}

of([1,2,3])
.map(x=>x)                  // 对每一个item应用一个方法
.map(x=>x)

map
> map is the name of a highter-order function that applies a given function to each element of a functor
map是将给定功能应用于每个元素的高阶函数的名称, 并以相同的顺序返回结果列表



- 这个链式调用一样的实现了map的东西就是函子(functor)
- functor 是实现(作用于)了 map 函数並遵守一些特定规则的容器类别。
- 函子是作用于两个范畴之间的函数
- 态射
  - 态射是范畴内对象之间的映射关系。函子与它类似，函子是范畴与范畴间的映射关系
也就是可以通过一个函子，把一个范畴映射到另一个范畴。
- (范畴论) 函子将一个范畴的每个物件和另一个范畴的物件相关连起来，并将第一个范畴的每个态射和第二个范畴的态射相关连起来 (一个类型转到另一个类型) 
    - (范畴学是使用另外不相关领域的知识来解决当前领域某个问题的学说, 是一门映射的学问)(坐标 空间到几何的映射)

      - In functional programming, a functor is a design pattern inspired by the definition from category theory,
      that allows for a generic type to apply a function inside without changing the structure of the generic type.
    - 在函数式编程中，函子是受范畴理论中定义的启发而产生的一种设计模式，它允许一个通用类型在不改变通用类型结构的情况下，在内部应用一个函数。

    - Functors are very useful in modeling functional effects to apply a function to computations that did not yet finish.
    - 在模拟函数效应时，向尚未完成的计算应用函数是非常有用的。


```js todo 组合式编程1 todo 这个有问题
var fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]

function choosePrice2Fruit(fruits){
  let _fruits = []
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].price === 2) {
      _fruits.push(fruits[i])
    }
  }
  return _fruits
}

function pricePlus(fruits){
  let _fruits = []
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].price++
    _fruits.push(fruits[i])
  }
  return _fruits
}

function print(fruits) {
  console.log(fruits)
}

function compose (fn1,fn2){
  return function (list){
    return fn2(fn1(list))
  }
}


var ricePrice = compose(compose(choosePrice2Fruit,pricePlus),print)
ricePrice(fruits)

```

```js 组合式编程2 filter, map
var fruits = [{name:'apple',price:1},{name:'banana',price:2},{name:'pear',price:2}]
var newbatchFruits = fruits
  .filter(x=>x.price === 2)
  .map(x=>({...x,price:++x.price}))
console.log({newbatchFruits, fruits})
```


-- 总结
1. 引入了新的编程思想 (高阶函数, 组合式编程, 响应式编程)
2. 可维护性强 (模块化, 纯函数, 组合式编程)
3. 高性能(尾调用)

### 其他
--------- 其他概念 -------------

- functor
    - monad
        - 简单说，Monad就是一种设计模式，表示将一个运算过程，通过函数拆解成互相连接的多个步骤。你只要提供下一步运算所需的函数，整个运算就会自动进行下去。
        - io monad
        - future, promise
        - 组合子
        - ~~自函子范畴上的幺半群(这句话是混淆了数学跟编码里的monad的概念)~~
    - 其他如Maybe函子等

```js write monade
var writer = value => [value, []];
var unit = value => [value, []];

var squared = x => [x * x, [`${x} was squared.`]];
var halved = x => [x / 2, [`${x} was halved.`]];
var bind = (writer, transform) => {
    var [value, log] = writer;
    var [result, updates] = transform(value);
    return [result, log.concat(updates)];
};
var pipelog = (writer, ...transforms) => {
    debugger
    return
    transforms.reduce(bind, writer);
}
pipelog(unit(4), squared, halved);
```

immutable 不可变元素
    - 为了尽可能消除副作用去掉了可变变量, (见上面)

map, filter等语言自带的组合子 cpu核心友好

closure 闭包

-- 设计原则 --
关注点分离 SoC(Separation_of_concerns)
    程序员必须同时做几件事，即
        描述要计算的内容；
        将计算顺序组织成小步；
        在计算过程中组织内存管理。
当关注点分离开来时，就有更多的机会进行模块升级，重用和独立开发


---------------- 新加的没整理的 -----------------------
函子
    - https://blog.csdn.net/zhang6223284/article/details/82774584?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=1331647.13654.16184217759537601&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control

--- todo 
2. 我实现过的promise
3. 
4. 我代码里的函数式
5. 闭包
6. 组合子


