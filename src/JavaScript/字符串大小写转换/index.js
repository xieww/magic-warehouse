var str = "AbC";
function transfer(str) {
  // let result = "";
  // for (const item of str) {
  //   const lower = item.toLocaleLowerCase();
  //   const upper = item.toLocaleUpperCase();
  //   if (upper === item) {
  //     result += lower;
  //   } else {
  //     result += upper;
  //   }
  // }
  // return result;

  // return str.replace(/[a-zA-Z]/g, (match) => {
  //   return /[a-z]/.test(match) ? match.toUpperCase() : match.toLowerCase();
  // });

  return str.replace(/(\w)/g, (m) =>
    m === m.toUpperCase() ? m.toLowerCase() : m.toUpperCase()
  );
}

console.log(transfer(str));
