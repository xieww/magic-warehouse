const BinaryTree = require("./index");

const data = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const binaryTree = new BinaryTree();
binaryTree.init(data);
// console.log("二叉树", binaryTree.root);

function Log(val) {
  console.log(val);
}

console.log("前序遍历");
binaryTree.preorderTraversal(binaryTree.root, Log);

console.log("中序遍历");
binaryTree.inOrderTraverse(binaryTree.root, Log);

console.log("后序遍历");
binaryTree.postOrderTraverse(binaryTree.root, Log);

console.log("最大值", binaryTree.max());
console.log("最小值", binaryTree.min());
console.log("查找6", binaryTree.search(6));
console.log("查找20", binaryTree.search(20));
