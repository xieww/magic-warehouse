const data = [
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

function transfer(arr, parentId) {
  const result = [];
  for (const item of arr) {
    if (item.parentId === parentId) {
      const node = {};
      node.id = item.id;
      node.name = item.name;
      node.children = transfer(arr, item.id);
      result.push(node);
    }
  }
  return result;
}

console.log(transfer(data, 0));
