// function numberFormat(num) {
//   const array = num.toString().split(".");
//   const arr = array[0].split("").reverse();
//   const result = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (i !== 0 && i % 3 === 0) {
//       result.push(",");
//     }
//     result.push(arr[i]);
//   }
//   result.reverse();
//   if (array[1]) {
//     return result.join("").concat("." + array[1]);
//   } else {
//     return result.join("");
//   }
// }

// function numberFormat(num) {
//   const array = num.toString().split(".");
//   const arr = array[0].split("");
//   let count = 0;
//   let result = "";
//   while (arr.length) {
//     const item = arr.pop();
//     if (count === 3) {
//       result = item + "," + result;
//       count = 0;
//     } else {
//       result = item + result;
//     }
//     count++;
//   }
//   if (array[1]) {
//     return result.concat("." + array[1]);
//   } else {
//     return result;
//   }
// }

// function numberFormat(num) {
//   return num.toString().replace(/\d+/, function (n) {
//     // 先提取整数部分
//     return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
//       return $1 + ",";
//     });
//   });
// }

function numberFormat(num) {
  return (
    num &&
    num.toString().replace(/\d+/, function (s) {
      return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    })
  );
}

var a = 1234567894532;
var b = 673439.4542;
console.log(numberFormat(a)); // "1,234,567,894,532"
console.log(numberFormat(b)); // "673,439.4542"
