Object.prototype._assign = function (target) {
  target = target || arguments[0];
  if (target === undefined || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = Object(target);
  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];
    if (nextSource !== undefined || nextSource !== null) {
      for (const key in nextSource) {
        if (Object.hasOwnProperty.call(nextSource, key)) {
          result[key] = nextSource[key];
        }
      }
    }
  }
  return result;
};

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object._assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
