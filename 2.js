const fs = require("fs");

const input = fs.readFileSync("./input/2.txt", "utf8");

const parsed = input.split("\n").map((line) => {
  const [gameStr, cubesStr] = line.split(":");

  const id = gameStr.split(" ")[1];

  const cubes = cubesStr.trim();

  const out = {};

  out.id = id;
  out.sets = cubes.split(";").map((set) =>
    set
      .split(",")
      .map((set) => set.trim())
      .reduce((set, curr) => {
        const [number, color] = curr.split(" ");
        return {
          ...set,
          [color]: Number(number),
        };
      }, {})
  );

  return out;
});

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const possibleGames = parsed.filter((game) => {
  const notPossible = game.sets.some((set) => {
    return set.blue > maxBlue || set.red > maxRed || set.green > maxGreen;
  });

  return !notPossible;
});

const possibleIdSum = possibleGames.reduce(
  (acc, curr) => acc + Number(curr.id),
  0
);

console.log(possibleIdSum);

// Part 2
const fewerPossible = parsed.map((game) => {
  const reds = Math.max(...game.sets.map((set) => set.red).filter((c) => c));
  const greens = Math.max(
    ...game.sets.map((set) => set.green).filter((c) => c)
  );
  const blues = Math.max(...game.sets.map((set) => set.blue).filter((c) => c));

  const power = reds * greens * blues;

  return {
    id: game.id,
    power,
  };
});

const powerSum = fewerPossible.reduce((acc, curr) => acc + curr.power, 0);

console.log(powerSum);
