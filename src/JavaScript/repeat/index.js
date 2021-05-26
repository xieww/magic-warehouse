// function repeat(func, times, wait) {
//   return function (...args) {
//     let that = this;
//     let count = 0;
//     let result;
//     let handler = setInterval(() => {
//       if (count >= times) {
//         clearInterval(handler);
//         return;
//       }

//       result = func.apply(that, args);
//       count++;
//     }, wait);

//     return result;
//   };
// }

// function repeat(func, times, wait) {
//   function sleep(fn, wait, args) {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {
//               try {
//                   const res = typeof fn === 'function' && fn.apply(this, args);
//                   resolve(res);
//               } catch (error) {
//                   reject(error);
//               }
//           }, wait);
//       });
//   }
//   return async function (...args) {
//       const promises = new Array(times).fill(sleep);
//       for (const p of promises) {
//           await p(func, wait, args);
//       }
//   }

// }

function repeat(func, times, wait) {
  function sleep(fn, wait, args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fn.apply(this, args);
        resolve();
      }, wait);
    });
  }

  return async function () {
    for (let i = 0; i < times; i++) {
      await sleep(func, wait, arguments);
    }
  };
}
var repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("helloworld");
