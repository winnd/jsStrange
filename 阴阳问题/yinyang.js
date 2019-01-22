function MakeYin(){
  console.log(1)
  return cc = function(){
    debugger
    console.log('@')
    var yang = MakeYang(cc);
    return yang(yang)
  }
}
function MakeYang(yin){
  console.log(2)
  return cc = function(){
    debugger
    console.log('*')
    return yin(cc)
  }
}
var yin = MakeYin()
yin(yin)

// MakeYang(MakeYang)()
// MakeYang(MakeYang)()()
// MakeYang(MakeYang)()()()