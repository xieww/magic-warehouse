// 一
function reverse(list) {
  const refs = [];

  let currentList = list;
  while (Array.isArray(currentList[1])) {
    refs.push(currentList);
    currentList = currentList[1];
  }
  refs.push(currentList);

  const middle = Math.floor(refs.length / 2);
  const maxIndex = refs.length - 1;

  for (let i = 0; i < middle; i++) {
    const left = refs[i];
    const right = refs[maxIndex - i];

    [left[0], right[0]] = [right[0], left[0]];
  }
}

// 二
function fn(list) {
  let val = null;

  function* fn2(v) {
    if (typeof v[1] === "string") {
      val = v[1];
      yield v[0];
    } else {
      const data = fn2(v[1]);

      for (let item of data) {
        yield item;
      }

      yield v[0];
    }
  }

  let result = null;
  let parentArr = null;
  let currentArr = null;

  for (let item of fn2(list)) {
    if (!parentArr) {
      result = parentArr = currentArr = [item];
    } else {
      currentArr = [item];
      parentArr.push(currentArr);

      parentArr = currentArr;
    }
  }

  currentArr.push(val);

  return result;
}

const data = [1, [2, [3, [4, [5, "null"]]]]];

reverse(data);

console.log(JSON.stringify(data));
