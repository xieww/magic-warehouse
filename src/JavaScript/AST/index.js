const helper = (type, value) => ({ type, value });
const isString = value => /^[a-zA-Z]+$/.test(value);
const isNumber = value => /^[\d]+$/.test(value);

function transfer(input) {
  const result = [];
  let temp = [];

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (item === " ") {
      continue;
    }
    if (item === "(" || item === ")") {
      result.push(helper("paren", item));
    } else if (/\w/.test(item)) {
      // 如果是数字
      if (isNumber(item) && !isNumber(input[i + 1])) {
        const value = temp.join("") + item;
        result.push(helper("number", value));
        temp = [];
        continue;
      }
      // 如果是字母
      if (isString(item) && !isString(input[i + 1])) {
        const value = temp.join("") + item;
        result.push(helper("name", value));
        temp = [];
        continue;
      }
      temp.push(item);
    } else if (item === "{" || item === "}") {
      result.push(helper("brace", item));
    } else if (item === ",") {
      result.push(helper("comma", item));
    } else if (item === ";") {
      result.push(helper("semicolon", item));
    } else if (item === "+" || item === "-" || item === "*" || item === "/") {
      result.push(helper("operator", item));
    } else if (item === "=") {
      result.push(helper("assign", item));
    } else if (item === "!") {
      result.push(helper("bang", item));
    } else if (item === "<") {
      result.push(helper("lt", item));
    } else if (item === ">") {
      result.push(helper("gt", item));
    } else if (item === "&") {
      result.push(helper("amp", item));
    } else if (item === "|") {
      result.push(helper("pipe", item));
    } else if (item === "?") {
      result.push(helper("question", item));
    } else if (item === ":") {
      result.push(helper("colon", item));
    } else if (item === "\"") {
      result.push(helper("slash", item));
    } else if (item === "'") {
      result.push(helper("singleQuote", item));
    } else if (item === "\\") {
      result.push(helper("backslash", item));
    } else if (item === "`") {
      result.push(helper("tick", item));
    } else if (item === "~") {
      result.push(helper("tilde", item));
    } else if (item === "^") {
      result.push(helper("caret", item));
    }
  }
  return result;
}

const str = "(add 4 (name 6 (0 + 8 * 15 - 88 / 6)))";

console.log(transfer(str));
