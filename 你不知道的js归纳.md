
① 名字带'链'的分2种

    1. 原型链
      -- 往上查找

    2. 作用域链
      -- 往下查找(包含)

--------------------

② 带_的命名

    应该用于需要供其他方法调用的方法, 如util.js中方法的局部变量可以用_命名
    
    这样在查看util.js文件时容易区分
    
    其他方法的变量名同理

③ 模块管理机制

```
  1. 一种是用对象包装, 将方法作为属性写进去
  
  2. 另外一种是使用函数作用域(??? 待定)
```

④ addEventListener 解除自身引用

    addEventListener('click',(function aa(){
        console.log({aa})
        console.log(arguments)
        removeEventListener('click', arguments.callee)
    }),)

---
看到 3.4.3.1 章
