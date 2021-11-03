function lastPromise(promiseFunction) {
  lastPromise.quickCount = 0;
  lastPromise.slowCount = 0;

  return function () {
    lastPromise.quickCount++;
    return new Promise((resolve, reject) => {
      promiseFunction().then((v) => {
        lastPromise.slowCount++;
        if (lastPromise.quickCount === lastPromise.slowCount) {
          resolve(v);
        }
      });
    });
  };
}

// function lastPromise(promiseFunction) {
//   const cbs = [];
//   const promiseMap = {};
//   return () => {
//     return new Promise((resolve, reject) => {
//       cbs.push(resolve);
//       const p = promiseFunction();
//       promiseMap[p] = resolve;
//       p.then((r) => {
//         if (cbs.indexOf(resolve) !== cbs.length - 1) {
//           return;
//         }
//         resolve(r);
//       });
//     });
//   }
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
