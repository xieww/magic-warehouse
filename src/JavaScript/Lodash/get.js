function get(object, ...args) {
  return args.map((item) => {
    let obj = object;
    item
      .replace(/\[/g, ".")
      .replace(/\]/g, "")
      .split(".")
      .map((attr) => (obj = obj && obj[attr]));
    return obj;
  });
}

function _get(object, ...args) {
  return args.map((item) =>
    new Function("data", `try {return data.${item} } catch(e) {}`)(object)
  );
}

const __get = (object, ...args) =>
  args.map((arg) =>
    arg.match(/[^\.\[\]]+/g).reduce((res, prop) => res && res[prop], object)
  );

function gets(source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b -> ['a', '3', 'b']
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

const obj = {
  selector: { to: { job: "FE Coder" } },
  target: [1, 2, { name: "byted" }],
  time: new Date(),
  fn: function () {},
  regex: /\w/gi,
};

console.log(
  get(
    obj,
    "selector.to.job",
    "target[0]",
    "target[2].name",
    "asd",
    "time",
    "fn",
    "regex"
  )
); // ['FE coder', 1, 'byted', undefined]
console.log(
  _get(
    obj,
    "selector.to.job",
    "target[0]",
    "target[2].name",
    "asd",
    "time",
    "fn",
    "regex"
  )
); // ['FE coder', 1, 'byted', undefined]
console.log(
  __get(
    obj,
    "selector.to.job",
    "target[0]",
    "target[2].name",
    "asd",
    "time",
    "fn",
    "regex"
  )
); // ['FE coder', 1, 'byted', undefined]
