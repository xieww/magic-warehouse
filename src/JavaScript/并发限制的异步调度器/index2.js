class Scheduler {
  constructor(count) {
    this.count = 2;
    this.queue = [];
    this.run = [];
  }

  add(task) {
    this.queue.push(task);
    return this.schedule();
  }

  schedule() {
    if (this.run.length < this.count && this.queue.length) {
      const task = this.queue.shift();
      const promise = task().then(() => {
        this.run.splice(this.run.indexOf(promise), 1);
      });
      this.run.push(promise);
      return promise;
    } else {
      return Promise.race(this.run).then(() => this.schedule());
    }
  }
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

var scheduler = new Scheduler();

function addTask(time, order) {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
