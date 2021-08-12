// 第一种
// class U {
//   constructor() {
//     this.promise = Promise.resolve();
//   }

//   console(val) {
//     this.promise = this.promise.then(() => {
//       console.log(val);
//     });
//     return this;
//   }

//   setTimeout(delay) {
//     this.promise = this.promise.then(() => {
//       return new Promise((resolve, reject) => {
//         setTimeout(resolve, delay);
//       });
//     });
//     return this;
//   }
// }

// 第二种
class U {
  constructor() {
    this.queue = [];

    const timer = setTimeout(() => {
      this._run();
      clearTimeout(timer);
    }, 0);
  }

  console(val) {
    const task = () => {
      this._log(val);
      this._run();
    };
    this.queue.push(task);
    return this;
  }

  setTimeout(delay) {
    this.queue.push(this._sleep(delay));
    return this;
  }

  _sleep(timeout) {
    return () => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this._run();
      }, timeout);
    };
  }

  _run() {
    const task = this.queue.shift();
    task && task();
  }

  _log(val) {
    console.log(val);
  }
}

const u = new U();

u.console("breakfast")
  .setTimeout(3000)
  .console("lunch")
  .setTimeout(3000)
  .console("dinner");
