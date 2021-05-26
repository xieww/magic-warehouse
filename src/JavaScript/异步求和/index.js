function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

async function sumT(a, b) {
  return await new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
}

async function sum(...args) {
  // 如果仅有一个，直接返回
  if (args.length === 1) return args[0];
  let result = [];
  // 两两一组，如果有剩余一个，直接进入
  for (let i = 0; i < args.length - 1; i += 2) {
    result.push(sumT(args[i], args[i + 1]));
  }
  if (args.length % 2) result.push(args[args.length - 1]);
  // Promise.all 组内求和
  return sum(...(await Promise.all(result)));
}

(async function () {
  console.time("耗时");
  const test = await sum(1, 2, 3, 4, 5);
  console.timeEnd("耗时");
  console.log(test);
})();
