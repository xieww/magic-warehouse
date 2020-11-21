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

/**
 * @description 深拷贝
 * @author xieww
 * @date 2020-10-15
 * @param {*} targetObj
 * @returns
 */
function deepClone(target, map = new WeakMap()) {
  let type = Object.prototype.toString.call(target);
  let cloneTarget;
  if (type === "[object Object]") {
    cloneTarget = {};
  } else if (type === "[object Array]") {
    cloneTarget = [];
  } else {
    return target;
  }
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  for (key in target) {
    let value = target[key];
    cloneTarget[key] = deepClone(value, map);
  }
  return cloneTarget;
}

/**
 * @description 浅拷贝
 * @author xieww
 * @date 2020-10-15
 * @param {*} target
 * @returns
 */
function shallowClone(target) {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
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
a.child = a;

var b = { ...a };
var c = deepClone(b);
b.count = 999;
b.deep.count = 5;
b.arr[1] = "hello";

console.log("a", a);
console.log("b", b);
console.log("c", c);
// console.log("浅拷贝", Object.assign({}, a));
// console.log("深拷贝", JSON.parse(JSON.stringify(a)));
// console.log(
//   "浅拷贝",
//   Array.isArray(test1) ? [...test1] : Object.assign({}, test1)
// );
// console.log("深拷贝", JSON.parse(JSON.stringify(test1)));
