class Queue {
  constructor() {
    this.queue = [];
    this.time = 0;
    this.timers = [];
  }
  task(delay, task) {
    this.time += delay;
    this.queue.push([task, this.time]);
    return this;
  }
  start() {
    this.queue.forEach((item) => {
      const t = setTimeout(() => {
        item[0]();
      }, item[1]);
      this.timers.push(t);
    });
  }

  stop() {
    for (const t of this.timers) {
      clearTimeout(t);
    }
  }
}

const q = new Queue();

q.task(1000, () => {
  console.log(1);
})
  .task(2000, () => {
    console.log(2);
  })
  .task(1000, () => {
    console.log(3);
  })
  .start();
q.stop(); // 可以随时终止任务