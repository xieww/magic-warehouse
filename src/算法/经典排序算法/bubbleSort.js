function bubbleSort(array) {
  console.time("排序冒泡时间");
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // let temp = array[j + 1];
        // array[j + 1] = array[j];
        // array =temp;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  console.timeEnd("排序冒泡时间");
  return array;
}

function bubbleSort2(arr) {
  console.time("改进后冒泡排序耗时");
  var i = arr.length - 1; //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0; //每趟开始时,无记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j; //记录交换的位置
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    i = pos; //为下一趟排序作准备
  }
  console.timeEnd("改进后冒泡排序耗时");
  return arr;
}

function bubbleSort3(arr) {
  var low = 0;
  var high = arr.length - 1; //设置变量的初始值
  var tmp, j;
  console.time("2.改进后冒泡排序耗时");
  while (low < high) {
    for (
      j = low;
      j < high;
      ++j //正向冒泡,找到最大者
    )
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    --high; //修改high值, 前移一位
    for (
      j = high;
      j > low;
      --j //反向冒泡,找到最小者
    )
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    ++low; //修改low值,后移一位
  }
  console.timeEnd("2.改进后冒泡排序耗时");
  return arr;
}

console.log(
  "should be [-111, -1, 0, 2, 3, 7, 10, 77, 99]",
  bubbleSort([10, 0, 2, 3, 7, 99, -1, 77, -111])
);
console.log(
  "should be [-111, -1, 0, 2, 3, 7, 10, 77, 99]",
  bubbleSort2([10, 0, 2, 3, 7, 99, -1, 77, -111])
);
console.log(
  "should be [-111, -1, 0, 2, 3, 7, 10, 77, 99]",
  bubbleSort3([10, 0, 2, 3, 7, 99, -1, 77, -111])
);