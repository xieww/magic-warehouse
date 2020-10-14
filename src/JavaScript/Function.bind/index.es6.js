Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._bind is not a functionÎ`);
  }

  var self = this;
  return function Fn(...params) {
    if (this instanceof Fn) {
      return new self(...args, ...params);
    }

    return self.apply(context, [...args, ...params]);
  };
};

// 测试案例
var value = 2;
var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log("name", name);
  console.log("age", age);
}

bar.prototype.friend = "kevin";

var bindFoo = bar._bind(foo, "daisy");
// console.log("bindFoo", bindFoo("18"));
var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log("===", obj.habit);
console.log("===", obj.friend);
// shopping
// kevin
console.log("obj", obj);
