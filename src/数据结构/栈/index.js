class Stack {
  constructor() {
    this.stack = [];
  }

  /**
   * @description 入栈
   * @author xieww
   * @date 2020-10-13
   * @param {*} val
   * @memberof Stack
   */
  push(value) {
    this.stack.push({
      value,
      min:
        this.stack.length === 0 ? value : Math.min(value, this.getMin()),
      max: this.stack.length === 0 ? value : Math.max(value, this.getMax()),
    });
  }

  /**
   * @description 出栈
   * @author xieww
   * @date 2020-10-13
   * @memberof Stack
   */
  pop() {
    return this.stack.pop();
  }

  /**
   * @description 返回栈顶元素
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Stack
   */
  peek() {
    return this.stack.length > 0
      ? this.stack[this.stack.length - 1].value
      : void 0;
  }

  /**
   * @description 获取栈的长度
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Stack
   */
  getCount() {
    return this.stack.length;
  }

  /**
   * @description 栈是否为空
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Stack
   */
  imEmpty() {
    return this.getCount === 0;
  }

  /**
   * @description 获取最大值
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Stack
   */
  getMin() {
    return this.stack.length > 0
      ? this.stack[this.stack.length - 1].min
      : void 0;
  }

  /**
   * @description 获取最大值
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof Stack
   */
  getMax() {
    return this.stack.length > 0
      ? this.stack[this.stack.length - 1].max
      : void 0;
  }
}

module.exports = Stack;
