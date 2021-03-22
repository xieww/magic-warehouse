/**
 * 支持浏览器和node环境
 * 模拟实现call方法
 * @param {*} context 
 * @param  {...any} args 
 */
Function.prototype._call = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._call is not a function`);
  }
  context = context ? context : typeof window === "undefined" ? global : window;
  // context.__fn__ = this;
  // let result = context.__fn__(...args);
  // delete context.__fn__;
  // return result;

  const fn = Symbol()
  context[fn] = this;
  var result =  context[fn](...args)
  Reflect.deleteProperty(context, fn)
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
