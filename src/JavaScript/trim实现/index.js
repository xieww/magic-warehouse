{
  String.prototype._trim = function () {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  };

  String.prototype.__trim = function () {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
  };

  String.prototype.trimAll = function () {
    return this.replace(/\s/g, "");
  };

  var str = " My name is wang zai,  I like apple. ";

  console.log(str._trim());
  console.log(str.__trim());
  console.log(str.trimAll());
}