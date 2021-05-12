Array.prototype._splice = function (index, counter, ...arg) {
  if (!arguments.length) {
    return [];
  }

  // 数组为空的情况
  const len = this.length;
  if (len === 0) {
    arg.forEach((item, index) => {
      this[index] = item;
    })
    this.length = arg.length;
    return [];
  }

  if (index < 0) {
    if (Math.abs(index) > this.length) {
      index = 0;
    } else {
      index += this.length;
    }
  }

  if (typeof counter === "undefined") {
    counter = this.length - index;
  }

  const removeList = this.slice(index, index + counter);

  const right = this.slice(index + counter);

  let addIndex = index;
  arg.concat(right).forEach((item) => {
    this[addIndex] = item;
    addIndex++;
  });
  this.length = addIndex;

  return removeList;
};

var fruits = ["Banana", "Orange", "Apple", "Mango"];
const arr = [];
console.log(fruits._splice(1, 2, "hah", "cc", "ff"), fruits);
console.log(arr._splice(1, 2, "hah", "cc", "ff"), arr);
