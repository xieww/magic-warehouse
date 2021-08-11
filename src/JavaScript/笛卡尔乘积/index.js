function descartes(arr) {
  if (arr.length < 2) {
    return arr[0] ?? [];
  }

  return [].reduce.call(arr, (prev, cur) => {
    const result = [];
    prev.forEach((item) => {
      cur.forEach((i) => {
        const temp = [].concat(Array.isArray(item) ? item : [item]);
        temp.push(i);
        result.push(temp.join(""));
      });
    });
    return result;
  });
}

const arr = [
  ["a", "b"],
  ["m", "n"],
  [0, 1],
];
console.log(descartes(arr));
