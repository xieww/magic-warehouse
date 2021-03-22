// once 参数表示是否只是触发一次
const wrapCallback = (fn, once = false) => ({ callback: fn, once });

class EventEmitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件
  }

  /**
   * @description 只触发一次
   * @author xieww
   * @date 2020-10-20
   * @param {*} type
   * @param {function} fn
   * @memberof EventEmitter
   */
  once(type, fn) {
    this.addListener(type, fn, true);
  }

  /**
   * @description 添加事件监听
   * @author xieww
   * @date 2020-10-20
   * @param {*} type
   * @param {function} fn
   * @param {boolean} [once=false]
   * @memberof EventEmitter
   */
  addListener(type, fn, once = false) {
    let handler = this._events.get(type);
    if (!handler) {
      // 为 type 事件绑定回调
      this._events.set(type, wrapCallback(fn, once));
    } else if (handler && handler.callback === "function") {
      // 如果handler.callback是函数说明只有一个监听者, 多个监听者用数组进行存储
      this._events.set(type, [handler, wrapCallback(fn, once)]);
    } else {
      handler.push(wrapCallback(fn, once));
    }
  }

  /**
   * @description 移除事件监听器
   * @author xieww
   * @date 2020-10-20
   * @param {*} type
   * @param {*} listener
   * @returns
   * @memberof EventEmitter
   */
  removeListener(type, listener) {
    const handler = this._events.get(type);
    if (!handler) {
      return;
    }
    if (!Array.isArray(handler)) {
      if (handler.callback === listener.callback) {
        this._events.delete(type);
      } else {
        return;
      }
    } else {
      for (let i = 0; i < handler.length; i++) {
        const item = handler[i];
        if (item.callback === listener.callback) {
          // 删除该回调，注意数组塌陷的问题，即后面的元素会往前挪一位。i 要 --
          handler.splice(i, 1);
          i--;
          if (handler.length === 1) {
            // 长度为 1 就不用数组存了
            this._events.set(type, handler[0]);
          }
        }
      }
    }
  }

  /**
   * @description 触发事件
   * @author xieww
   * @date 2020-10-20
   * @param {*} type
   * @param {*} args
   * @returns 
   * @memberof EventEmitter
   */
  emit(type, ...args) {
    const handler = this._events.get(type);
    if (!handler) {
      return;
    }
    // 判断指定type的事件是否为多个
    if (Array.isArray(handler)) {
      handler.map((item) => {
        item.callback.apply(this, args);
        // 标记的 once: true 的项直接移除
        if (item.once) {
          this.removeListener(type, item);
        }
      });
    } else {
      // 只有一个事件直接执行
      handler.callback.apply(this, args);
    }
    return true;
  }

  /**
   * @description 移除指定type的所有事件
   * @author xieww
   * @date 2020-10-20
   * @param {*} type
   * @returns 
   * @memberof EventEmitter
   */
  removeAllListener(type) {
    const handler = this._events.get(type);
    if (!handler) {
      return;
    } else {
      this._events.delete(type);
    }
  }
}
