/**
 * @description 选择排序的原理如下:
 *                 遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，
 *                 遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，
 *                 下次遍历就可以从索引 1 开始重复上述操作。
 * @author xieww
 * @date 2020-10-20
 * @param {*} arr
 * @returns
 */
function selectionSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

console.log(
  "should be [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]",
  selectionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
