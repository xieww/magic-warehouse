const BinaryTree = require("./index");
const TreeNode = require("./treeNode");

const data = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const binaryTree = new BinaryTree();
binaryTree.init(data);
// console.log("二叉树", binaryTree.root);

// function Log(val) {
//   console.log(val);
// }

// console.log("前序遍历");
// binaryTree.postOrderTraversalByRecursion(binaryTree.root, Log);
// console.log("=======");
// binaryTree.postOrderTraversal(binaryTree.root, Log);

// console.log("中序遍历");
// binaryTree.inOrderTraversalByRecursion(binaryTree.root, Log);

// console.log("后序遍历");
// binaryTree.postOrderTraversalByRecursion(binaryTree.root, Log);

// console.log("层次遍历");
// binaryTree.levelOrderTraversal(binaryTree.root, Log);

// console.log("最大值", binaryTree.max());
// console.log("最小值", binaryTree.min());
// console.log("查找6", binaryTree.search(6));
// console.log("查找20，结果为false", binaryTree.search(20));

// binaryTree.insert(20);

// console.log("查找20，结果为true", binaryTree.search(20));
// console.log("统计二叉树节点总数", binaryTree.size());
// console.log("统计二叉树最大高度", binaryTree.height());
// console.log("统计二叉树最小高度", binaryTree.minHeight());
// console.log("统计二叉树叶子节点个数", binaryTree.numOfLeaf());
// console.log("统计二叉树叶子节点个数", binaryTree.numOfLeafByRecursion());
// console.log("统计二叉树边个数", binaryTree.numOfEdge());
// console.log(
//   "二叉树第K层节点个数",
//   binaryTree.numOfKthLevel(binaryTree.root, 2)
// );

console.log(
  "查找指定节点所在的层级",
  binaryTree.getLevelByNode(binaryTree.root, 6)
);
console.log("判断二叉树是不是满二叉树", binaryTree.isFullTree());
console.log("判断二叉树是不是完全二叉树", binaryTree.isCompleteTree());

const data1 = [4, 2, 7, 1, 3, 6, 9];
const binaryTree1 = new BinaryTree();
binaryTree1.init(data1);

console.log("翻转二叉树", binaryTree1.invertTree());
console.log("平衡二叉树", binaryTree1.isBalanced());
