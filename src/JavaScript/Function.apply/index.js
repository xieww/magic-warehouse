/**
 * 模拟实现apply方法
 * @param {*} context 
 * @param {*} arr 
 */
// Function.prototype._apply = function (context, arr) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._apply is not a function`);
  }
//   context = context ? context : typeof window === "undefined" ? global : window;
//   context.fn = this;

//   var result;
//   if (!arr) {
//     result = context.fn();
//   } else {
//     var args = [];
//     for (var i = 0, len = arr.length; i < len; i++) {
//       args.push("arr[" + i + "]");
//     }
//     result = eval("context.fn(" + args + ")");
//   }

//   delete context.fn;
//   return result;
// };

Function.prototype._apply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._apply is not a function`);
  }
  context = context ? context : typeof window === "undefined" ? global : window;
  context.fn = this;

  var result;
  if (arguments && arguments[1]) {
    var args = [];
    for (var i = 0, len = arguments[1].length; i < len; i++) {
      args.push("arguments[1][" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};

// 测试案例
const numbers = [5, 6, 2, 3, 7];

const max = Math.max._apply(null, numbers);
console.log(max); // expected output: 7

const min = Math.min._apply(null, numbers);
console.log(min); // expected output: 2
