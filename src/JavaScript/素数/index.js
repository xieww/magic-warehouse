function isPrime(num) {
  let tmp = num - 1;
  for (let i = 2; i <= tmp; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function primeNum(num) {
  // 声明命名函数（形参）
  var flag = true; // 变量储存=条件为真
  for (var i = 2; i < num; i++) {
    // for设置循环体，遍历是否存在其他约数(素数：从2开始只能被1和自身整除)
    if (num % i === 0) {
      flag = false;
      break; // 存在则终止执行并返回输出
    }
  }
  return flag; // 返回该变量的真假值
}

console.log(isPrime(0));
console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(4));
console.log(isPrime(9));
