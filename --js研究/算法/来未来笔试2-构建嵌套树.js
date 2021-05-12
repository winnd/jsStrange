function toNestObj (list) {
  let resultObj = {}
  // todo 用map和weakmap

  for (var i in list) {
    const leaf = list[i]

    if (leaf.parentId === 0) {   // 初始化
      resultObj = leaf
      resultObj.children = []
    } else {
      findParentLeaf(leaf, resultObj)
      console.log(resultObj)
    }
  }
}

function findParentLeaf (leaf, obj) {

  if (leaf.parentId === obj.id) {
    obj.children.push({
      ...leaf,
      children: [],
    })
  } else {
    obj.children.forEach((_obj) => {
      findParentLeaf(leaf, _obj)
    })
  }
}

// ① 改为嵌套结构
// ② 根据嵌套结构递归

//============= 测试代码 ==============
var list = [
  { id: 1001, parentId: 0, name: 'AA' },
  { id: 1002, parentId: 1001, name: 'BB' },
  { id: 1003, parentId: 1001, name: 'CC' },
  { id: 1004, parentId: 1003, name: 'DD' },
  { id: 1005, parentId: 1003, name: 'EE' },
  { id: 1006, parentId: 1002, name: 'FF' },
  { id: 1007, parentId: 1002, name: 'GG' },
  { id: 1008, parentId: 1004, name: 'HH' },
  { id: 1009, parentId: 1005, name: 'II' },
];

toNestObj(list)


