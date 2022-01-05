// // 前序递归
// var preOrder = function (root) {
//   const result = [];
//   var helper = function (root) {
//     if (root === null) {
//       return;
//     }
//     result.push(root.val);
//     helper(root.left);
//     helper(root.right);
//   };
//   helper(root);
//   return result;
// };

// var preOrder = function (root) {
//     const result = [];
//     const stack = [];
//     let cur = root;
//     while (cur || stack.length) {
//         while (cur) {
//             result.push(cur.val);
//             stack.push(cur);
//             cur = cur.left;
//         }
//         cur = stack.pop();
//         cur = cur.right;
//     }
//     return result;
// };

// var preOrder = function (root) {
//     if (root === null) {
//         return [];
//     }
//     const result = [];
//     const stack = [];
//     stack.push(root);
//     while (stack.length) {
//         const node = stack.pop();   // 先取出栈顶元素
//         result.push(node.val);   // 再将其值放入结果数组
//         if (node.right) {
//             stack.push(node.right);  // 先将右子树入栈
//         }
//         if (node.left) {
//             stack.push(node.left);  // 再将左子树入栈
//         }
//     }
//     return result;
// };

// // 中序遍历迭代版
// var inOrder = function (root) {
//     const result = [];
//     const stack = [];
//     let cur = root;
//     while (cur || stack.length) {
//         while (cur) {
//             stack.push(cur);
//             cur = cur.left;
//         }
//         cur = stack.pop();
//         result.push(cur.val);
//         cur = cur.right;
//     }
//     return result;
// };

// 中序遍历迭代版
// var inOrder = function (root) {
//   const result = [];
//   const stack = [];
//   let node = root;
//   while (node || stack.length) {
//     if (node) {
//       stack.push(node);
//       node = node.left;
//     } else {
//       node = stack.pop();
//       result.push(node.val);
//       node = node.right;
//     }
//   }
//   return result;
// };

// // 中序递归
// var inOrder = function (root) {
//   const result = [];
//   var helper = function (root) {
//     if (root === null) {
//       return;
//     }
//     helper(root.left);
//     result.push(root.val);
//     helper(root.right);
//   };

//   helper(root);
//   return result;
// };

// 后序遍历递归版
var postOrder = function (root) {
  const result = [];
  var helper = function (root) {
    if (root === null) {
      return;
    }
    helper(root.left);
    helper(root.right);
    result.push(root.val);
  };

  helper(root);
  return result;
};

// // 后序遍历迭代版
// var postOrder = function (root) {
//     let res = [];
//     if (!root) return res;
//     let stack = [root];
//     while (stack.length) {
//         let node = stack.pop();
//         res.unshift(node.val);
//         if (node.left) stack.push(node.left);
//         if (node.right) stack.push(node.right);
//     }
//     return res;
// }

var root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

// console.log(preOrder(root));
console.log(inOrder(root));
// console.log(postOrder(root));
