/**
 * 一次性事件
 */
document.addEventListener('click', function () {
    console.log('aa')
    document.removeEventListener('click',arguments.callee)
});

/**
 * 或者具名
 */
document.addEventListener('click', function aa() {
    console.log('aa')
    document.removeEventListener('click', aa)
});
