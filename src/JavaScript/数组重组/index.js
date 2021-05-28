function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var arr = [...new Set(new Array(10).fill(0).map(() => random(0, 99)))].sort(
  (a, b) => a - b
);

// 连续数字为一组
// function helper(arr) {
//   var result = [];
//   var reset = [];
//   // while (arr.length) {
//   //   const item = arr.shift();
//   //   if (reset.length === 0) {
//   //     reset.push(item);
//   //     continue;
//   //   }
//   //   if (item === reset[reset.length - 1] + 1) {
//   //     reset.push(item);
//   //   } else {
//   //     result.push(reset);
//   //     reset = [];
//   //     reset.push(item);
//   //   }
//   // }
//   // if (reset.length > 0) {
//   //   result.push(reset);
//   // }

//   arr.map((e, index) => {
//     reset.push(e);
//     if (arr[index + 1] !== ++e) {
//       result.push(reset);
//       reset = [];
//     }
//   });
//   return result;
// }

// 数字最高位相同的为一组
function helper(arr) {
  var result = [];
  arr.forEach((val) => {
    let index = parseInt(val / 10);
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(val);
  });
  return result.filter((item) => item.length > 0);
}

console.log(helper(arr));
