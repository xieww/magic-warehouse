{
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
}

{
  function mostCharacter(str) {
    const arr = str.split("");
    const obj = {}; //定义一个用于保存字符串对应出现次数的对象
    let max = 0; //定义一个保存最大出现次数的变量
    for (let i = 0; i < arr.length; i++) {
      let num = 0; //定义一个保存出现次数的临时变量
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          //统计出现次数
          num++;
        }
      }
      if (num > max) {
        max = num; //将最大出现次数保存下来
      }
      obj[arr[i]] = num; //将字符写入对象
    }
    //判断出现次数最多的字符，输出
    for (let i in obj) {
      if (obj[i] !== max) {
        delete obj[i];
      }
    }
    return obj;
  }

  console.log(mostCharacter("abcab22222cabcbb22ccc2cc"));
  console.log(mostCharacter("abcabcabcbbccccc"));
}
