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
   * @description 插入节点
   * @author xieww
   * @date 2020-10-12
   * @param {*} val
   * @memberof BinaryTree
   */
  insert(val) {
    const tree = new Tree();
    tree.insert(val);
    this.root = tree.root;
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
      return this.searchNode(node.left, val);
    } else if (val > node.val) {
      return this.searchNode(node.right, val);
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
    return this.searchNode(this.root, val);
  }

  /**
   * @description 前序遍历，递归
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  preOrderTraversalByRecursion(root, callback) {
    if (root !== null) {
      callback(root.val);
      this.preOrderTraversalByRecursion(root.left, callback);
      this.preOrderTraversalByRecursion(root.right, callback);
    }
  }

  /**
   * @description 前序遍历无递归实现
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  preOrderTraversal(node = this.root) {
    let stack = []; // 算法需要借助一个栈
    while (node || stack.length) {
      // 当节点存在或者栈不空时
      if (node) {
        stack.push(node); // 根节点入栈，这是为了到时候能找该节点的右节点
        node = node.left; // 先遍历左子树
      } else {
        node = stack.pop(); // 弹出根节点
        node = node.right; // 遍历根节点的右子树
      }
    }
  }

  /**
   * @description 中序遍历，递归
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  inOrderTraverseByRecursion(root, callback) {
    if (root !== null) {
      this.inOrderTraverseByRecursion(root.left, callback);
      callback(root.val);
      this.inOrderTraverseByRecursion(root.right, callback);
    }
  }

  /**
   * @description 中序遍历无递归实现
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  inOrderTraverse(node = this.root) {
    // 算法需要借助一个栈
    let stack = [];
    while (node || stack.length) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        node = node.right;
      }
    }
  }

  /**
   * @description 后序遍历，递归
   * @author xieww
   * @date 2020-10-12
   * @param {*} root
   * @param {function} callback
   * @memberof BinaryTree
   */
  postOrderTraverseByRecursion(root, callback) {
    if (root !== null) {
      this.postOrderTraverseByRecursion(root.left, callback);
      this.postOrderTraverseByRecursion(root.right, callback);
      callback(root.val);
    }
  }

  /**
   * @description 后序遍历，无递归
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  postOrderTraverse(node = this.root) {
    let stack = [];
    let ret = node;
    while (node || stack.length) {
      // 栈不空或者node不空时循环
      if (node) {
        // 根节点进栈，遍历左子树
        stack.push(node);
        node = node.left; // 找到最左端的节点，路径上的节点全部入栈,包括叶子节点
      } else {
        node = stack[stack.length - 1]; // 获取栈顶节点
        if (node.right && node.right != ret) {
          // 如果node有右节点且未访问过
          node = node.right;
          stack.push(node);
          node = node.left; // 再走到最左
        } else {
          node = stack.pop();
          ret = node;
          node = null;
        }
      }
    }
  }

  /**
   * @description 层次遍历
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  levelOrderTraverse(node = this.root) {
    let queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}

module.exports = BinaryTree;
