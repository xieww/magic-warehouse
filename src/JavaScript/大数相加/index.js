function add(a, b) {
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  let t = 0;
  let f = 0; // 进位
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f; // 对应索引元素相加
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;  
  }
  if (f === 1) {
    sum = "1" + sum;
  }
  return sum;
}

let a = "9007199254740991";
let b = "1234567899999999999";

console.log(add(a, b));
