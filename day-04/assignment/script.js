// Task 1: What will be the output of this code snippet and why?

let day = "Monday";

switch (day) {
  case "monday":
    console.log("It's the start of the week.");
    break;
  default:
    console.log("It's a normal day.");
}

// Output: It's a normal day.

// In switch..case, case sensitivity matters. "Monday" and "monday" isn't same string. As the value is "Monday", it won't match with case "monday", so the default block will run.

// Task 2: Build an ATM Cash Withdrawal System

let withdrawlUnit = 100;
let withdrawlAmount = 250;
let withdrawlPossibility = withdrawlAmount % withdrawlUnit;

if (withdrawlPossibility === 0) {
  console.log("Withdrawal successful");
} else {
  console.log("Invalid amount");
}

// Task 3: Build a Calculator with switch-case

let x = 10,
  y = 2;
let operator = "%";

switch (operator) {
  case "+":
    console.log(x + y);
    break;
  case "-":
    console.log(x - y);
    break;
  case "/":
    console.log(x / y);
    break;
  case "%":
    console.log(x % y);
    break;
  default:
    console.log("Invalid operator");
}

// Task 4: Pay for your movie ticket

let age = 45;

if (age < 18) {
  console.log("Ticket price is $3");
} else if (age >= 18 && age < 60) {
  console.log("Ticket price is $10");
} else {
  console.log("Ticket price is $8");
}

// Task 5: Horoscope Sign Checker

let birthMonth = "January";

switch (birthMonth) {
  case "March":
  case "April":
    console.log("Aries");
    break;
  case "May":
    console.log("Taurus");
    break;
  case "June":
    console.log("Gemini");
    break;
  case "July":
    console.log("Cancer");
    break;
  case "August":
    console.log("Leo");
    break;
  case "September":
    console.log("Virgo");
    break;
  case "Octtober":
    console.log("Libra");
    break;
  case "November":
    console.log("Scorpio");
    break;
  case "December":
    console.log("Sagittarius");
    break;
  case "January":
    console.log("Capricorn");
    break;
  case "February":
    console.log("Aquarius");
    break;
  default:
    console.log("Unknown");
}

// Task 6: Which Triangle?

let a = 1,
  b = 1,
  c = 1;
if ((a === b && a !== c) || (b === c && b !== a) || (c === a && c !== b)) {
  console.log("Isosceles Triangle");
} else if (a === b && b === c && a === c) {
  console.log("Equilateral Triangle");
} else {
  console.log("Scalene Triangle");
}
