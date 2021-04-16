//https://blog.csdn.net/zdplife/article/details/85217330
//https://zhuanlan.zhihu.com/p/27394440
import * as ah from 'async_hooks'
// r： 看不懂了 大致意思是挂载一个钩子，在执行异步的时候能触发到
ah.createHook({
  init() {}
}).enable(); // PromiseHooks 会被强制开启
Promise.resolve(1729).then(() => {
  console.log(`asyncId ${ah.executionAsyncId()} triggerId ${ah.triggerAsyncId()}`);
});
