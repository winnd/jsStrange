const a = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('读取完成')
      resolve()
    }, time)
  })
}

const b = () => {
  console.log('开始读取操作, 解析文件名、文件类型等')
  return a(5000)
    .then(() => {
      console.log('关闭')
    })
}

const d = b()

d.then(() => {
  func1('处理完毕')
})

d.then(() => {
  func2('处理完毕')
})

const func1 = (res) => {
  console.log(`操作1${res}`)
}
const func2 = (res) => {
  console.log(`操作2${res}`)
}
