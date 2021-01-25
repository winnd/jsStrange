var canStart = () => new Promise((resolve, reject) => {
  let timer = setInterval(() => {
    if ($('.start').text() === '启动抽奖') {
      resolve()
      clearInterval(timer)
    }
  }, 1000)
})

var clickStartBtn = () => new Promise((resolve, reject) => {
  $('.start').click()
  resolve()
})

var checkCurse = () => new Promise((resolve, reject) => {
  if ($('#window-text').text() === '可用令咒不足，请购买确定') {    // 令咒没了
    reject()
  }
  setTimeout(() => {
    resolve()
  }, 2000)
})


var listDisplayed = () => new Promise((resolve) => {
    let flag  = 0
    let timer = setInterval(() => {
      let arr = Array.from($('.card li')).filter((x, y) => !(x.style['margin-right'] == '0px'))
      
      flag++
      if (arr.length === 0 || flag === 10) {
        resolve()
        clearInterval(timer)
      }
    }, 500)
  }
)

var choiceCard = () => new Promise((resolve) => {
  let r = Math.round(Math.random() * 7)
  $('.card li')[r].click()
  setTimeout(() => {resolve()}, 1000)
})

var maskClosed = () => new Promise((resolve) => {
  let timer = setInterval(() => {
    if ($('.mask')[0].style.display === 'block') {
      clearInterval(timer)
      resolve()
    }
  }, 1000)
})

var finishTurn = () => new Promise((resolve) => {
  $('#window-text a').click()
  resolve()
})


var autoLottey = () => new Promise((resolve, reject) => {
  canStart().then(() => clickStartBtn())
            .then(() => checkCurse())
            .then(() => listDisplayed())
            .then(() => choiceCard())
            .then(() => maskClosed())
            .then(() => finishTurn())
            .catch(() => {return false })
  resolve()
})

var promiseFactory = (item) => new Promise((resolve) => {
//  console.log(item)
  resolve()
})

var executePromise = (promiseList) => {
  let result = Promise.resolve()
  promiseList.forEach(item => {
    item()
    result = result.then(promiseFactory(item))
  })
  return result
}

var array = []
var run   = (x) => {
  for (let i = 0; i < x; i++) {
    array.push(autoLottey)
  }
  executePromise(array)
}

run(3)


