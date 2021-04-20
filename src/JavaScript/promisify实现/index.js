/**
 * promisify：就是“promise 化”，将一个不是promise的方法变成 promise
 * nodeCallback:
 *    1. 回调函数在主函数中的参数位置必须是最后一个;
 *    2. 回调函数参数中的第一个参数必须是 error
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
        var args = Array.prototype.slice.call(arguments);
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

{
  var promisify = function (method, ctx) {
    return function () {
      //获取method调用的需要参数
      var args = Array.prototype.slice.call(arguments);

      // use runtime this if ctx not provided
      ctx = ctx || this;

      //返回一个新的Promise对象
      return new Promise(function (resolve, reject) {
        //除了函数传入的参数以外还需要一个callback函数来供异步方法调用
        var callback = function (err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        };

        args.push(callback);
        //调用method
        method.apply(ctx, args);
      });
    };
  };
}

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
