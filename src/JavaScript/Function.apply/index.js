Function.prototype._apply = function (context, arr) {
  var context = context
    ? context
    : typeof window === "undefined"
    ? global
    : window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};

// 测试案例
const numbers = [5, 6, 2, 3, 7];

const max = Math.max._apply(null, numbers);
console.log(max);// expected output: 7


const min = Math.min._apply(null, numbers);
console.log(min); // expected output: 2

