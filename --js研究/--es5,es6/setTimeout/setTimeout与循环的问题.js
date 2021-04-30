/**
 * setTimeout与循环的问题
 * 本质是用作用域代替块
 */

// ① 自执行函数
for (var i = 0; i < 5; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(j)
        }, j * 1000)
    })(i)
}

// ③ 用函数作用域包起来 相当于自执行函数
for (var i = 0; i < 10; i++) {
    _console(i)
}

function _console(index) {
    setTimeout(() => {
        console.log(index)
    }, i * 1000)
}

// ② 闭包
// 跟上面不同的是上面是方法定义了4遍， 这里是方法执行了4遍
for (var i = 0; i < 5; i++) {
    (function () {
        var j = i // 核心
        setTimeout(
            () => { console.log(j) },
            j * 1000
        )
    })()
}


// ④ 用try catch包起来
for (var i = 0; i <= 5; i++) {
    try {
        throw i
    } catch (i) {
        setTimeout(async () => {
            console.log(i)
        }, i * 1000)
    }
}

