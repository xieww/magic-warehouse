function newFactory() {
  var obj = new Object();
  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var result = Constructor.apply(obj, arguments);
  return typeof result === "object" ? result || obj : obj;
}

// 测试案例
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.habit = "Games";
}

Person.prototype.strength = 60;

Person.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

var person = newFactory(Person, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60

person.sayYourName(); // I am Kevin