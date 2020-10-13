const Stack = require("./index");

const stack = new Stack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log("should be -3", stack.getMin(), stack.getMax());
stack.pop();
console.log("should be 0", stack.peek());
console.log("should be -2 0", stack.getMin(), stack.getMax());
