Function.prototype.__call = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}.__call is not a function`);
  }
  context = context ? context : typeof window === "undefined" ? global : window;
  context.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(`arguments[${1}]`);
  }
  var result = eval(`context.fn(${args})`);
  delete context.fn;
  return result;
};

// 测试案例
var value = 2;
var obj = {
  value: 1,
};

function bar(name, age) {
  console.log("this", this.value, this === obj);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

// bar._call(null);

console.log(bar.__call(obj, "Jack Ma", 18));
