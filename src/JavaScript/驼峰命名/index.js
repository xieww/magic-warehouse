function transfer(str) {
  return str.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}

function transfer2(str) {
  const arr = str.split("-");
  return arr
    .map((item, index) =>
      index === 0 ? item : item[0].toUpperCase() + item.slice(1)
    )
    .join("");
}

var s1 = "get-element-by-id";
console.log(transfer(s1));
console.log(transfer2(s1));
