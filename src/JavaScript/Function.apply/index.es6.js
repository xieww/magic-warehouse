/**
 * ES6版apply方法
 * @param {*} context 
 * @param {*} args 
 */
Function.prototype._apply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._apply is not a function`);
  }
  context = context ? context : typeof window === "undefined" ? global : window;
  context.__fn__ = this;
  let result = context.__fn__(...args);
  delete context.__fn__;
  return result;
};

// 测试案例
const numbers = [5, 6, 2, 3, 7];

const max = Math.max._apply(null, numbers);
console.log(max); // expected output: 7

const min = Math.min._apply(null, numbers);
console.log(min); // expected output: 2
