
const mSetInterval = (func, interval, time) => new Promise(resolve => {
  let result = Promise.resolve()

  for (let i = 0; i < time; i++) {
    result = result.then(() =>
      runTimeout(func, interval)
    )
  }
  return result
})

const aa = () => {console.log('aa')}

const runTimeout = (func, interval) => new Promise((resolve) => {
  setTimeout(() => {
    func();
    resolve()
  }, interval)
})

mSetInterval(aa, 1000, 3)
