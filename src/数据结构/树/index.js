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
  preOrderTraversalByRecursion(node = this.root, callback) {
    if (node !== null) {
      callback(node.val);
      this.preOrderTraversalByRecursion(node.left, callback);
      this.preOrderTraversalByRecursion(node.right, callback);
    }
  }

  /**
   * @description 前序遍历无递归实现
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  preOrderTraversal(node = this.root, callback) {
    let stack = []; // 算法需要借助一个栈
    while (node || stack.length) {
      // 当节点存在或者栈不空时
      if (node) {
        callback(node.val);
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
  inOrderTraversalByRecursion(node = this.root, callback) {
    if (node !== null) {
      this.inOrderTraversalByRecursion(node.left, callback);
      callback(node.val);
      this.inOrderTraversalByRecursion(node.right, callback);
    }
  }

  /**
   * @description 中序遍历无递归实现
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  inOrderTraversal(node = this.root, callback) {
    // 算法需要借助一个栈
    let stack = [];
    while (node || stack.length) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        callback(node.val);
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
  postOrderTraversalByRecursion(node = this.root, callback) {
    if (node !== null) {
      this.postOrderTraversalByRecursion(node.left, callback);
      this.postOrderTraversalByRecursion(node.right, callback);
      callback(node.val);
    }
  }

  /**
   * @description 后序遍历，无递归
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  postOrderTraversal(node = this.root, callback) {
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
          callback(node.val);
          ret = node;
          node = null;
        }
      }
    }
  }

  /**
   * @description 层次遍历（广度优先），借助队列
   * @author xieww
   * @date 2020-10-12
   * @param {*} [node=this.root]
   * @memberof BinaryTree
   */
  levelOrderTraversal(node = this.root, callback) {
    let queue = [node];
    while (queue.length) {
      node = queue.shift();
      callback(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  /**
   * @description 统计二叉树节点总数，借助队列
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  size(root = this.root) {
    let count = 0;
    if (root) {
      // 根节点入队
      let queue = [root];
      while (queue.length) {
        const node = queue.shift();
        count++;
        // 若存在左子树则进行入队
        if (node.left) {
          queue.push(node.left);
        }
        // 存在右子树则进行入队
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
    return count;
  }

  /**
   * @description 统计二叉树节点总数，递归实现
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  sizeByRecursion(root = this.root) {
    if (root === null) {
      return 0;
    }
    return 1 + this.size(root.left) + this.size(root.right);
  }

  /**
   * @description 二叉树最大高度
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  maxHeight(root = this.root) {
    if (root === null) {
      return 0;
    }
    return Math.max(this.maxHeight(root.left), this.maxHeight(root.right)) + 1;
  }

  /**
   * @description 递归的方法
   * 思路：
   *     1、一颗树只有一个节点，它的深度是1；
   *     2、二叉树的根节点只有左子树而没有右子树，二叉树的深度应该是其左子树的深度加1；
   *     3、二叉树的根节点只有右子树而没有左子树，二叉树的深度应该是其右子树的深度加1；
   *     4、二叉树的根节点既有右子树又有左子树，那么二叉树的深度应该是其左右子树的深度较大值加1。
   * @author xieww
   * @date 2020-10-13
   * @param {*} [node=this.root]
   * @returns
   * @memberof BinaryTree
   */
  getTreeDepth(node = this.root) {
    let depth = 0;
    if (node) {
      depth++;
      if (node.left && !node.right) {
        depth = this.getTreeDepth(node.left) + 1;
      }
      if (node.right && !node.left) {
        depth = this.getTreeDepth(node.right) + 1;
      }
      if (node.left && node.right) {
        depth =
          Math.max(
            this.getTreeDepth(node.left),
            this.getTreeDepth(node.right)
          ) + 1;
      }
    }
    return depth;
  }

  /**
   * @description 二叉树最小高度
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof BinaryTree
   */
  minHeight(root = this.root) {
    if (root === null) {
      return 0;
    }
    return Math.min(this.minHeight(root.left), this.minHeight(root.right)) + 1;
  }

  /**
   * @description 二叉树高度
   * @author xieww
   * @date 2020-10-13
   * @returns
   * @memberof BinaryTree
   */
  height() {
    return this.maxHeight();
  }

  /**
   * @description 获取叶子节点个数，队列版
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  numOfLeaf(root = this.root) {
    let count = 0;
    if (root) {
      let queue = [root];
      while (queue.length) {
        const node = queue.shift();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        if (!node.right && !node.left) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * @description 获取叶子节点个数，递归版
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  numOfLeafByRecursion(root = this.root) {
    if (root === null) {
      return 0;
    }
    if (!root.left && !root.right) {
      return 1;
    }
    return (
      this.numOfLeafByRecursion(root.left) +
      this.numOfLeafByRecursion(root.right)
    );
  }

  /**
   * @description 获取二叉树中边的个数
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns
   * @memberof BinaryTree
   */
  numOfEdge(root = this.root) {
    let edge = 0;
    if (root) {
      let queue = [root];
      while (queue.length) {
        const node = queue.shift();
        if (node.left) {
          edge++;
          queue.push(node.left);
        }
        if (node.right) {
          edge++;
          queue.push(node.right);
        }
      }
    }
    return edge;
  }

  /**
   * @description 二叉树第K层节点个数, 广度优先搜索
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @param {*} k
   * @returns
   * @memberof BinaryTree
   */
  numOfKthLevel(root = this.root, k) {
    if (root === null) {
      return 0;
    }
    const queue = []; //用于BFS
    const arr = []; //用于存储各层节点数
    let level = 1; //层数
    arr[level - 1] = [];
    let currentLevelCount = 1; //当前层未打印个数
    let nextLevelCount = 0; //下一层结点个数
    queue.push(root);
    while (queue.length > 0) {
      let current = queue.shift();
      arr[level - 1].push(current.val);
      currentLevelCount--;
      if (current.left) {
        queue.push(current.left);
        nextLevelCount++;
      }
      if (current.right) {
        queue.push(current.right);
        nextLevelCount++;
      }
      if (currentLevelCount === 0) {
        if (nextLevelCount === 0) {
          break;
        }
        currentLevelCount = nextLevelCount;
        nextLevelCount = 0;
        level++;
        arr[level - 1] = [];
      }
    }
    if (k > arr.length) {
      return 0;
    }
    return arr[k - 1].length;
  }

  /**
   * @description 二叉树第K层节点个数, 递归实现
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @param {*} k
   * @returns
   * @memberof BinaryTree
   */
  numOfKthLevelByRecursion(root = this.root, k) {
    if (k < 0) {
      return 0;
    }
    if (root === null) {
      return 0;
    }
    if (root !== null && k === 1) {
      return 1;
    }
    return (
      this.numOfKthLevel(root.left, k - 1) +
      this.numOfKthLevel(root.right, k - 1)
    );
  }

  /**
   * @description 获取指定节点的所在层级，借助队列进行广度优先搜索
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @param {*} node
   * @returns
   * @memberof BinaryTree
   */
  getLevelByNode(root = this.root, node) {
    const queue = [];
    let level = 1; //存储当前层数
    queue.push(root); //根直接入队列
    let currentLevelCount = 1; //存储当前层数中剩余项
    let nextLevelCount = 0; //存储下一层数中剩余项
    while (queue.length > 0) {
      const current = queue.shift(); //出栈一个
      if (current.val === node) {
        return level;
      } //检查是不是val值
      currentLevelCount--;
      if (current.left) {
        queue.push(current.left);
        nextLevelCount++;
      }
      if (current.right) {
        queue.push(current.right);
        nextLevelCount++;
      }
      if (currentLevelCount === 0) {
        //当前层的没了，就得换层了
        currentLevelCount = nextLevelCount;
        nextLevelCount = 0;
        level++;
      }
    }
    return -1; //要是没找到，就返回-1，当然别的值也行
  }

  /**
   * @description 获取指定节点的所在层级，递归实现
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @param {*} node
   * @returns
   * @memberof BinaryTree
   */
  getLevelByNodeByRecursion(root = this.root, node) {
    if (root === null || !this.search(node)) {
      return -1;
    }
    if (node === root.val) {
      return 1;
    } else if (node < root.val) {
      return this.getLevelByNodeByRecursion(root.left, node) + 1;
    } else if (node > root.val) {
      return this.getLevelByNodeByRecursion(root.right, node) + 1;
    }
  }

  /**
   * @description 判断二叉树是不是满二叉树
   * 一颗高度为h，节点数为2^h-1个的二叉树为满二叉树
   * @author xieww
   * @date 2020-10-13
   * @param {*} [node=this.root]
   * @returns {boolean}
   * @memberof BinaryTree
   */
  isFullTree(node = this.root) {
    let height = this.height(node);
    let nodeNumber = this.size(node);
    return nodeNumber === Math.pow(2, height) - 1;
  }

  /**
   * @description 判断二叉树是不是平衡二叉树
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns {boolean}
   * @memberof BinaryTree
   */
  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }
    if (Math.abs(this.height(root.left) - this.height(root.right)) > 1) {
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  /**
   * @description 判断二叉树是不是完全二叉树
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns {boolean}
   * @memberof BinaryTree
   */
  isCompleteTree(root = this.root) {
    const queue = [];
    queue.push(root);
    while (queue.length) {
      const current = queue.shift();
      if (current) {
        queue.push(current.left);
        queue.push(current.right);
      } else {
        while (queue.length > 0) {
          if (queue.shift()) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * @description 判断二叉树是不是完全二叉树
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @returns {boolean}
   * @memberof BinaryTree
   */
  isCompleteTreeTwo(root = this.root) {
    const queue = [];
    let flag = false;
    queue.push(root);
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        if (flag) {
          return false;
        }
        // 关键就在于不管node的left和right是否存在依然加入队列
        queue.push(node.left);
        queue.push(node.right);
      } else {
        flag = true;
      }
    }
    return true;
  }

  /**
   * @description 翻转二叉树,递归实现
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @memberof BinaryTree
   */
  invertTreeByRecursion(root = this.root) {
    if (!root) {
      return null;
    }
    [root.left, root.right] = [
      this.invertTreeByRecursion(root.right),
      this.invertTreeByRecursion(root.left),
    ];
    return root;
  }

  /**
   * @description 翻转二叉树,深度优先
   * @author xieww
   * @date 2020-10-13
   * @param {*} [root=this.root]
   * @memberof BinaryTree
   */
  invertTree(root = this.root) {
    let dfs = (node) => {
      if (!node) {
        return null;
      }
      dfs(node.left);
      dfs(node.right);
      [node.left, node.right] = [node.right, node.left];
    };
    dfs(root);
    return root;
  }
}

module.exports = BinaryTree;
