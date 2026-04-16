console.log("Day 04");

// let catchingBus = false;
// if (catchingBus) {
//   console.log("I will reach home on time");
// } else {
//   console.log("I will be late to reach");
// }

// let age = 18;
// if (age >= 18) {
//   console.log("You are eligible to vote");
// } else {
//   console.log("You are not eligible to vote");
// }

// if (age >= 18) console.log("You are eligible to vote");
// else console.log("You are not eligible to vote");

// let score = 76;
// if (score >= 90) {
//   console.log("Grade A");
// } else if (score >= 80) {
//   console.log("Grade B");
// } else if (score >= 70) {
//   console.log("Grade C");
// } else {
//   console.log("Fail");
// }

// let x = 0;
// if (x === 0) {
//   console.log("zero");
// } else if (x > 0) {
//   console.log("greater than zero");
// } else if (x < 0) {
//   console.log("less than zero");
// }

let day = 5;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day number");
}

let name = "TapasScript";

switch (name) {
  case "TapasScript":
    console.log("Teaching 40 days of JS");
    break;
  case "Google":
    console.log("Giving answer to all searches");
    break;
  default:
    console.log("You are neither Google nor TapasScript");
}

let catchingBus = true;
catchingBus
  ? console.log("I will reach home on time")
  : console.log("I will be late to reach");

let city = "Bangalore";

switch (city) {
  case "Bangalore":
  case "Kolkata":
  case "Agra":
  case "Jaipur":
    console.log("All these are in India");
    break;
  case "New York":
    console.log("This is in the USA");
    break;
}
