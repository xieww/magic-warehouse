function _instanceof(left, right) {
  // 基本类型直接返回false
  if (typeof left !== "object" || !left) {
    return false;
  }
  // 取left的隐式原型，
  left = Object.getPrototypeOf(left); // 等同于 left = left.__proto__;
  while (true) {
    if (left === undefined || left === null) {
      return false;
    }
    if (left === right.prototype) {
      return true;
    }
    left = Object.getPrototypeOf(left);
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
