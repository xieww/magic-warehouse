/**
 * @description 冻结对象
 * @author xieww
 * @date 2021-05-08
 * @param {*} obj
 */
function _freeze(obj) {
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
};

console.log("====", _freeze(obj));
// Object.freeze(obj)

obj.prop = 33;
obj.name = "xie";
delete obj.prop;
// Throws an error in strict mode

console.log(obj);
