var baseClone = require("./baseClone");

const map = new Map();
map.set('key', 'value');
map.set('xieww', 'hello');

const set = new Set();
set.add('xieww');
set.add('hello');


var target = {
  name: "xieww",
  age: 18,
  hobby: [1, 2, 3],
  obj: {
    index: 1,
  },
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  fn: () => {
      console.log("函数");
  },
  add: function (a, b) {
      return a + b;
  }
};

console.log("深拷贝", baseClone(target));
