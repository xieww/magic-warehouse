// function方式
function createFlow(effects = []) {
  const queue = [...effects.flat()]
  const run = async function(cb) {
    for(let task of queue) {
      if(task.isFlow) {
        await task.run()
      } else {
        await task()
      }
    }
    if(cb) cb()
  }
  return {
    run,
    isFlow: true
  }
}

// class方式
class Flow {
  constructor(effects) {
    this.queue = [...effects.flat()]
  }
  async run(cb) {
    for(let task of this.queue) {
      if(task instanceof Flow) {
        await task.run()
      } else {
        await task()
      }
    }
    if(cb) cb()
  }
};

function createFlow(effects = []) {
    return new Flow(effects)
};

// 测试
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});

// a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印