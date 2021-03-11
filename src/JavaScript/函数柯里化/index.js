{
  function add() {
    let args = [...arguments];
    let fn = function () {
      return add.apply(null, args.concat([...arguments]));
    };
    fn.toString = () => args.reduce((a, b) => a + b);
    return fn;
  }

  console.log(add(1).toString());
  console.log(add(1)(2).toString());
  console.log(add(1)(2)(3).toString());
  console.log(add(1, 2)(3).toString());
  console.log(add(1, 2, 3).toString());
  console.log(add(1)(2, 3).toString());
  console.log(add(1)(2, 3)(4).toString());
}

{
  const curry = (fn, ...args) =>
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
      ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
        fn(...args)
      : /**
         * 传入的参数小于原始函数fn的参数个数时
         * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
         */
        (..._args) => curry(fn, ...args, ..._args);

  function helper(x, y, z) {
    return x + y + z;
  }
  const add = curry(helper);
  console.log(add(1, 2, 3));
  console.log(add(1)(2)(3));
  console.log(add(1, 2)(3));
  console.log(add(1)(2, 3));
}

{
  function curry(fn, args, holes) {
    length = fn.length;

    args = args || [];

    holes = holes || [];

    return function () {
      var _args = args.slice(0),
        _holes = holes.slice(0),
        argsLen = args.length,
        holesLen = holes.length,
        arg,
        i,
        index = 0;

      for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
        if (arg === _ && holesLen) {
          index++;
          if (index > holesLen) {
            _args.push(arg);
            _holes.push(argsLen - 1 + index - holesLen);
          }
        }
        // 处理类似 fn(1)(_) 这种情况
        else if (arg === _) {
          _args.push(arg);
          _holes.push(argsLen + i);
        }
        // 处理类似 fn(_, 2)(1) 这种情况
        else if (holesLen) {
          // fn(_, 2)(_, 3)
          if (index >= holesLen) {
            _args.push(arg);
          }
          // fn(_, 2)(1) 用参数 1 替换占位符
          else {
            _args.splice(_holes[index], 1, arg);
            _holes.splice(index, 1);
          }
        } else {
          _args.push(arg);
        }
      }
      if (_holes.length || _args.length < length) {
        return curry.call(this, fn, _args, _holes);
      } else {
        return fn.apply(this, _args);
      }
    };
  }

  var _ = {};

  var fn = curry(function (a, b, c, d, e) {
    console.log([a, b, c, d, e]);
  });

  // 验证 输出全部都是 [1, 2, 3, 4, 5]
  fn(1, 2, 3, 4, 5);
  fn(_, 2, 3, 4, 5)(1);
  fn(1, _, 3, 4, 5)(2);
  fn(1, _, 3)(_, 4)(2)(5);
  fn(1, _, _, 4)(_, 3)(2)(5);
  fn(_, 2)(_, _, 4)(1)(3)(5);
}