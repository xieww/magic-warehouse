// Array.prototype._flat = function () {
//   return this.toString().split(",");
// };

// 栈
// Array.prototype.__flat = function (num = 1) {
//   if (!Number(num) || Number(num) < 0) {
//     return this;
//   }
//   let result = [];
//   const stack = [].concat(this);
//   while (stack.length) {
//     const item = stack.pop();
//     if (Array.isArray(item)) {
//       stack.push(...item);
//     } else {
//       result.unshift(item);
//     }
//   }
//   return result;
// };

//forEach + 递归
Array.prototype.__flat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let result = [];
  this.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(item.__flat(num - 1));
    } else {
      result.push(item);
    }
  });
  return result;
};

Array.prototype._flat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1);
      } else {
        // 缓存元素
        result.push(item);
      }
    });
  })(this, num);
  return result;
};

// reduce + 递归
Array.prototype.fakeFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = [].concat(this);
  return num > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? cur.fakeFlat(num - 1) : cur),
        []
      )
    : arr.slice();
};

const arr = [1, [0, 8, 23, "abc", [1024, 5, "hello"]], 7, 37, 26, , "world", ,];
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];
const arr2 = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "string",
  { name: "弹铁蛋同学" },
];

console.log(arr.__flat(Infinity));
console.log(animals.__flat()); // ["🐷", "🐶", "🐂", "🐎", ["🐑", ["🐲"]], "🐛"]
console.log(animals.fakeFlat(2)); // [ '🐷', '🐶', '🐂', '🐎', '🐑', [ '🐲' ], '🐛' ]
console.log(animals.__flat(Infinity)); // ['🐷', '🐶','🐂', '🐎','🐑', '🐲','🐛']
console.log(animals.__flat(0));
console.log(animals.__flat(-10));
console.log(arr2.__flat());
