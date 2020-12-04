// 可遍历数据
const TYPE_ARRAY = "[object Array]";
const TYPE_OBJECT = "[object Object]";
const TYPE_MAP = "[object Map]";
const TYPE_SET = "[object Set]";
const TYPE_ARGUMENTS = "[object Arguments]";

// 不可遍历
const TYPE_BOOLEAN = "[object Boolean]";
const TYPE_DATE = "[object Date]";
const TYPE_NUMBER = "[object Number]";
const TYPE_STRING = "[object String]";
const TYPE_SYMBOL = "[object Symbol]";
const TYPE_ERROR = "[object Error]";
const TYPE_REGEXP = "[object RegExp]";
const TYPE_FUNCTION = "[object Function]";

const CAN_TRAVERSE = [
  TYPE_ARRAY,
  TYPE_OBJECT,
  TYPE_MAP,
  TYPE_SET,
  TYPE_ARGUMENTS,
];

const getType = (target) => {
  return Object.prototype.toString.call(target);
};

const isObject = (target) => {
  return (
    target !== null &&
    (typeof target === "object" || typeof target === "function")
  );
};

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch (tag) {
    case TYPE_BOOLEAN:
      return new Object(Boolean.prototype.valueOf.call(target));
    case TYPE_NUMBER:
      return new Object(Number.prototype.valueOf.call(target));
    case TYPE_STRING:
      return new Object(String.prototype.valueOf.call(target));
    case TYPE_SYMBOL:
      return new Object(Symbol.prototype.valueOf.call(target));
    case TYPE_ERROR:
    case TYPE_DATE:
      return new Ctor(target);
    case TYPE_REGEXP:
      return handleRegExp(target);
    case TYPE_FUNCTION:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

function baseClone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  let cloneTarget;
  if (CAN_TRAVERSE[type]) {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    cloneTarget = new ctor();
  } else {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type);
  }

  if (map.get(target)) return target;
  map.set(target, true);

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(key, baseClone(item, map));
    });
  }

  if (type === setTag) {
    //处理Set
    target.forEach((item) => {
      cloneTarget.add(baseClone(item, map));
    });
  }

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = baseClone(target[key], map);
    }
  }
  return cloneTarget;
}

module.exports = baseClone;
