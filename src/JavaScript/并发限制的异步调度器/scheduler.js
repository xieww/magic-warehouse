class Scheduler {
  constructor(count) {
    this.queue = [];
    this.max = count || 2;
    this.current = 0;
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }

  run() {
    if (!this.queue.length || this.current >= this.max) {
      return;
    }
    this.current++;
    const task = this.queue.shift();
    task &&
      task().then(() => {
        this.current--;
        this.run();
      });
  }

  initRun() {
    for (let i = 0; i < this.max; i++) {
      this.run();
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.initRun();
