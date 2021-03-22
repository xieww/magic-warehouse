function multiRequest(urls, max) {
  const sum = urls.length; // 请求总数
  const result = new Array(sum).fill(false);
  let count = 0; // 已完成
  return new Promise((resolve, reject) => {
    while (count < max) {
      next();
    }
    function next() {
      let current = count++;
      if (current >= sum) {
        !result.includes(false) && resolve(result);
        return;
      }

      const url = urls[current];
      console.log("开始：" + current, new Date().toLocaleString());
      window
        .fetch(url)
        .then((res) => {
          console.log("结束：" + current, new Date().toLocaleString());
          result[current] = res;
          if (current < sum) {
            next();
          }
        })
        .catch((err) => {
          console.log("结束：" + current, new Date().toLocaleString());
          result[current] = err;
          if (current < sum) {
            next();
          }
        });
    }
  });
}

const arr = new Array(100).fill("https://api.github.com/search/users?q=d");
multiRequest(arr, 10).then((res) => {
  console.log(res);
});
