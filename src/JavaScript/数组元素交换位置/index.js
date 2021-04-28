function exchange(arr) {
  const temp = [];
  for (let i = 0; i < arr.length; ) {
    const item = arr[i];
    if (item < 0) {
      arr.splice(i, 1);
      temp.push(item);
      i--;
    } else {
      i++;
    }
  }
  return [...arr, ...temp];
}

const arr = [-10, 0, 8, -77, -99, 34, 69, 88, -101];

console.log(exchange(arr));
