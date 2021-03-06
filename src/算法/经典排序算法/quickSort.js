/**
 * @description 快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，
 *              则可分别对这两部分记录继续进行排序，以达到整个序列有序
 * @author xieww
 * @date 2020-12-02
 * @param {*} array
 * @returns 
 */
function quickSort(array) {
  console.time("1.快速排序耗时");
  var helper = (arr, left, right) => {
    if (left < right) {
      var x = arr[right];
      var i = left - 1;
      var temp;
      for (var j = left; j <= right; j++) {
        if (arr[j] <= x) {
          i++;
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
      helper(arr, left, i - 1);
      helper(arr, i + 1, right);
    }
  };
  helper(array, 0, array.length - 1);
  console.timeEnd("1.快速排序耗时");
  return array;
}

//方法二
var quickSort2 = function (arr) {
  console.time("2.快速排序耗时");
  var helper = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return helper(left).concat([pivot], helper(right));
  };
  console.timeEnd("2.快速排序耗时");
  return helper(arr);
};

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr));
console.log(quickSort2(arr));
