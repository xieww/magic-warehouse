Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this}._bind is not a function`);
  }
  var self = this;
  // 获取_bind函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};
  var fBound = function () {
    // 这个时候的arguments是指_bind返回的函数传入的参数
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

function Bar(name, age) {
  this.habit = "shopping";
  console.log("this", this.value, this);
  console.log("name", name);
  console.log("age", age);
}

Bar.prototype.friend = "kevin";

// var bindFoo = Bar._bind(foo, "daisy");
// var obj = new bindFoo("18");
// undefined
// daisy
// 18
// console.log("===", obj.habit);
// console.log("===", obj.friend);
// shopping
// kevin
var bar = Bar.bind(foo, "daisy");
var bb = new bar("18");
console.log("===", bb.habit);
console.log("===", bb.friend);
