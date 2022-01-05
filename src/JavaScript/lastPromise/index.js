function lastPromise(promiseFunction) {
  let quickCount = 0;
  let slowCount = 0;

  return function () {
    quickCount++;
    return new Promise((resolve) => {
      promiseFunction().then((v) => {
        slowCount++;
        if (quickCount === slowCount) {
          resolve(v);
        }
      });
    });
  };
}

// function lastPromise(promiseFunction) {
//   const temp = [];
//   return function () {
//     return new Promise((resolve) => {
//       temp.push(resolve);
//       promiseFunction().then((r) => {
//         if (temp.indexOf(resolve) === temp.length - 1) {
//           resolve(r);
//         }
//       });
//     });
//   };
// }

// 示例
let count = 1;
let promiseFunction = () =>
  new Promise((rs) =>
    setTimeout(() => {
      rs(count++);
    })
  );
let lastFn = lastPromise(promiseFunction);
lastFn().then(console.log); // 无输出 count = 1
lastFn().then(console.log); // 无输出 count = 2
lastFn().then(console.log); // 3 count = 3