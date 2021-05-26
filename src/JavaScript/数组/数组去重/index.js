// function unique(array) {
//   const result = [];
//   for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
//     for (var j = 0, resLen = result.length; j < resLen; j++) {
//       if (array[i] === result[j]) {
//         break;
//       }
//     }
//     // 如果array[i]是唯一的，那么执行完循环，j等于resLen
//     if (j === resLen) {
//       result.push(array[i]);
//     }
//   }

//   return result;
// }

// function unique(array) {
//   const result = [];
//   for (let i = 0; i < array.length; i++) {
//     const item = array[i];
//     result.indexOf(item) === -1 && result.push(item);
//   }
//   return result;
// }

// function unique(array) {
//   const result = [];
//   const arr = array.sort();
//   let temp = "";
//   for (let i = 0; i < arr.length; i++) {
//     if (!i || temp !== arr[i]) {
//       result.push(arr[i]);
//     }
//     temp = arr[i];
//   }
//   return result;
// }

function unique(array) {
  return array.filter((item, index, array) => array.indexOf(item) === index);
}

// function unique(array) {
//   return array
//     .concat()
//     .sort()
//     .filter(function (item, index, array) {
//       return !index || item !== array[index - 1];
//     });
// }

var array = [1, 2, 1, 1, "1", "1"];

console.log(unique(array));
