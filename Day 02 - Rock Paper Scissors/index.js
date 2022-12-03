const readTextFile = require("../utils/readFile");

const total_players = {
  player_1: 0,
  player_2: 1,
};

const indicate = {
  Y: "Same",
  X: "Lose",
  Z: "Win",
};

const hands = {
  Rock: "Rock",
  Paper: "Paper",
  Scissors: "Scissors",
};

const player_1_hand = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const contrary_hand = {
  Rock: "X",
  Paper: "Y",
  Scissors: "Z",
};

const player_2_hand = {
  X: { choose: "Rock", point: 1 },
  Y: { choose: "Paper", point: 2 },
  Z: { choose: "Scissors", point: 3 },
};

const result_points = {
  lost: 0,
  draw: 3,
  win: 6,
};

const test = ["A Y", "B X", "C Z"];

const round_match = (hand_1, hand_2) => {
  if (hand_1 === hand_2) {
    return result_points.draw;
  }

  if (
    (hand_1 === hands.Rock && hand_2 === hands.Scissors) ||
    (hand_1 === hands.Scissors && hand_2 === hands.Paper) ||
    (hand_1 === hands.Paper && hand_2 === hands.Rock)
  ) {
    return result_points.lost;
  }

  return result_points.win;
};

const main = () => {
  try {
    const data = readTextFile("Day 02 - Rock Paper Scissors/input.txt");
    const total = playing(data);
    const total_part_2 = choose_as_indicated(data);
    console.log("PART1",total);
    console.log("PART2",total_part_2);
  } catch (error) {
    console.log(error);
  }
};

const playing = (matchs) => {
  let total_points = 0;
  matchs.forEach((match) => {
    const players = match.split(" ");
    const player_1 = players[total_players.player_1];
    const player_2 = players[total_players.player_2];
    const choose_player_1 = player_1_hand[player_1]; //Rock
    const choose_player_2 = player_2_hand[player_2].choose; //Paper
    total_points += player_2_hand[player_2].point;
    total_points += round_match(choose_player_1, choose_player_2);
  });

  return total_points;
};

/// PART_2

const roundEndsAsIndicated = (player_1, player_2) => {
  if (indicate[player_2] === indicate.Y) {
    return contrary_hand[player_1];
  }

  if (indicate[player_2] === indicate.X) {
    if (player_1 === hands.Paper) {
      return "X";
    }

    if (player_1 === hands.Rock) {
      return "Z";
    }

    return "Y";
  }

  if (player_1 === hands.Paper) {
    return "Z";
  }

  if (player_1 === hands.Rock) {
    return "Y";
  }

  if (player_1 === hands.Scissors) {
    return "X";
  }
};

const choose_as_indicated = (matchs) => {
  let total_points = 0;
  matchs.forEach((match) => {
    const players = match.split(" ");
    const player_1 = players[total_players.player_1]; // A
    const player_2 = players[total_players.player_2]; // Y
    const choose_player_1 = player_1_hand[player_1]; //Rock
    const next_player2_value = roundEndsAsIndicated(choose_player_1, player_2);
    const choose_player_2 = player_2_hand[next_player2_value].choose; //Paper //should say Rock
    total_points += player_2_hand[next_player2_value].point;
    total_points += round_match(choose_player_1, choose_player_2);
  });

  return total_points;
};

main();
