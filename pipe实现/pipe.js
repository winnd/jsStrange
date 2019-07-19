debugger
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);    // 解决嵌套太深

const add1 = (a) => a + a;
const add2 = (a) => a * a;

const bb = pipe(add1, add2);

bb(2);  // 16

// 等于是先执行add1,再把结果给add2
// https://juejin.im/post/58f44082da2f60005d3a3710

// reduce((total, currentValue, currentIndex, arr)=>{},initialValue(可选))
// http://www.runoob.com/jsref/jsref-reduce.html

