const readTextFile = require("../utils/readFile");

const test = ["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"];

const main = () => {
  try {
    const data = readTextFile("Day 4 - Camp Cleanup/input.txt");
    const {sum_part1,sum_part2} = listAssignments(data);
    console.log("PART1",sum_part1);
    console.log("PART2",sum_part2);
  } catch (error) {
    console.log(error);
  }
};

const listAssignments = (data) => {
  let sum_part1 = 0;
  let sum_part2 = 0;
  data.forEach((assignment) => {
    sum_part1 += isOverlapingAllNumbers(assignment.split(","));
    sum_part2 += isOverlapingOnlyOneNumber(assignment.split(","));
  });
  return {sum_part1, sum_part2};
};

const isOverlapingAllNumbers = (assignment) => {
  const section_1 = assignment[0].split("-");
  const section_2 = assignment[1].split("-");
  const list_1 = parseInt(section_1[0]) - parseInt(section_1[1]);
  const list_2 = parseInt(section_2[0]) - parseInt(section_2[1]);

  if (list_1 > list_2) {
    return isAssignmentRepetead(
      parseInt(section_1[0]),
      parseInt(section_1[1]),
      parseInt(section_2[0]),
      parseInt(section_2[1])
    );
  } else {
    return isAssignmentRepetead(
      parseInt(section_2[0]),
      parseInt(section_2[1]),
      parseInt(section_1[0]),
      parseInt(section_1[1])
    );
  }
};

const isAssignmentRepetead = (section_1, section_2, section_3, section_4) => {
  if (
    section_1 >= section_3 &&
    section_1 <= section_4 &&
    section_2 >= section_3 &&
    section_2 <= section_4
  ) {
    return 1;
  }
  return 0;
};

/// PART 2

const isOverlapingOnlyOneNumber = (assignment) => {
  const section_1 = assignment[0].split("-");
  const section_2 = assignment[1].split("-");
  const list_1 = parseInt(section_1[0]) - parseInt(section_1[1]);
  const list_2 = parseInt(section_2[0]) - parseInt(section_2[1]);

  if (list_1 > list_2) {
    return assignmentsOverlap(
      parseInt(section_1[0]),
      parseInt(section_1[1]),
      parseInt(section_2[0]),
      parseInt(section_2[1])
    );
  } else {
    return assignmentsOverlap(
      parseInt(section_2[0]),
      parseInt(section_2[1]),
      parseInt(section_1[0]),
      parseInt(section_1[1])
    );
  }
};

const assignmentsOverlap = (section_1, section_2, section_3, section_4) => {
  if (
    section_1 === section_3 ||
    section_1 === section_4 ||
    section_2 === section_3 ||
    section_2 === section_4
  ) {
    return 1;
  }

  if (
    (section_1 >= section_3 && section_1 <= section_4) ||
    (section_2 >= section_3 && section_2 <= section_4)
  ) {
    return 1;
  }

  return 0;
};

main();
