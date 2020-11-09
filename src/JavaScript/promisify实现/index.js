/**
 * promisify：就是“promise 化”，将一个不是promise的方法变成 promise
 * @param {*} func
 * @param {*} ctx
 */
var promisify = (func, ctx) => {
  // 返回一个新的function
  return function () {
    // 初始化this作用域
    ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        var args = Array.prototype.map.call(arguments, (item) => item);
        var err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err);
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    });
  };
};

// nodeCallback方法func1
var func1 = function (a, b, c, callback) {
  callback(null, a + b + c);
};
// promise化后的func2
var func2 = promisify(func1);
// 调用后输出6
func1(1, 2, 3, (err, result) => {
  if (!err) {
    console.log(result); //输出6
  }
});
func2(1, 2, 3).then(console.log); //输出6
