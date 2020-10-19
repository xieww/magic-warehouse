/**
 * @description 第一种,节流
 * @author xieww
 * @date 2020-10-19
 * @param {function} fn
 * @param {number} [delay=500]
 * @returns
 */
function throttle(fn, delay = 500) {
  let last = 0;
  return function (...args) {
    let now = new Date();
    if (now - last < delay) {
      return;
    }
    last = now;
    fn.apply(this, args);
  };
}

/**
 * @description 第二种
 * @author xieww
 * @date 2020-10-19
 * @param {function} fn
 * @param {number} [delay=500]
 * @returns
 */
function throttle(fn, delay = 500) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}

/**
 * @description 加强版节流，结合防抖
 * @author xieww
 * @date 2020-10-19
 * @param {function} fn
 * @param {number} [delay=500]
 * @returns
 */
function throttle(fn, delay = 500) {
  let last = 0;
  let timer = null;
  return function (...args) {
    let now = new Date();
    if (now - last > delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      // 这个时候表示时间到了，必须给响应
      last = now;
      fn.apply(this, args);
    }
  };
}
