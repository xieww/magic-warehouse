Function.prototype.__bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}.__bind is not a function`);
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();
  return fBound;
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

var bindFoo = bar.__bind(foo, "daisy");
var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log("===", obj.habit);
console.log("===", obj.friend);
// shopping
// kevin