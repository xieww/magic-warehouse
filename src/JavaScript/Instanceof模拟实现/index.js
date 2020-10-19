function _instanceof(left, right) {
  // 基本类型直接返回false
  if (typeof left !== "object" || !left) {
    return false;
  }
  // 取left的隐式原型，
  let prototype = Object.getPrototypeOf(left); // 等同于 let prototype = left.__proto__;
  while (true) {
    if (left === undefined || left === null) {
      return false;
    }
    if (prototype === right.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
}

let obj = {};

class Person { };

class Student extends Person { }

const student = new Student();

console.log("should be true", _instanceof(obj, Object));
console.log("should be false", _instanceof("123", String));
console.log("should be true", _instanceof(new String("111"), String));
console.log("should be true", _instanceof(student, Student));
console.log("should be true", _instanceof(student, Person));
console.log("should be true", _instanceof(new Number(123), Number));
