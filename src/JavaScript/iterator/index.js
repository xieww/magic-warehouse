const obj = { a: 1, b: 2, name: "obj", arr: [1, 2, 3] };
obj[Symbol.iterator] = function () {
  let i = 0;
  const keys = Object.keys(this);
  const that = this;
  return {
    next() {
      if (i < keys.length) {
        return { value: that[keys[i++]], done: false };
      }
      return { done: true };
    },
  };
};

for (const item of obj) {
  console.log(item);
}
