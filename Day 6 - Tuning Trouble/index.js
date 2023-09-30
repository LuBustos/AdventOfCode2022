const readTextFile = require("../utils/readFile");

const main = () => {
  try {
    const data = readTextFile("Day 6 - Tuning Trouble/input.txt");
    //PART_1
    const characters_processed_1 = lookingForAMarker(data[0], 4);
    console.log("PART1", characters_processed_1);
    //PART_2
    const characters_processed_2 = lookingForAMarker(data[0], 14);
    console.log("PART2", characters_processed_2);
  } catch (error) {
    console.log(error);
  }
};

function hasRepeats(str) {
  return /(.).*\1/.test(str);
}

const lookingForAMarker = (datastream, group) => {
  let count = group;
  for (let i = 0; i < datastream.length; i++) {
    const test = datastream.substring(i, i + group);
    if (!hasRepeats(test)) {
      break;
    }
    count++;
  }
  return count;
};

main();
