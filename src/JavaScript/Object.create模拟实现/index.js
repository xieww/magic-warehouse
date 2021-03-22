Object._create = function (proto, propertiesObject) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object: " + proto);
  }
  // else if (proto === null) {
  //   throw new Error(
  //     "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
  //   );
  // }

  if (typeof propertiesObject !== "undefined")
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support a second argument."
    );

  function F() {}
  F.prototype = proto;

  return new F();
};

const obj = Object._create(null);
const obj1 = Object.create(null);
console.log("obj", obj, obj1);

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object._create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
