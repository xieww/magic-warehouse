Array.prototype._map = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw TypeError("this is null or not defined");
  }

  if (typeof callback !== "function") {
    throw TypeError(`${callback} not is a function`);
  }

  let O = Object(this);
  let T = thisArg;

  let i = 0;
  let len = O.length >>> 0;
  let A = new Array(len);
  while (i < len) {
    if (i in O) {
      let value = O[i];
      let mappedValue = callback.call(T, value, i, O);
      A[i] = mappedValue;
    }
    i++;
  }
  return A;
};

const arr = [1, 2, 3, 4, 5];
console.log(arr._map((item) => item * 2));
