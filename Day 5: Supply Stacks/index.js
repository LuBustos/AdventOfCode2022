const { count } = require("console");
const fs = require("fs");

function readTextFile(route_file) {
  try {
    const data = fs.readFileSync(route_file, { encoding: "utf-8" });
    return data.replace(/\r/g, "").trimEnd();
  } catch (err) {
    console.error("Error:", err);
  }
}

const main = () => {
  try {
    const data = readTextFile("Day 5: Supply Stacks/input.txt");
    const { supplys, movements } = arraysOfSupplys(data);
    const message = createMessage(movements.flat().flat(), supplys);
    console.log("PART_1", message);
  } catch (error) {
    console.log(error);
  }
};

const arraysOfSupplys = (data) => {
  const movements = [];
  let supplys = {};

  const [stacks, moves] = data.split("\n\n");
  const array_stacks = stacks.split("\n").map((line) => {
    return [...line].filter((value, index) => index % 4 === 1);
  });

  movements.push(
    moves.split("\n").map((line) => {
      return line.split(" ");
    })
  );

  function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
      column.push(matrix[i][col]);
    }
    return column;
  }

  for (let i = 0; i < array_stacks.length; i++) {
    const col = getCol(array_stacks, i)
      .reverse()
      .filter((el) => el !== " ");
    const index = col.indexOf(String(i + 1));
    if (index > -1) {
      col.splice(index, 1);
    }
    supplys[i + 1] = col;
  }
  return { supplys, movements };
};

const createMover9000 = (supplys, from, to, count) => {
  const supply_from = supplys[from];
  const supply_to = supplys[to];
  for (let i = 0; i < count; i++) {
    const element_popped = supply_from.pop();
    if (element_popped) {
      supply_to.push(element_popped);
    }
  }
};

const createMessage = (movements, supplys) => {
  let count = 0;
  let from = 0;
  let to = 0;
  movements.forEach((movement, index) => {
    if (movement === "move") {
      count = movements[index + 1];
    }

    if (movement === "from") {
      from = movements[index + 1];
    }

    if (movement === "to") {
      to = movements[index + 1];
      //   createMover9000(supplys, from, to, count);
      //For part 2
      createMover9001(supplys, from, to, parseInt(count));
    }
  });

  let message = "";
  for (const supply of Object.values(supplys)) {
    const letter = supply[supply.length - 1];
    message += letter;
  }

  return message;
};

// PART 2
const createMover9001 = (supplys, from, to, count) => {
    const supply_from = supplys[from];
    const supply_to = supplys[to];
    const elements_popped = [];
    for (let i = 0; i < count; i++) {
      const element_popped = supply_from.pop();
      if (count >=2) {
        elements_popped.push(element_popped);
      } else {
        if (element_popped) {
          supply_to.push(element_popped);
        }
      }
    }
  
    if (count >= 2) {
      supplys[to] = supply_to.concat(elements_popped.reverse());
    }
  };

main();
