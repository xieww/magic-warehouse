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
