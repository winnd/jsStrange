// 返回是否为真
var a = undefined || 0 || '' || false;
console.log(!!a);


// 判读是否有字符
var b = 'hello';
console.log(!!~~b.indexOf('e'));

// 装饰器 目前不支持
@show()
class C{
    constructor() {}
}
function show() {}
