Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  // 获取_bind函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    // 这个时候的arguments是指_bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fNOP ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
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

var bindFoo = bar._bind(foo, "daisy");
var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log("===", obj.habit);
console.log("===", obj.friend);
// shopping
// kevin
