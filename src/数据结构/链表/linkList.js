class ListNode {
  constructor(node, next) {
    this.val = node;
    this.next = next || null;
  }
}

// // 解法1
// class MyLinkedList {
//   constructor() {
//     this.head = null; // 头节点
//     this.tail = null; // 尾节点
//     this.size = 0; // 链表长度
//   }
//   getNode(index) {
//     if (index < 0 || index >= this.size) {
//       return null;
//     }
//     // 创建虚拟头节点
//     let cur = new ListNode(0, this.head);
//     // 0 -> head
//     while (index-- >= 0) {
//       cur = cur.next;
//     }
//     return cur;
//   }
//   get(index) {
//     if (index < 0 || index >= this.size) {
//       return -1;
//     }
//     // 获取当前节点
//     return this.getNode(index).val;
//   }
//   addAtHead(val) {
//     const node = new ListNode(val, this.head);
//     this.head = node;
//     this.size++;
//     if (!this.tail) {
//       this.tail = node;
//     }
//   }
//   addAtTail(val) {
//     const node = new ListNode(val, null);
//     this.size++;
//     if (this.tail) {
//       this.tail.next = node;
//       this.tail = node;
//       return;
//     }
//     this.tail = node;
//     this.head = node;
//   }
//   addAtIndex(index, val) {
//     if (index > this.size) return;
//     if (index <= 0) {
//       this.addAtHead(val);
//       return;
//     }
//     if (index === this.size) {
//       this.addAtTail(val);
//       return;
//     }
//     // 获取目标节点的上一个的节点
//     const node = this.getNode(index - 1);
//     node.next = new ListNode(val, node.next);
//     this.size++;
//   }
//   deleteAtIndex(index) {
//     if (index < 0 || index >= this.size) {
//       return;
//     }
//     if (index === 0) {
//       this.head = this.head.next;
//       this.size--;
//       return;
//     }
//     // 获取目标节点的上一个的节点
//     const node = this.getNode(index - 1);
//     node.next = node.next.next;
//     // 处理尾节点
//     if (index === this.size - 1) {
//       this.tail = node;
//     }
//     this.size--;
//   }
//   print() {
//     let cur = this.head;
//     while (cur) {
//       console.log(cur.val);
//       cur = cur.next;
//     }
//   }
// }

// 解法2
class MyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  get(index) {
    if (index < 0 || index >= this.getLength()) {
      return -1;
    }
    let cur = this.head;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur.val;
  }
  addAtHead(val) {
    let node = new ListNode(val);
    node.next = this.head;
    this.head = node;
    this.size++;
  }
  addAtTail(val) {
    if (this.head == null) {
      this.addAtHead(val);
      return;
    }
    let node = new ListNode(val);
    let cur = this.head;
    while (cur.next !== null) {
      cur = cur.next;
    }
    cur.next = node;
    this.size++;
  }
  addAtIndex(index, val) {
    if (index === 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.getLength()) {
      this.addAtTail(val);
      return;
    }
    if (index > this.getLength()) {
      return;
    }

    let cur = this.head;
    let node = new ListNode(val);
    for (let i = 0; i < index - 1; i++) {
      cur = cur.next;
    }
    let next = cur.next;
    cur.next = node;
    node.next = next;
    this.size++;
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.getLength()) {
      return;
    }
    if (index == 0) {
      this.head = this.head.next;
      return;
    }

    let cur = this.head;
    for (let i = 0; i < index - 1; i++) {
      cur = cur.next;
    }
    cur.next = cur.next.next;
    this.size--;
  }
  getLength() {
    let len = 0;
    let cur = this.head;
    while (cur !== null) {
      cur = cur.next;
      len++;
    }
    return len;
  }
  print() {
    let cur = this.head;
    while (cur !== null) {
      console.log(cur.val);
      cur = cur.next;
    }
  }
}

const list = new MyLinkedList();
list.addAtHead(1);
list.addAtTail(3);
list.addAtIndex(1, 2); //链表变为1-> 2-> 3
// console.log(list.get(1)); //返回2
list.print(); //输出1-> 2-> 3
list.deleteAtIndex(1); //现在链表是1-> 3
// console.log(list.get(1)); // 返回3
list.print(); //输出1-> 3
