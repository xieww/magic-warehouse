class Storage {
  constructor(type) {
    this.storageType = type;
  }

  /**
   * @description 添加键和值，如果对应的值存在，则更新该键对应的值
   * @author xieww
   * @date 2021-05-26
   * @param {*} key
   * @param {*} value
   * @param {*} maxAge 单位毫秒
   * @memberof Storage
   */
  setItem(key, value, maxAge = 0) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 0 present"
      );
    }

    if ((key && !value) || (!key && value)) {
      throw new TypeError(
        "Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present"
      );
    }

    const data = {
      value,
      expiresTime: maxAge === 0 ? 0 : Date.now() + maxAge,
    };
    window[this.storageType][key.toString()] = JSON.stringify(data);
  }

  /**
   * @description 返回指定键的值
   * @author xieww
   * @date 2021-05-26
   * @param {*} key
   * @returns
   * @memberof Storage
   */
  getItem(key) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'getItem' on 'Storage': 1 arguments required, but only 0 present"
      );
    }

    const data =
      window[this.storageType][key.toString()] &&
      JSON.parse(window[this.storageType][key.toString()]);
    if (data) {
      if (data.expiresTime === 0 || Date.now() < data.expiresTime) {
        return data.value;
      }
      this.removeItem(key);
      return null;
    }
    return null;
  }

  /**
   * @description 清除存储对象中所有的键
   * @author xieww
   * @date 2021-05-26
   * @memberof Storage
   */
  clear() {
    Reflect.ownKeys(window[this.storageType]).forEach((item) => {
      this.removeItem(item);
    });
  }

  /**
   * @description 移除键
   * @author xieww
   * @date 2021-05-26
   * @param {*} key
   * @memberof Storage
   */
  removeItem(key) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'removeItem' on 'Storage': 1 arguments required, but only 0 present"
      );
    }

    delete window[this.storageType][key.toString()];
  }
}

export default Storage;
