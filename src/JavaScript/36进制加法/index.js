const alphabet = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
function addFor36(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  let i = len1 - 1;
  let j = len2 - 1;
  let result = "";
  let carry = 0;
  while (i >= 0 && j >= 0) {
    let s = alphabet.indexOf(str1[i]) + alphabet.indexOf(str2[j]) + carry;
    if (s >= 36) {
      carry = 1;
      result = alphabet[s % 36] + result;//有进位将余数和上一次结果相加
    } else {
      carry = 0;
      result = alphabet[s] + result;//无进位直接和上一次结果相加
    }
    i--;
    j--;
  }
  while (i >= 0) {
    let s = alphabet.indexOf(str1[i]) + carry;
    if (s >= 36) {
      carry = 1;
      result = alphabet[s % 36] + result;
    } else {
      carry = 0;
      result = alphabet[s] + result;
    }
    i--;
  }
  while (j >= 0) {
    let s = alphabet.indexOf(str2[j]) + carry;
    if (s >= 36) {
      carry = 1;
      result = alphabet[s % 36] + result;
    } else {
      carry = 0;
      result = alphabet[s] + result;
    }
    j--;
  }
  if (carry === 1) {
    result = "1" + result;
  }
  return result;
}

console.log(addFor36("AB", "Z"));
console.log(addFor36("H", "WG"));
