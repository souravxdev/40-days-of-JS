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
// Each zodiac sign spans two months based on birth date, so we need BOTH month and day.
// This problem can't be solved by switch-case. Because switch/case uses strict equality (===) on a single value and matches only discrete literals — it can't express range comparisons like birthDay >= 22 or compound conditions spanning two months. Ranges and multi-variable logic require if/else if.

let birthMonth = "January";
let birthDay = 15;

let sign;

if (
  (birthMonth === "December" && birthDay >= 22) ||
  (birthMonth === "January" && birthDay <= 19)
) {
  sign = "Capricorn";
} else if (
  (birthMonth === "January" && birthDay >= 20) ||
  (birthMonth === "February" && birthDay <= 18)
) {
  sign = "Aquarius";
} else if (
  (birthMonth === "February" && birthDay >= 19) ||
  (birthMonth === "March" && birthDay <= 20)
) {
  sign = "Pisces";
} else if (
  (birthMonth === "March" && birthDay >= 21) ||
  (birthMonth === "April" && birthDay <= 19)
) {
  sign = "Aries";
} else if (
  (birthMonth === "April" && birthDay >= 20) ||
  (birthMonth === "May" && birthDay <= 20)
) {
  sign = "Taurus";
} else if (
  (birthMonth === "May" && birthDay >= 21) ||
  (birthMonth === "June" && birthDay <= 20)
) {
  sign = "Gemini";
} else if (
  (birthMonth === "June" && birthDay >= 21) ||
  (birthMonth === "July" && birthDay <= 22)
) {
  sign = "Cancer";
} else if (
  (birthMonth === "July" && birthDay >= 23) ||
  (birthMonth === "August" && birthDay <= 22)
) {
  sign = "Leo";
} else if (
  (birthMonth === "August" && birthDay >= 23) ||
  (birthMonth === "September" && birthDay <= 22)
) {
  sign = "Virgo";
} else if (
  (birthMonth === "September" && birthDay >= 23) ||
  (birthMonth === "October" && birthDay <= 22)
) {
  sign = "Libra";
} else if (
  (birthMonth === "October" && birthDay >= 23) ||
  (birthMonth === "November" && birthDay <= 21)
) {
  sign = "Scorpio";
} else if (
  (birthMonth === "November" && birthDay >= 22) ||
  (birthMonth === "December" && birthDay <= 21)
) {
  sign = "Sagittarius";
} else {
  sign = "Unknown";
}

console.log(sign);

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
