/**
 * @description 循环队列
 * @author xieww
 * @date 2020-10-13
 * @class CircularQueue
 */
class CircularQueue {
  constructor(length) {
    this.queue = new Array(length + 1);
    // 队头
    this.first = 0;
    // 队尾
    this.last = 0;
    // 当前队列大小
    this.size = 0;
  }

  /**
   * @description 将一个元素放入队列的尾部
   * @author xieww
   * @date 2020-10-13
   * @param {*} item
   * @memberof Queue
   */
  push(value) {
    // 判断队尾 + 1 是否为队头
    // 如果是就代表需要扩容数组
    // % this.queue.length 是为了防止数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1);
    }
    this.queue[this.last] = value;
    this.size++;
    this.last = (this.last + 1) % this.queue.length;
  }

  /**
   * @description 从队列首部移除元素
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  pop() {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    let r = this.queue[this.first];
    this.queue[this.first] = null;
    this.first = (this.first + 1) % this.queue.length;
    this.size--;
    // 判断当前队列大小是否过小
    // 为了保证不浪费空间，在队列空间等于总长度四分之一时
    // 且不为 2 时缩小总长度为当前的一半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2);
    }
    return r;
  }

  /**
   * @description 返回队列首部的元素
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  peek() {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    return this.queue[this.first];
  }

  /**
   * @description 获取队列长度
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  getLength() {
    return this.queue.length - 1;
  }

  /**
   * @description 队列是否为空
   * @author xieww
   * @date 2020-10-13
   * @returns {boolean}
   * @memberof Queue
   */
  isEmpty() {
    return this.first === this.last;
  }

  /**
   * @description 对队列进行扩容
   * @author xieww
   * @date 2020-10-13
   * @param {*} length
   * @memberof CircularQueue
   */
  resize(length) {
    let q = new Array(length);
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length];
    }
    this.queue = q;
    this.first = 0;
    this.last = this.size;
  }
}

module.exports = CircularQueue;
