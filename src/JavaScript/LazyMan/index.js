class Lazy {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${name}`);
    const timer = setTimeout(() => {
      this.next();
      clearTimeout(timer);
    }, 0);
  }

  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }

  delay(t) {
    return () => {
      const timer = setTimeout(() => {
        console.log(`等待了${t}秒...`);
        clearTimeout(timer);
        this.next();
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

  next() {
    const fn = this.queue.shift();
    fn && fn();
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