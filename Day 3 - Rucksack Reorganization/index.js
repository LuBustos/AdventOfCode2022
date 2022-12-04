const readTextFile = require("../utils/readFile");

const test = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

const main = () => {
  try {
    const data = readTextFile("Day 3 - Rucksack Reorganization/input.txt");
    const itemSum = priritizeRearrangement(data);
    const itenSumPartTwo = priritizeRearrangementOfThreeElves(data);
    console.log("PART1",itemSum);
    console.log("PART2",itenSumPartTwo);
  } catch (error) {
    console.log(error);
  }
};

const getUpperLetterPoints = (letter) => {
  return letter.charCodeAt(0) - 38;
};

const getLowerLetterPoints = (letter) => {
  return letter.charCodeAt(0) - 96;
};

const priritizeRearrangement = (data) => {
  let sum = 0;
  data.forEach((rucksack) => {
    const compartments = cutRucksack(rucksack);
    const letter = searchSameLetter(compartments[0], compartments[1]);
    if (letter === letter.toUpperCase()) {
      sum += getUpperLetterPoints(letter);
    } else {
      sum += getLowerLetterPoints(letter);
    }
  });
  return sum;
};

const searchSameLetter = (first_half, rest) => {
  for (let i = 0; i < first_half.length; i++) {
    const letter = first_half[i];
    if (rest.includes(letter)) {
      return letter;
    }
  }
  return "";
};

const cutRucksack = (rucksack) => {
  const cuttedRucksack = [];
  cuttedRucksack.push(rucksack.slice(0, rucksack.length / 2));
  cuttedRucksack.push(rucksack.slice(rucksack.length / 2));
  return cuttedRucksack;
};

/// PART 2
const priritizeRearrangementOfThreeElves = (data) => {
  let sum = 0;
  let group = 0;
  const compartments = [];
  data.forEach((rucksack) => {
    compartments.push(rucksack);
    if (group === 2) {
      const letter = lookingLongArrayAndSearch(
        compartments[0],
        compartments[1],
        compartments[2]
      );
      if (letter === letter.toUpperCase()) {
        sum += getUpperLetterPoints(letter);
      } else {
        sum += getLowerLetterPoints(letter);
      }
      group = 0;
      compartments.length = 0;
    } else {
      group++;
    }
  });
  return sum;
};

const lookingLongArrayAndSearch = (first_c, second_c, third_c) => {
  if (first_c.length > second_c.length && first_c.length > third_c.length) {
    return searchSameLetterInThreeCompartments(first_c, second_c, third_c);
  }
  if (second_c.length > first_c.length && second_c.length > third_c.length) {
    return searchSameLetterInThreeCompartments(second_c, first_c, third_c);
  }

  return searchSameLetterInThreeCompartments(third_c, first_c, second_c);
};

const searchSameLetterInThreeCompartments = (main_c, second_c, third_c) => {
  for (let i = 0; i < main_c.length; i++) {
    const letter = main_c[i];
    if (second_c.includes(letter) && third_c.includes(letter)) {
      return letter;
    }
  }
  return "";
};

main();
