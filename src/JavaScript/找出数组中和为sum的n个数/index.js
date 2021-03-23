{
  function getAllCombin(array, n, sum, temp) {
    if (temp.length === n) {
      if (temp.reduce((t, c) => t + c) === sum) {
        return temp;
      }
      return;
    }
    for (let i = 0; i < array.length; i++) {
      const current = array.shift();
      temp.push(current);
      const result = getAllCombin(array, n, sum, temp);
      if (result) {
        return result;
      }
      temp.pop();
      array.push(current);
    }
  }
  const arr = [1, 2, 3, 4, 5, 6];

  console.log(getAllCombin(arr, 3, 10, []));
}
{
  /**
   * @param arr 目标数组
   * @param count 要选取的元素数目
   * @param sum 目标和
   * @returns [] 计算结果的数组
   */
  const search = (arr, count, sum) => {
    // 利用二进制，选择元素的个数
    const n = (num) => {
      let count = 0;
      while (num) {
        num &= num - 1;
        count++;
      }
      return count;
    };

    let len = arr.length;
    let bit = 1 << len; // 换算成二进制，所有情况的总和
    let res = [];

    // 遍历所有的选择情况, 这里忽略了 0 的情况(n = 0)
    for (let i = 1; i < bit; i++) {
      // 满足选择的元素个数 === count
      if (n(i) === count) {
        let s = 0;
        let temp = [];

        // 每一种满足个数为 n 的选择情况下，继续判断是否满足 和为 m
        for (let j = 0; j < len; j++) {
          // 建立映射，找出选择位上的元素
          if ((i & (1 << j)) !== 0) {
            s += arr[j];
            temp.push(arr[j]);
          }
        }

        // 如果这种选择情况满足和为 M , 添加到结果数组中
        if (s === sum) {
          res.push(temp);
        }
      }
    }

    return res;
  };

  const arr = [1, 2, 3, 4, 5, 6];

  console.log(search(arr, 3, 10));
}
