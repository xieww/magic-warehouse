function _indexOf(item, searchValue, start = 0) {
  const DATA_TYPE = typeof item;
  if (DATA_TYPE !== "string" && !Array.isArray(item)) {
    throw new TypeError(`${JSON.stringify(item)} should be array or string`);
    // throw new TypeError(`${JSON.stringify(item)}.indexOf is not a function`);
  }
  if (DATA_TYPE === "string") {
    var regex = new RegExp(`${searchValue}`, "ig");
    regex.lastIndex = start;
    const result = regex.exec(item);
    return result ? result.index : -1;
  } else {
    if (!searchValue) {
      return -1;
    }

    for (; start < item.length; start++) {
      if (item[start] === searchValue) {
        return start;
      }
    }
    return -1;
  }
}

console.log("should be 2 ,result is ", _indexOf("sting in", "in"));
console.log("should be -1 ,result is ", _indexOf("sting in", "in", 7));
console.log("should be -1 ,result is ", _indexOf("sting in", "ings"));
console.log("should be -1 ,result is ", _indexOf("sting in"));
console.log(
  "should be -1 ,result is ",
  _indexOf(["hello", "world", "orange", "apple"])
);
console.log(
  "should be 2 ,result is ",
  _indexOf(["hello", "world", "orange", "apple"], "orange")
);
console.log(
  "should be -1 ,result is ",
  _indexOf(["hello", "world", "orange", "apple"], "orange", 3)
);
console.log(
  "should be 4 ,result is ",
  _indexOf(["hello", "world", "orange", "apple", "orange"], "orange", 3)
);
console.log(
  "should be -1 ,result is ",
  _indexOf(["hello", "world", "orange", "apple"], "oranges")
);
console.log("should be -1 ,result is ", _indexOf({}, "oranges"));
