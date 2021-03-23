class LinkNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class DoubleLink {
  constructor() {
    // 初始化双向链表的数据
    this.head = new LinkNode(0, 0);
    this.tail = new LinkNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    // 链表元素数
    this.size = 0;
  }

  /**
   * @description 在链表尾部添加节点 x，时间 O(1)
   * @author xieww
   * @date 2021-03-23
   * @param {*} node
   * @memberof DoubleLink
   */
  addNode(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    ++this.size;
  }

  /**
   * @description 删除链表中的 x 节点（x 一定存在），由于是双链表且给的是目标 Node 节点，时间 O(1)
   * @author xieww
   * @date 2021-03-23
   * @param {*} node
   * @memberof DoubleLink
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    --this.size;
  }

  /**
   * @description 删除链表中第一个节点，并返回该节点，时间 O(1)
   * @author xieww
   * @date 2021-03-23
   * @returns
   * @memberof DoubleLink
   */
  removeFirstNode() {
    if (this.head.next === this.tail) {
      return null;
    }

    let first = this.head.next;
    this.removeNode(first);
    return first;
  }

  /**
   * @description 返回链表长度，时间 O(1)
   * @author xieww
   * @date 2021-03-23
   * @returns
   * @memberof DoubleLink
   */
  getSize() {
    return this.size;
  }
}

class LRUCache {
  constructor(capacity) {
    this.map = new Map();
    this.cache = new DoubleLink();
    this.capacity = capacity;
  }

  /**
   * @description 获取
   * @author xieww
   * @date 2021-03-23
   * @param {*} key
   * @returns
   * @memberof LRUCache
   */
  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }
    // 将该数据提升为最近使用的
    this.makeRecently(key);
    return this.map.get(key).val;
  }

  /**
   * @description 添加
   * @author xieww
   * @date 2021-03-23
   * @param {*} key
   * @param {*} value
   * @returns
   * @memberof LRUCache
   */
  put(key, value) {
    if (this.map.has(key)) {
      // 删除旧的数据
      this.deleteKey(key);
      // 新插入的数据为最近使用的数据
      this.addRecently(key, value);
      return;
    }

    if (this.capacity === this.cache.getSize()) {
      // 删除最久未使用的元素
      this.removeLeastRecently();
    }
    // 添加为最近使用的元素
    this.addRecently(key, value);
  }

  /**
   * @description 将某个 key 提升为最近使用的
   * @author xieww
   * @date 2021-03-23
   * @param {*} key
   * @memberof LRUCache
   */
  makeRecently(key) {
    let x = this.map.get(key);

    // 先从链表中删除这个节点
    this.cache.removeNode(x);

    // 重新插入到队尾
    this.cache.addNode(x);
  }

  /**
   * @description 添加最近使用的元素
   * @author xieww
   * @date 2021-03-23
   * @param {*} key
   * @param {*} val
   * @memberof LRUCache
   */
  addRecently(key, val) {
    let x = new LinkNode(key, val);

    // 链表尾部就是最近使用的元素
    this.cache.addNode(x);
    // 别忘了在 map 中添加 key 的映射
    this.map.set(key, x);
  }

  /**
   * @description 删除某一个 key
   * @author xieww
   * @date 2021-03-23
   * @param {*} key
   * @memberof LRUCache
   */
  deleteKey(key) {
    let x = this.map.get(key);
    // 从链表中删除
    this.cache.removeNode(x);
    // 从 map 中删除
    this.map.delete(key);
  }

  /**
   * @description 删除最久未使用的元素
   * @author xieww
   * @date 2021-03-23
   * @memberof LRUCache
   */
  removeLeastRecently() {
    // 链表头部的第一个元素就是最久未使用的
    let deletedNode = this.cache.removeFirstNode();

    // 同时别忘了从 map 中删除它的 key
    let deletedKey = deletedNode.key;
    this.map.delete(deletedKey);
  }
}

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1)); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2)); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1)); // 返回 -1 (未找到)
console.log(lRUCache.get(3)); // 返回 3
console.log(lRUCache.get(4)); // 返回 4
