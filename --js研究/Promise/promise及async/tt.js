async function() {
  await something();
}
// 实际上就是
async(function*(){
  yield something();
});
// 然后async是
async = generator => {
  const g = generator();
  (function next(value) {
    const n = g.next(value);
    if (n.done) return n.value;
    n.value.then(next);
  }());
}


