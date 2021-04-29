// 闭包类似于面向对象语言的实例的私有变量

// 例① 读取班级里的学生数
function ClassA() {
  let count = 0

  function setStudent() {
    count++
  }

  function printStudentCount() {
    console.log(count)
  }

  function getBookCount() {
    console.log(count)
  }

  return {
    setStudent,
    printStudentCount,
    getBookCount
  }
}

const classA = ClassA()
classA.setStudent()
classA.setStudent()
classA.printStudentCount()
classA.getBookCount()

// 例② 你不知道的js例1
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
