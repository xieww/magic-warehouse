function add(a, b) {
  const arrA = a.split(".");
  const arrB = b.split(".");
  a = arrA[0];
  b = arrB[0];
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  let t = 0;
  let f = 0; // 进位
  let sum = "";

  // 处理有小数的情况
  let decimalA = arrA[1] || "";
  let decimalB = arrB[1] || "";
  let r = 0;
  let h = 0;
  let n = "";
  if (decimalA || decimalB) {
    const decimalLength = Math.max(decimalA.length, decimalB.length);
    decimalA = decimalA.padEnd(decimalLength, 0);
    decimalB = decimalB.padEnd(decimalLength, 0);
    for (let i = decimalLength - 1; i >= 0; i--) {
      r = parseInt(decimalA[i]) + parseInt(decimalB[i]) + h; // 对应索引元素相加
      h = Math.floor(r / 10);
      n = (r % 10) + n;
    }
  }
  f = h;
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f; // 对应索引元素相加
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f === 1) {
    sum = "1" + sum;
  }

  return n ? `${sum}.${n}` : sum;
}

let a = "9007199254740991";
let b = "1234567899999999999";

console.log(add(a, b));
console.log(add("98743.12", "34863634.9869"));
console.log(add("98743.12", "34863634.8009"));
console.log(add("9007199254740991.3", "1234567899999999999.8009"));
