/**
 * @description 防抖函数原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @author xieww
 * @date 2020-10-19
 * @param {function} fn
 * @param {number} [delay=500]
 * @returns
 */
function debounce(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
