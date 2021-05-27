//创建链表节点
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

//链表类
class LinkList {
  constructor() {
    this.head = new Node("head");
    this.head.next = this.head;
  }
  //根据节点内容找到当前节点
  find(ele) {
    var currentNode = this.head;
    while (currentNode.val != ele && !(currentNode.next.val == "head")) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  //根据节点内容找到当前节点的前一个节点
  findPrevious(ele) {
    var currentNode = this.head;
    while (
      currentNode.next.val != ele &&
      !(currentNode.next == null) &&
      !(currentNode.next.val == "head")
    ) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  //在内容为ele的节点后插入内容为newEle的新节点
  insert(newEle, ele) {
    var node = new Node(newEle);
    var oldNode = this.find(ele);
    node.next = oldNode.next;
    oldNode.next = node;
  }
  //删除节点
  remove(ele) {
    var preNode = this.findPrevious(ele);
    if (!(preNode.next == null)) {
      preNode.next = preNode.next.next;
    }
  }
  //显示链表所有节点的内容
  display() {
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.val == "head")) {
      console.log(currNode.next.val);
      currNode = currNode.next;
    }
  }
  //计算链表节点个数
  count() {
    var qty = 0;
    var currNode = this.head;
    while (!(currNode.next == null) && !(currNode.next.val == "head")) {
      qty++;
      currNode = currNode.next;
    }
    return qty;
  }
  //内容为ele的节点向后移动step步
  back(ele, step) {
    var preNode = this.findPrevious(ele);
    var currNode = preNode.next;
    var prebackNode = currNode;
    for (let i = 1; i < step; i++) {
      prebackNode = prebackNode.next;
    }
    var backnode = prebackNode.next;
    preNode.next = currNode.next;
    currNode.next = prebackNode.next.next;
    backnode.next = currNode;
  }
}

//计算最终的幸存者,manQty为参加游戏的人数,killNo为被干掉者编号
function survive(manQty, killNo) {
  var people = new LinkList();
  for (let i = 1; i <= manQty; i++) {
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
  while (people.count() >= killNo) {
    var killedNode = people.head;
    for (let i = 1; i <= killNo; i++) {
      killedNode = killedNode.next;
    }
    var killedPerson = killedNode.val;
    var killedPreNode = people.findPrevious(killedPerson);
    people.back("head", killNo);
    people.remove(killedPerson);
    console.log("干掉:" + killedPerson);
    console.log("还剩:" + people.count() + "人");
  }
  console.log("最终幸存" + people.count() + "人");
  people.display();
}

survive(40, 3);
