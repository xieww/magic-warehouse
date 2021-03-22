function deepCopy(obj) {
  const parents = [];
  const children = [];
  var typeHelper = (value) => Object.prototype.toString.call(value);
  // 处理正则
  const getRegExp = (re) => {
    var flags = "";
    if (re.global) flags += "g";
    if (re.ignoreCase) flags += "i";
    if (re.multiline) flags += "m";
    return flags;
  };
  var helper = (parent) => {
    if (parent === null) {
      return null;
    }
    if (typeof parent !== "object") {
      return parent;
    }
    let child;
    let proto;
    if (typeHelper(parent) === "[object Array]") {
      child = [];
    } else if (typeHelper(parent) === "[object RegExp]") {
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (typeHelper(parent) === "[object Date]") {
      child = new Date(parent.getTime());
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }
    const index = parents.indexOf(parent);
    if (index !== -1) {
      return children[index];
    }
    parents.push(parent);
    children.push(child);
    for (const key in parent) {
      child[key] = helper(parent[key]);
    }
    return child;
  };
  return helper(obj);
}

let obj = { val: 100 };
obj.target = obj;

console.log("深拷贝", deepCopy(obj));
