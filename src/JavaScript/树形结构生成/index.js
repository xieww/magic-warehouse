const data = [
  {
    id: 0,
    name: "-1",
    parentId: "",
  },
  {
    id: 1,
    name: "1",
    parentId: 0,
  },
  {
    id: 2,
    name: "2",
    parentId: 0,
  },
  {
    id: 4,
    name: "1-4",
    parentId: 1,
  },
  {
    id: 6,
    name: "4-6",
    parentId: 4,
  },
  {
    id: 12,
    name: "2-12",
    parentId: 2,
  },
  {
    id: 13,
    name: "0",
    parentId: 0,
  },
  {
    id: 14,
    name: "13-14",
    parentId: 13,
  },
  {
    id: 15,
    name: "6-15",
    parentId: 6,
  },
];

function buildChildren(arr, parentId) {
  const result = [];
  for (const item of arr) {
    if (item.parentId === parentId) {
      const node = {
        id: item.id,
        name: item.name,
        children: buildChildren(arr, item.id),
      };
      result.push(node);
    }
  }
  return result;
}

function transfer(arr) {
  const result = [];
  for (const item of arr) {
    if (item.parentId === "") {
      const node = {
        id: item.id,
        name: item.name,
        children: buildChildren(arr, item.id),
      };
      result.push(node);
    }
  }
  return result;
}

function arrayToTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of items) {
    const id = item.id;
    const pid = item.parentId;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"],
    };

    const treeItem = itemMap[id];

    if (pid === "") {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

console.log(transfer(data));
console.log(arrayToTree(data));
