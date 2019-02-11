const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const add1 = (a) => a + a;
const add2 = (a) => a * a;

const bb = pipe(add1, add2);

bb(2);  // 16

// https://juejin.im/post/58f44082da2f60005d3a3710

// reduce(total, currentValue, currentIndex, arr)
// http://www.runoob.com/jsref/jsref-reduce.html


