// 顺序合并两个小数组left、right 到 result
function merge(left, right) {
  let result = [];
  let ileft = 0;
  let iright = 0;
  while (ileft < left.length && iright < right.length) {
    if (left[ileft] < right[iright]) {
      result.push(left[ileft++]);
    } else {
      result.push(right[iright++]);
    }
  }
  while (ileft < left.length) {
    result.push(left[ileft++]);
  }
  while (iright < right.length) {
    result.push(right[iright++]);
  }
  return result;
}

// 插入排序
function insertionSort(arr) {
  let n = arr.length;
  let preIndex, current;
  for (let i = 1; i < n; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

// timSort
function timSort(arr) {
  // 空数组或数组长度小于 2，直接返回
  if (!arr || arr.length < 2) return arr;
  let runs = [],
    sortedRuns = [],
    newRun = [arr[0]],
    length = arr.length;
  // 划分 run 区，并存储到 runs 中，这里简单的按照升序划分，没有考虑降序的run
  for (let i = 1; i < length; i++) {
    if (arr[i] < arr[i - 1]) {
      runs.push(newRun);
      newRun = [arr[i]];
    } else {
      newRun.push(arr[i]);
    }
    if (length - 1 === i) {
      runs.push(newRun);
      break;
    }
  }
  // 由于仅仅是升序的run，没有涉及到run的扩充和降序的run，因此，其实这里没有必要使用 insertionSort 来进行 run 自身的排序
  for (let run of runs) {
    insertionSort(run);
  }
  // 合并 runs
  sortedRuns = [];
  for (let run of runs) {
    sortedRuns = merge(sortedRuns, run);
  }
  return sortedRuns;
}

// 测试
var numbers = [4, 2, 5, 1, 3];
console.log(timSort(numbers));
