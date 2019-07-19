

function tmp (arg) {
  if (arg) {
    console.log(arg);
    return tmp
  } else {        // 返回值
    return 'aaa'
  }
}

function a (arg1) {
  console.log(arg1);
  return tmp
}

a('嘤')('嘤')('嘤')();  // 有返回值
a('嘤')('嘤')('嘤');  // 无返回值