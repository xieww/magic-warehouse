const Tree = require("./tree");

class BinaryTree {
  constructor() {
    this.root = null;
  }

  /**
   * @description 初始化二叉树
   * @author xieww
   * @date 2020-10-12
   * @param {*} data
   * @memberof BinaryTree
   */
  init(data) {
    const tree = new Tree();
    data.forEach((item) => tree.insert(item));
    this.root = tree.root;
  }

  /**
   * @description 前序遍历
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  preorderTraversal(root, callback) {
    if (root !== null) {
      callback(root.val);
      this.preorderTraversal(root.left, callback);
      this.preorderTraversal(root.right, callback);
    }
  }

  /**
   * @description 中序遍历
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  inOrderTraverse(root, callback) {
    if (root !== null) {
      this.inOrderTraverse(root.left, callback);
      callback(root.val);
      this.inOrderTraverse(root.right, callback);
    }
  }

  /**
   * @description 后序遍历
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  postOrderTraverse(root, callback) {
    if (root !== null) {
      this.postOrderTraverse(root.left, callback);
      this.postOrderTraverse(root.right, callback);
      callback(root.val);
    }
  }

  /**
   * @description 查找最小节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} node
   * @returns
   * @memberof BinaryTree
   */
  findMinNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  /**
   * @description 删除节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} node
   * @param {*} val
   * @returns
   * @memberof BinaryTree
   */
  removeNode(node, val) {
    if (node === null) {
      return null;
    }
    if (node.val > val) {
      // 递归查找左叶子节点，直接等于返回的null值
      node.left = this.removeNode(node.left, val);
      return node;
    } else if (node.val < val) {
      // 递归查找右叶子节点，直接等于返回的null值
      node.right = this.removeNode(node.right, val);
      return node;
    } else {
      // 如果查找到相等的情况下
      if (node.left == null && node.right == null) {
        // 当只有一个节点，而且被选中
        node = null;
        return node;
      }
      if (node.left == null) {
        //左节点为空
        node = node.right;
        return node;
      } else if (node.right == null) {
        //右节点为空
        node = node.left;
        return node;
      }

      var aux = this.findMinNode(node.right); //查找到右节点最小节点赋值
      node.val = aux.val;
      node.right = this.removeNode(node.right, aux.val);
      return node;
    }
  }

  remove(val) {
    return this.removeNode(this.root, val);
  }

  /**
   * @description 查找最大节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} node
   * @returns
   * @memberof BinaryTree
   */
  findMaxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node;
    }
    return null;
  }

  /**
   * @description 查找最大值
   * @author xieww
   * @date 2020-10-12
   * @returns
   * @memberof BinaryTree
   */
  max() {
    const result = this.findMaxNode(this.root);
    return result === null ? null : result.val;
  }

  /**
   * @description 查找最小值
   * @author xieww
   * @date 2020-10-12
   * @returns
   * @memberof BinaryTree
   */
  min() {
    const result = this.findMinNode(this.root);
    return result === null ? null : result.val;
  }

  /**
   * @description 查找指定节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} node
   * @param {*} val
   * @returns
   * @memberof BinaryTree
   */
  searchNode(node, val) {
    if (node === null) {
      return false;
    }
    if (val < node.val) {
      return searchNode(node.left, val);
    } else if (val > node.val) {
      return searchNode(node.right, val);
    } else {
      return true;
    }
  }

  /**
   * @description 查找指定值
   * @author xieww
   * @date 2020-10-12
   * @param {*} val
   * @returns
   * @memberof BinaryTree
   */
  search(val) {
    return searchNode(root, val);
  }
}

module.exports = BinaryTree;
