function _Instanceof(left, right) {
  // 基本类型直接返回false
  if (typeof left !== "object" || !left) {
    return false;
  }
  let prototype = Object.getPrototypeOf(left);
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

console.log("should be true", _Instanceof(obj, Object));
console.log("should be false", _Instanceof("123", String));
console.log("should be true", _Instanceof(new String("111"), String));
console.log("should be true", _Instanceof(student, Student));
console.log("should be true", _Instanceof(student, Person));
console.log("should be true", _Instanceof(new Number(123), Number));
