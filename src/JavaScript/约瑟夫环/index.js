//链表节点
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

//定义链表类
class LinkList {
  constructor() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.currentNode = this.head;
  }
  //查找节点
  find(item) {
    var currNode = this.head;
    while (currNode.val != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
  //插入新节点
  insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }
  //查找当前节点的上一个节点
  findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) && currNode.next.val != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
  //移除当前节点
  remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
    }
  }
  //向前移动n个节点
  advance(n) {
    while (n > 0) {
      if (this.currentNode.next.val == "head") {
        this.currentNode = this.currentNode.next.next;
      } else {
        this.currentNode = this.currentNode.next;
      }
      n--;
    }
  }
  //当前链表中有多少个元素
  count() {
    var node = this.head;
    var i = 0;
    while (!(node.next.val == "head")) {
      node = node.next;
      i++;
    }
    return i;
  }
  //输出所有节点
  display() {
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.val == "head")) {
      console.log(currNode.next.val + " ");
      currNode = currNode.next;
    }
  }
}

function run(m, n) {
  var people = new LinkList();
  for (let i = 1; i <= m; i++) {
    var person = "位置" + i;
    var prePerson;
    if (i == 1) {
      prePerson = "head";
    } else {
      prePerson = "位置" + (i - 1);
    }
    people.insert(person, prePerson);
  }
  people.display();
  console.log("游戏总人数:" + people.count());
  console.log("开始游戏");

  while (people.count() >= n) {
    people.advance(n);
    const killPerson = people.currentNode.val;
    people.remove(killPerson);
    console.log("干掉:" + killPerson);
    console.log("还剩:" + people.count() + "人");
  }
  console.log("最终幸存" + people.count() + "人");
  people.display();
}

run(40, 3);

