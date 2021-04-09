function render(template, data) {
  let str = template;
  for (const key in data) {
    const regex = new RegExp("{{" + key + "}}", "g");
    str = str.replace(/\s*/g,"").replace(regex, data[key]);
  }
  return str;
}

function renders(template, data) {
  Object.keys(data).forEach((key) => {
    template = template.replace(/\s*/g,"").replace(new RegExp("{{" + key + "}}", "g"), data[key]);
  });
  return template;
}

function renderTemplate(template, data) {
  const regex = /\{\{(.*?)\}\}/g; // '/\{\{(\w+)\}\}/g'
  return template.replace(regex, (match, key) => data[key.trim()]);
}

const template = "我的名字是{{name }},今年{{ age }}。";
const obj = {
  name: "wu",
  age: "18",
};

console.log(renderTemplate(template, obj));
