var a = [[0, 1, 2, 3, 4], [0, 1, 2, 3], [0, 1, 2], [0, 1,], [0]]
var b = [0, 1, 2, 3, 4]
var tmp = []
var result = []
var e = a.map((xItem, xIndex, origin) => {
  tmp.push(xItem.length)
  result.push(...xItem.map((yItem, yIndex) => {
      console.log(tmp.reduce((total, index) => total + index) - (xItem.length - yIndex))
      return tmp.reduce((total, index) => total + index) - (xItem.length - yIndex)
    })
  )
})

// 把 [[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1,],[0]] 展开为
//   [0, 1, 2, 3, 4, 5, 6, 7]

// 用于排对象数组的索引, 折叠面板展开的时候用来确定二级面板里的 item 的索引
