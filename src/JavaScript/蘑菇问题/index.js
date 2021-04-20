function jump(nums, m) {
  nums.push(0);
  nums.unshift(m);
  let currFurthest = 0;
  let len = nums.length;
  let result = -1;

  for (let i = 0; i < len - 1; i++) {
    currFurthest = Math.max(currFurthest, i + nums[i]);
    if (currFurthest <= i) {
      break;
    }

    if (currFurthest >= len - 1) {
      result = Math.max(result, currFurthest - (len - 1));
    }
  }

  return result;
}

const arr = [1, 2, 3, -2, 5];

console.log(jump(arr));
