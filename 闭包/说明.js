// 等于是可以在方法b里看到方法a封装的变量  方法b就是闭包


// 例① 在全局调用,但是读取到了foo内部的内容
function foo () {
  var a = 2

  function bar () {
    console.log(a)
  }

  return bar
}

var baz = foo()
baz()

// 例②
function foo () {
  var a = 2

  function baz () {
    console.log(a) // 2
  }

  bar(baz)
}

function bar (fn) {
  fn() // 妈妈快看呀，这就是闭包！
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


// r_: 所以核心在于用function或其他方法把setTimeout的时间参数(i*1000)包起来


