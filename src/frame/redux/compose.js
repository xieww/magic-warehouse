function compose() {
  const fns = Array.from(arguments);
  return function (data) {
    return fns.reverse().reduce((pre, fn) => fn(pre), data);
  };
}

function f1(data) {
  console.log("f1执行");
  return data + 1;
}
function f2(data) {
  console.log("f2执行");
  return data + 2;
}
function f3(data) {
  console.log("f3执行");
  return data + 3;
}
function f4(data) {
  console.log("f4执行");
  return data + 4;
}

console.log('结果是'+f1(f2(f3(f4(3)))))
console.log("结果是" + compose(f1, f2, f3, f4)(3));
