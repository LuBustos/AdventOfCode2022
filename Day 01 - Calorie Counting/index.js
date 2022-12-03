const readTextFile = require("../utils/readFile");

const main = () => {
  try {
    const data  = readTextFile("Day 01 - Calorie Counting/input.txt");
    const totalFoodCarried = calorieCounting(data);
    const elfCarryingTheMostCalories = searchMaxFood(totalFoodCarried)
    const threeElfesCarryingTheMostCalories = searchTopThreeOfMaxFood(totalFoodCarried)
    console.log("PART 1",elfCarryingTheMostCalories);
    console.log("PART 2",threeElfesCarryingTheMostCalories);
  } catch (error) {
    console.log(error);
  }
};

const searchMaxFood = (totalFoodCarried) => {
  totalFoodCarried.sort((a,b) => {
    return b - a;
  })
  return totalFoodCarried[0];
}

const calorieCounting = (data) => {
  const totalFoodCarrieByElves = [];
  let totalFood = 0;
  data.forEach((food, index) => {
    if (food.length > 0) {
      totalFood += parseInt(food);
    }else{
      totalFoodCarrieByElves.push(totalFood);
      totalFood = 0;
    }
  });
  return totalFoodCarrieByElves;
};

// PART 2
const searchTopThreeOfMaxFood = (totalFoodCarried) => {
  totalFoodCarried.sort((a,b) => {
    return b - a;
  })
  return totalFoodCarried[0] + totalFoodCarried[1] + totalFoodCarried[2];
}



main();
