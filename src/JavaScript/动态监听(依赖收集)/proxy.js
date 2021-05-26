var handler = {
  get: function (target, name) {
    return name in target ? target[name] : "no prop!";
  },
  set: function (target, prop, value, receiver) {
    target[prop] = value;
    console.log("property set: " + prop + " = " + value);
    return true;
  },
};

var user = new Proxy({}, handler);
user.name = "an"; // property set: name = an

console.log(user.name); // an
console.log(user.age); // no prop!
