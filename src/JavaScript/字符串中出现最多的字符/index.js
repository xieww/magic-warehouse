function mostCharacter(str) {
  let num = 0;
  let char = "";

  // 使其按照一定的次序排列，如  "aaabbbbbcccccccc"
  str = str.split("").sort().join("");
  // 定义正则表达式
  let re = /(\w)\1+/g;
  str.replace(re, ($0, $1) => {
    if (num < $0.length) {
      num = $0.length;
      char = $1;
    }
  });
  return {
    char,
    num,
  };
}

console.log(mostCharacter("abcab22222cabcbb22ccc2cc"));
console.log(mostCharacter("abcabcabcbbccccc"));
