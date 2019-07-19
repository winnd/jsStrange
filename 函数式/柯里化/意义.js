// 我们有这样一个函数checkage：
// https://www.cnblogs.com/tjyoung/p/8976013.html

var min = 18;
var checkage = age => age > min;


// 这个函数并不纯，checkage 不仅取决于 age还有外部依赖的变量 min。 纯的 checkage 把关键数字 18 硬编码在函数内部，扩展性比较差，柯里化优雅的函数式解决。

var checkage = min => (age => age > min);

var checkage18 = checkage(18); // 先将18作为参数，去调用此函数，返回一个函数age => age > 18;

checkage18(20);// 第二步，上面返回的函数去处理剩下的参数，即 20 => 20 > 18; return true;


// 事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法。

// r:柯里化是部分传参
