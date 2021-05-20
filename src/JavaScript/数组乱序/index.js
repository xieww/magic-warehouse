/**
 * @description Fisher–Yates shuffle 洗牌算法
 * @author xieww
 * @date 2021-05-20
 * @param {*} nums
 * @returns
 */
function shuffle(nums) {
  if (nums === null) {
    return null;
  }
  let arr = nums;
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function test_shuffle(shuffleFn) {
  // 多次乱序数组的次数
  let n = 100000;
  // 保存每个元素在每个位置上出现的次数
  let countObj = {
    a: Array.from({ length: 10 }).fill(0),
    b: Array.from({ length: 10 }).fill(0),
    c: Array.from({ length: 10 }).fill(0),
    d: Array.from({ length: 10 }).fill(0),
    e: Array.from({ length: 10 }).fill(0),
    f: Array.from({ length: 10 }).fill(0),
    g: Array.from({ length: 10 }).fill(0),
    h: Array.from({ length: 10 }).fill(0),
    i: Array.from({ length: 10 }).fill(0),
    j: Array.from({ length: 10 }).fill(0),
  };
  for (let i = 0; i < n; i++) {
    let arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    shuffleFn(arr);
    countObj.a[arr.indexOf("a")]++;
    countObj.b[arr.indexOf("b")]++;
    countObj.c[arr.indexOf("c")]++;
    countObj.d[arr.indexOf("d")]++;
    countObj.e[arr.indexOf("e")]++;
    countObj.f[arr.indexOf("f")]++;
    countObj.g[arr.indexOf("g")]++;
    countObj.h[arr.indexOf("h")]++;
    countObj.i[arr.indexOf("i")]++;
    countObj.j[arr.indexOf("j")]++;
  }
  console.table(countObj);
}

test_shuffle(shuffle);
