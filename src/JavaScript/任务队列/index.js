// 异步请求队列
const queue = [];
// 用来模拟不同的返回值
let index = 0;
// 标志是否正在处理队列中的请求
let running = false;

// 使用setTimeout模拟异步请求
function request(index) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(index);
    }, 1000);
  });
}

// 连续点击，触发异步请求，加入任务队列
function clickMe() {
  addQueue(() => request(index++));
}

// 当队列中任务数大于0时，开始处理队列中的任务
function addQueue(item) {
  queue.push(item);
  if (queue.length > 0 && !running) {
    running = true;
    process();
  }
}

function process() {
  const item = queue.shift();
  if (item) {
    item().then((res) => {
      console.log("已处理事件" + res);
      process();
    });
  } else {
    running = false;
  }
}
