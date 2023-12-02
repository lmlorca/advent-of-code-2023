const fs = require("fs");

const input = fs.readFileSync("./input/1.txt", "utf8");

const first = input
  .split("\n")
  .map((line) => line.split("").filter((char) => !isNaN(Number(char))))
  .map((arr) => arr[0] + "" + arr[arr.length - 1])
  .map((str) => Number(str))
  .reduce((acc, curr) => acc + curr, 0);

console.log("first", first);

let second = [];

const checkStr = (str) => {
  if (str.includes("one")) return 1;
  if (str.includes("two")) return 2;
  if (str.includes("three")) return 3;
  if (str.includes("four")) return 4;
  if (str.includes("five")) return 5;
  if (str.includes("six")) return 6;
  if (str.includes("seven")) return 7;
  if (str.includes("eight")) return 8;
  if (str.includes("nine")) return 9;
};

for (let i = 0; i < input.split("\n").length; i++) {
  let first;
  let last;
  const currentLine = input.split("\n")[i];

  let left = [];
  for (let i = 0; i < currentLine.length; i++) {
    if (!isNaN(currentLine[i])) {
      first = currentLine[i];
      break;
    }

    left.push(currentLine[i]);
    first = checkStr(left.join(""));

    if (first) break;
  }

  let right = [];
  for (let i = currentLine.length - 1; i >= 0; i--) {
    if (!isNaN(currentLine[i])) {
      last = currentLine[i];
      break;
    }

    right.push(currentLine[i]);
    last = checkStr([...right].reverse().join(""));

    if (last) break;
  }

  second.push([first, last]);
}

second = second
  .map((arr) => arr.filter((num) => typeof num !== "undefined"))
  .map((arr) => (arr.length === 1 ? arr[0] + "" + arr[0] : arr.join("")))
  .map((str) => Number(str))
  .reduce((acc, curr) => acc + curr, 0);

console.log("second", second);
