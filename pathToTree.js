const items = [
  { id: "1", path: "root" },
  { id: "2", path: "root.level1" },
  // { id: "3", path: "root.level1.level2" },
  // { id: "5", path: "root.level1.level2.level3" },
  // { id: "4", path: "root.level1.level3" },
  // { id: "20", path: "root2" },
  // { id: "21", path: "root2.level1" },
  { id: "30", path: "root3.level1" },
];

const expected = [
  {
    id: "1",
    path: "root",
    children: [
      {
        id: "2",
        path: "root.level1",
        children: [
          {
            id: "3",
            path: "root.level1.level2",
            children: [
              {
                id: "5",
                path: "root.level1.level2.level3",
                children: [],
              },
            ],
          },
          {
            id: "4",
            path: "root.level1.level3",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "20",
    path: "root2",
    children: [{ id: "21", path: "root2.level1", children: [] }],
  },
  {
    id: "30",
    path: "root3.level1",
    children: [],
  },
];

const grouped = Object.groupBy(items, (item) => {
  // const path = item.path.split(".");

  // return path.slice(0, path.length - 1).join(".");
  return item.path.split(".").length === 1 ? "" : item.path;
});

console.log(grouped);

console.log(
  "======================================================================",
);

/**
 * @typedef {Object} Leaf
 * @property {string} id
 * @property {string} path
 * @property {Leaf[]} children
 */

/**
 * @typedef {Leaf[]} Tree
 */

/** @type {Tree} */
const tree = [];

for (const [key, value] of Object.entries(grouped)) {
  if (value == null) {
    continue;
  }

  // Do I have an ancestor?
  // Should convert root.level1.level2.level3 to array of:
  // - root.level1.level2
  // - root.level1
  // - root
  const paths = key
    .split(".")
    .reduce((acc, cur) => {
      if (acc.length === 0) {
        acc.push(cur);
      } else {
        acc.push(`${acc[acc.length - 1]}.${cur}`);
      }
      return acc;
    }, /** @type {string[]} */ ([]))
    .reverse();

  let hasAncestor = false;
  let ancestorPath = null;

  if (key.split(".").length === 1) {
    hasAncestor = false;
  } else if (paths.at(0) === key) {
    hasAncestor = false;
  } else {
    // hasAncestor = paths.some((path) => grouped[path] != null);
    ancestorPath = paths.find((path) => grouped[path] != null);
    hasAncestor = ancestorPath != null;
  }

  if (!hasAncestor) {
    tree.push({
      id: value[0].id,
      path: value[0].path,
      children: [],
    });
  } else {
    // Find the ancestor
    const ancestor = tree.find((item) => {
      return paths.some((path) => item.path === path);
    });

    if (ancestor != null) {
      ancestor.children.push({
        id: value[0].id,
        path: key,
        children: [],
      });
    }
  }

  console.log(key, value, paths, ancestorPath, hasAncestor);
}

console.log(
  "\n================================ TREE ================================\n",
);

console.dir(tree, { depth: null, colors: true });
