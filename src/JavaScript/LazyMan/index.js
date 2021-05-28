class Lazy {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this._log(`Hi I am ${name}`);
    const timer = setTimeout(() => {
      this._next();
      clearTimeout(timer);
    }, 0);
  }

  eat(food) {
    const fn = () => {
      this._log(`I am eating ${food}`);
      this._next();
    };
    this.queue.push(fn);
    return this;
  }

  delay(t) {
    return () => {
      const timer = setTimeout(() => {
        this._log(`等待了${t}秒...`);
        clearTimeout(timer);
        this._next();
      }, t * 1000);
    };
  }

  sleep(timer) {
    this.queue.push(this.delay(timer));
    return this;
  }

  sleepFirst(timer) {
    this.queue.unshift(this.delay(timer));
    return this;
  }

  _next() {
    const fn = this.queue.shift();
    fn && fn();
  }

  _log(info) {
    console.log(info);
  }
}

function LazyMan(name) {
  return new Lazy(name);
}

// LazyMan("Tony");
// // Hi I am Tony

// LazyMan("Tony").sleep(10).eat("lunch");
// // Hi I am Tony
// // 等待了10秒...
// // I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// // Hi I am Tony
// // I am eating lunch
// // 等待了10秒...
// // I am eating dinner

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
