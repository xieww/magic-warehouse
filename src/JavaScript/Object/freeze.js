/**
 * @description 冻结对象，兼容”数组“、”普通对象“
 * @author xieww
 * @date 2021-05-08
 * @param {*} obj
 */
function _freeze(obj) {
  if (Array.isArray(obj)) {
    for (const key of Reflect.ownKeys(obj)) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (!desc) continue;
      if ("value" in desc) {
        Object.defineProperty(obj, key, {
          configurable: false,
          writable: false,
        });
      } else {
        Object.defineProperty(obj, key, { configurable: false });
      }
    }
  } else {
    if (obj instanceof Object) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          Object.defineProperty(obj, key, {
            writable: false,
          });
          _freeze(obj[key]); // 递归，实现更深层次的冻结
        }
      }
    }
    Object.seal(obj);
  }
  return obj;
}

function __freeze(obj) {
  if (obj instanceof Object) {
    for (const key in obj) {
      if (obj[key] instanceof Object) {
        __freeze(obj[key]); // 递归，实现更深层次的冻结
      } else {
        Object.defineProperty(obj, key, {
          writable: false,
        });
      }
    }
  }
  Object.seal(obj);
  return obj;
}

const obj = {
  prop: 42,
  children: {
    name: 'jack'
  }
};

const arr = [1, 2, 3, 4];

_freeze(arr);
arr[3] = "hello";
arr.length = 10;

_freeze(obj);
obj.prop = 33;
obj.name = "xie";
obj.children.name = "xie"
delete obj.prop;
// Throws an error in strict mode

console.log(arr);
console.log(obj);
