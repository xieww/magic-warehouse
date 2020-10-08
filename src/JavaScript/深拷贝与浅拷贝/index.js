/**
 * @description 深拷贝
 * @author xieww
 * @date 2020-09-04
 * @param {*} obj
 * @returns
 */
function deepCopy(obj) {
  if (!(typeof obj === "object")) return obj;
  if (obj === null) return null;
  return obj instanceof Array
    ? obj.map((item) => deepCopy(item))
    : Object.entries(obj).reduce(
        (pre, [key, val]) => ({ ...pre, [key]: deepCopy(val) }),
        {}
      );
}

function deepClone(targetObj) {
  let type = Object.prototype.toString.call(targetObj);
  let newObj;
  if (type === "[object Object]") {
    newObj = {};
  } else if (type === "[object Array]") {
    newObj = [];
  } else {
    return targetObj;
  }
  for (key in targetObj) {
    let value = targetObj[key];
    newObj[key] = deepClone(value);
  }
  return newObj;
}

// 测试案例

const test1 = [1, [2], [[3]], { a: 1 }, { b: { c: 1 } }];
// const test2 = { a: [1], b: { c: 2 } };
// console.log("test1", deepCopy(test1));
// console.log("test2", deepCopy(test2));

var a = {
  count: 1,
  deep: { count: 2, obj: { age: 18 } },
  arr: [1, 2, 3, [87, 56]],
};
var b = { ...a };
var c = deepClone(b);
b.count = 999;
b.deep.count = 5;
b.arr[1] = "hello";

console.log("a", a);
console.log("b", b);
console.log("c", c);
// console.log("浅拷贝", Object.assign({}, a));
// console.log("浅拷贝", JSON.parse(JSON.stringify(a)));
// console.log(
//   "浅拷贝",
//   Array.isArray(test1) ? [...test1] : Object.assign({}, test1)
// );
// console.log("浅拷贝", JSON.parse(JSON.stringify(test1)));
