function Queue(max = 1) {
  // 允许同时执行的任务数
  const queue = new Map(); // 未执行任务队列
  const active = new Map(); // 正在执行的任务队列

  // 添加任务
  queue.enqueue = function enqueue(task) {
    const key = Symbol();
    queue.set(key, task);
    queue.dequeue();
    return;
  };

  // 启动任务，将任务从未执行队列移动到正在执行队列中，并执行该任务
  queue.dequeue = function dequeue() {
    if (active.size >= max || queue.size === 0) {
      // 限制最多同时运行的任务数
      return;
    }
    const key = Array.from(queue.keys())[0];
    const run = queue.get(key);
    active.set(key, run);
    queue.delete(key);
    const { func, payload = [] } = run;
    new Promise((resolve) => {
      func(() => {
        resolve();
      }, ...payload);
    }).then(() => {
      queue.ok(key);
    });
    return;
  };

  // 任务回调，说明一个任务执行完毕，将该任务从队列移除，启动下一个任务
  queue.ok = function ok(task) {
    // 执行完成
    active.delete(task);
    queue.dequeue();
    return;
  };

  return new Proxy(queue, {
    get(target, property) {
      const value = Reflect.get(...arguments);
      if (target[property] instanceof Function) {
        if (target[property]["name"] === "enqueue") {
          return value.bind(target[property]);
        }
        return new Error(`${property} of  queue is not a function`);
      }
      return undefined;
    },
  });
}

export default Queue;
