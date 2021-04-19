function randomNum(min, max) {
  var range = max - min;
  var rand = Math.random();
  var num = min + Math.floor(rand * range); //舍去
  return num;
}

function redEnvelope(money, n) {
  let num = money * 100;
  if (num < n || num < 1) {
    throw new Error("每个人分配到的红包金额不能小于一分");
  }
  const result = new Array(n).fill(1);
  num -= n;
  let i = 0;
  while (num > 1) {
    const f = randomNum(0, num);
    result[i % n] += f;
    i++;
    num -= f;
  }
  if (num > 0) {
    result[0] += num;
  }

  return result.map((item) => item / 100);
}

console.log(
  redEnvelope(100, 6),
  parseInt(redEnvelope(100, 6).reduce((sum, num) => sum + num))
);
