class Scheduler {
  constructor(max = 2) {
    this.tasks = [];
    this.max = max;
    this.current = 0;
  }
  add(promiseCreator) {
    return new Promise((resolve) => {
      this.tasks.push(() => promiseCreator().then(resolve));
      this.runTask();
    });
  }
  runTask() {
    if (this.current >= this.max || !this.tasks.length) {
      return;
    }
    let currentTask = this.tasks.shift();
    if (currentTask) {
      this.current++;
      currentTask().then(() => {
        this.current--;
        this.runTask();
      });
    }
  }
}
const timeout = (timer) => new Promise((resolve) => setTimeout(resolve, timer));
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order);
    });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
