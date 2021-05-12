function compose() {
  const fns = Array.from(arguments);
  return function (data) {
    return fns.reverse().reduce((pre, fn) => fn(pre), data);
  };
}

// const compose = function (...args) {
//   let length = args.length;
//   let count = length - 1;
//   let result;
//   return function helper(...arg1) {
//     result = args[count].apply(this, arg1);
//     if (count <= 0) {
//       count = length - 1;
//       return result;
//     }
//     count--;
//     return helper.call(null, result);
//   };
// };

const compose =
  (...args) =>
  (data) =>
    args.reduceRight((pre, fn) => fn(pre), data);

const compose = function (...args) {
  let length = args.length;
  let count = length - 1;
  let result;
  return function f1(...arg1) {
    result = args[count].apply(this, arg1);
    if (count <= 0) {
      count = length - 1;
      return result;
    }
    count--;
    return f1.call(null, result);
  };
};

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

console.log("结果是" + f1(f2(f3(f4(3)))));
console.log("结果是" + compose(f1, f2, f3, f4)(3));
