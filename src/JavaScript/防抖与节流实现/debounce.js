/**
 * @description 防抖
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
