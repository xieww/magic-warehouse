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

  /**
   * @description 将一个元素放入队列的尾部
   * @author xieww
   * @date 2020-10-13
   * @param {*} item
   * @memberof Queue
   */
  push(value) {
    this.queue.push(value);
  }

  /**
   * @description 从队列首部移除元素
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  pop() {
    return this.queue.shift();
  }

  /**
   * @description 返回队列首部的元素
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  peek() {
    return this.queue[0];
  }

  /**
   * @description 获取队列长度
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Queue
   */
  getLength() {
    return this.queue.length;
  }

  /**
   * @description 队列是否为空
   * @author xieww
   * @date 2020-10-13
   * @returns {boolean}
   * @memberof Queue
   */
  isEmpty() {
    return this.getLength() === 0;
  }
}

module.exports = Queue;
