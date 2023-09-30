const fs = require("fs");
const readTextFile = require("../utils/readFile");
// function readTextFile(route_file) {
//   try {
//     const data = fs.readFileSync(route_file, { encoding: "utf-8" });
//     return data.replace(/\r/g, "").trimEnd();
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

const main = () => {
  try {
    const data = readTextFile("Day 8 - Treetop Tree House/input.txt");
    const trees = initMatrix(data);
    const totalTrees = lookingVisibleTrees(trees);
    console.log("PART1", totalTrees);
  } catch (error) {
    console.log(error);
  }
};

const setVisible = (x, y, visible) => {
  visible.add(`${y}-${x}`);
};

const lookingVisibleTrees = (matrix) => {
  let text = "";
  let visibleTrees = 0;
  const visible = new Set();

  //Columns
  let column = 1;
  let row = 1;
  while(column !== matrix.length -1){
      for (let y = 1; y < matrix.length -1; y++) {
        const number = matrix[y][column];
        const top = matrix[y -1][column];
        const bottom = matrix[y +1][column];
        
        if(number > top && number > bottom){
            setVisible(y,column,visible);
            visibleTrees++;
        }
      }
      column++;
  }


  while(row !== matrix.length -1){
    for (let x = 1; x < matrix.length -1; x++) {
      const number = matrix[row][x];
      const right = matrix[row][x + 1];
      const left = matrix[row][x - 1];
      
      if(number > right && number > left){
          setVisible(x,row,visible);
          visibleTrees++;
      }
    }
    row++;
}


  console.log("BEFORE",visibleTrees,visible.size)

//   for (let i = 1; i < matrix.length - 1; i++) {
//     for (let y = 1; y < matrix[i].length - 1; y++) {
//       text += matrix[i][y].number + " ";
//       const currentNumber = matrix[i][y];

//       //   const top = matrix[i - 1][y];
//       //   const bottom = matrix[i + 1][y];

//       if (currentNumber > right || currentNumber > left) {
//         visibleTrees++;
//         setVisible(i, y, visible);
//       }

//       //   const isAnEdgeB = matrix.length === i ? true : false;
//       //   const isAndEdgeT = i === 1 ? true : false;

//       //   if (
//       //     (!right.isTree && currentNumber > right.number) ||
//       //     (!left.isTree && currentNumber > left.number)
//       //   ) {
//       //     matrix[i][y].isTree = true;
//       //     setVisible(i, y, visible);
//       //   } else if (isAnEdgeB && !bottom.isTree && currentNumber > bottom.number) {
//       //     matrix[i][y].isTree = true;
//       //     setVisible(i, y, visible);
//       //   } else if (isAndEdgeT && !top.isTree && currentNumber > top.number) {
//       //     matrix[i][y].isTree = true;
//       //     setVisible(i, y, visible);
//       //   }
//     }
//     // console.log(text);
//     text = "";
//   }

  const treesAraoungTheEdge = matrix.length * 2 + (matrix[0].length - 2) * 2;

  return visible.size + treesAraoungTheEdge;
};

const initMatrix = (lines) => {
  const matrix = [];
  for (const line of lines) {
    const numbers = line.split("");
    const row = [];
    for (let i = 0; i < numbers.length; i++) {
      const number = parseInt(numbers[i]);
      row.push(number);
    }
    matrix.push(row);
  }

  return matrix;
};

main();
