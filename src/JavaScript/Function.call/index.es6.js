/**
 * 支持浏览器和node环境
 * @param {*} context
 */
Function.prototype._call = function (context, ...args) {
  context = context ? context : typeof window === "undefined" ? global : window;
  context.__fn__ = this;
  let result = context.__fn__(...args);
  delete context.__fn__;
  return result;
};

// 测试案例
var value = 2;
var obj = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

bar._call(null);

console.log(bar._call(obj, "Jack Ma", 18));
