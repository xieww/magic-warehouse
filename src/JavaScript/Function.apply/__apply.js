Function.prototype.__apply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}.__apply is not a function`);
  }
  // context = context ? context : globalThis; // globalThis 为es20新增特性
  context = context ? context : typeof window === "undefined" ? global : window;
  context.fn = this;
  var result;
  if (arguments && arguments[1]) {
    var args = [];
    for (let i = 0; i < arguments[1].length; i++) {
      args.push(`arguments[1][${i}]`);
    }
    result = eval(`context.fn(${args})`);
  } else {
    result = arguments.fn();
  }
  delete context.fn;
  return result;
};

// 测试案例
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.__apply(null, numbers);
console.log(max); // expected output: 7

const min = Math.min.__apply(null, numbers);
console.log(min); // expected output: 2

try {
  "a".__apply();
} catch (error) {
  console.log("异常信息: ", error);
}
