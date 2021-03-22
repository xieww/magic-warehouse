function Scheduler() {
  this.list = [];
  this.add = function (promiseCreator) {
    this.list.push(promiseCreator);
  };

  this.maxCount = 2;

  var tempRunIndex = 0;

  this.taskStart = function () {
    for (var i = 0; i < this.maxCount; i++) {
      request.bind(this)();
    }
  };

  function request() {
    if (!this.list || !this.list.length || tempRunIndex >= this.maxCount) {
      return;
    }

    tempRunIndex++;
    this.list
      .shift()()
      .then(() => {
        tempRunIndex--;
        request.bind(this)();
      });
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

scheduler.taskStart();
