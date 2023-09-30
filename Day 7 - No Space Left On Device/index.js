const { match } = require("assert");
const readTextFile = require("../utils/readFile");

const main = () => {
  try {
    const data = readTextFile("Day 7 - No Space Left On Device/input.txt");
    part1(data);
    part2(data);
  } catch (error) {
    console.log(error);
  }
};

const creatingRoutes = (lines) => {
  const tree = {
    path: "/",
    isDirectory: true,
    children: [],
    size: 0,
  };

  let currentNode = tree;
  let currentCommand = null;

  for (const line of lines) {
    if (line[0] === "$") {
      const command = line.split(" ");
      //Command
      currentCommand = command[1];
      if (currentCommand === "cd") {
        const target = command[2];
        switch (target) {
          case "/":
            currentNode = tree;
            break;
          case "..":
            currentNode = currentNode.parent;
            break;
          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.path === target
            );
        }
      }
    } else {
      //files & directory
      const fileOrDirectory = line.split(" ");

      if (fileOrDirectory[0] !== "dir") {
        const node = {
          path: fileOrDirectory[1],
          size: parseInt(fileOrDirectory[0]),
          isDirectory: false,
          parent: currentNode,
        };
        currentNode.children.push(node);
      } else {
        const node = {
          path: fileOrDirectory[1],
          isDirectory: true,
          children: [],
          parent: currentNode,
        };
        currentNode.children.push(node);
      }
    }
  }

  return tree;
};

const showTree = (node, depth = 0) => {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.path} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  );
  if (node.isDirectory) {
    for (const child of node.children) {
      showTree(child, depth + 2);
    }
  }
};

const getSize = (node, directoryCallback = () => {}) => {
  if (!node.isDirectory) {
    return node.size;
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0);

  directoryCallback(node.path, directorySize);

  return directorySize;
};

const part1 = (data) => {
  const tree = creatingRoutes(data);
  let sumSmallSize = 0;

  getSize(tree, (path, size) => {
    if (size <= 100000) {
      sumSmallSize += size;
    }
  });

  console.log("PART1", sumSmallSize);
};

const part2 = (data) => {
  const tree = creatingRoutes(data);
  const totalDisk = 70000000;
  const usedSpace = getSize(tree);
  console.log(usedSpace);
  const requiredSpace = 30000000;

  const availableSpace = totalDisk - usedSpace;
  const minimun = requiredSpace - availableSpace;

  const candidates = [];

  getSize(tree, (path, size) => {
    if (size >= minimun) {
      candidates.push({ path, size });
    }
  });

  candidates.sort((a, b) => {
    return a.size - b.size;
  });

  console.log(candidates);
  console.log("PART2", candidates[0].size);
};

main();
