Promise.retry = function (callback, max) {
  let counter = 0;
  function execution() {
    return new Promise((resolve, reject) => {
      console.log(`正在执行第${counter}次重试`);
      resolve(callback());
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => {
        counter++;
        if (counter >= max) {
          console.log("抱歉，多次重试失败，程序退出执行！");
          return Promise.reject(err);
        } else {
          return execution();
        }
      });
  }

  return execution();
};

Promise.retry(() => {
  i++;
  return "retry";
}, 10)
  .then((res) => {
    console.log("res", res);
  })
  .catch((error) => {
    console.log("error", error);
  });
