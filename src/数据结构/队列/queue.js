/**
 * @description 单向队列
 * @author xieww
 * @date 2020-10-13
 * @class Queue
 */
class Queue {
  constructor() {
    this.queue = [];
  }
  enQueue(item) {
    this.queue.push(item);
  }
  deQueue() {
    return this.queue.shift();
  }
  getHeader() {
    return this.queue[0];
  }
  getLength() {
    return this.queue.length;
  }
  isEmpty() {
    return this.getLength() === 0;
  }
}

module.exports = Queue;
