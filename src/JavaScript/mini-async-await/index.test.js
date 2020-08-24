const asyncToGenerator = require("./index");

const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

// 原生async/await
async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}

// 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
test().then((res) => console.log(res));

// 自定义async/await实现
function* generatorFn() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

asyncToGenerator(generatorFn)().then((res) => {
  console.log(res);
});
