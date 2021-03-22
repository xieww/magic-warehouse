function indexOf(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true;
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false;
        }
      }
      if (tmp) {
        return i;
      }
    }
  }
  return -1;
}

console.log("should be 2", indexOf("34", "1234567"));
console.log("should be -1", indexOf("35", "1234567"));
console.log("should be 5", indexOf("355", "12354355"));
