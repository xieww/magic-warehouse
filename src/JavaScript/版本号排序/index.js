// 字符串逐为比较字符的Unicode值，有局限性
function compareVersion(arr) {
  return arr.sort((a, b) => (a > b ? -1 : 1));
}

function compareVersion2(arr) {
  return arr.sort((a, b) => {
    let i = 0;
    const arr1 = a.split(".");
    const arr2 = b.split(".");

    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i++];

      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }

      if (s1 === s2) continue;

      return s2 - s1;
    }
  });
}

function compareVersion3(arr) {
  return arr.sort((a, b) => {
    const v1 = a.split(".");
    const v2 = b.split(".");
    const maxLen = Math.max(v1.length, v2.length);
    for (let i = 0; i < maxLen; i++) {
      const n1 = Number(v1[i]) || 0;
      const n2 = Number(v2[i]) || 0;
      return n1 > n2 ? -1 : 1;
    }
    return 0;
  });
}

const arr = ["0.5.1", "0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];

console.log(compareVersion(arr)); // ['4.3.5', '4.3.4.5','4.2','2.3.3','0.5.1', '0.302.1','0.1.1']
console.log(compareVersion2(arr)); // ['4.3.5', '4.3.4.5','4.2','2.3.3','0.302.1','0.5.1', '0.1.1']
console.log(compareVersion3(arr));
