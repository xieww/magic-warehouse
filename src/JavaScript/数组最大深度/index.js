function maxDeep(arr, deep) {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    // 是否是数组
    if (Array.isArray(arr[i])) {
      res.push(...arr[i]);
    }
  }

  if (res.length === 0) {
    return deep;
  } else {
    return maxDeep(res, ++deep);
  }
}

const arr = [1, [2, 3], [4, [5, [6, 7]]], [8]];

console.log(maxDeep(arr, 1));