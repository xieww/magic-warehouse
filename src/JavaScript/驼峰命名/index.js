function transfer(str) {
  return str.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}

var s1 = "get-element-by-id";
console.log(transfer(s1));
