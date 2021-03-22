const TreeNode = require("./treeNode");
class Tree {
  constructor() {
    this.root = null;
  }

  /**
   * @description 插入节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} node
   * @param {*} newNode
   * @memberof BinaryTree
   */
  insertNode(node, newNode) {
    // 约定左孩子节点小于右孩子节点
    if (newNode.val < node.val) {
      // 若左节点不存在，则进行新增，否则递归插入左子节点
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 若右孩子节点不存在，则进行新增，否则递归插入右子节点
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  /**
   * @description 插入节点，若根节点不存在，则创建根节点，否则插入新的节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} val
   * @memberof BinaryTree
   */
  insert(val) {
    const node = new TreeNode(val);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  }
}

module.exports = Tree;
