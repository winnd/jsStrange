
let fib = n => n > 1 ? fib(n-1) + fib(n-2) : n
// 自举
(f=>n=>n>1?f(f)(n-1)+f(f)(n-2):n)
(f=>n=>n>1?f(f)(n-1)+f(f)(n-2):n)
(10)
