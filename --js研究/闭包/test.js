// ③ 用函数包起来
for (var i = 0; i < 10; i++) {
  _console(i)
}

function _console (index) {
  setTimeout(() => {
    console.log(index)
  }, i * 1000)
}
