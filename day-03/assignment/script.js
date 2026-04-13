// Task 1: Odd or Even?

let number = 9;
number % 2 === 0
  ? console.log(`The number ${number} is Even.`)
  : console.log(`The number ${number} is Odd.`);

// Task 2: Do you have a Driving License?

let age = 25;
age >= 18
  ? console.log("Eligible for driving licence.")
  : console.log("Not eligible for driving licence.");

// Task 3: Calculate CTC with a Bonus.

let monthlySalary = 12300;
let yearlySalary = 12300 * 12;
let bonus = (yearlySalary * 20) / 100;
let totalSalary = yearlySalary + bonus;

console.log(`Money I make per annum as a CTC is ${totalSalary}`);

// Task 4: Write a program for the Traffic Light Simulation.
let color = "green";
color === "red" ? console.log("STOP") : console.log("GO");

// Task 5: Create an Electricity Bill Calculator

let units = 100;
let costOfUnit = 150;
let monthlyBill = units * costOfUnit;
let yearlyBill = monthlyBill * 12;
let discount = (yearlyBill * 20) / 100;
let finalYearlyBill = yearlyBill - discount;
console.log(`Monthly electricity bill is: ${monthlyBill}`);
console.log(`Yearly electricity bill is: ${finalYearlyBill}`);

// Task 6: Leap Year Checker

let year = 2020;
(year % 4 === 0 && year !== 100) || year % 400 === 0
  ? console.log("Leap Year")
  : console.log("Not Leap Year");

// Task 7: Max of Three Numbers

let p = 5,
  q = 6,
  r = 7;
p > q && p > r
  ? console.log(`Max number: ${p}`)
  : q > p && q > r
    ? console.log(`Max number: ${q}`)
    : console.log(`Max number: ${r}`);

// Task 8: Bitwise Doubling

let count = 5;
let leftShift = count << 1;
console.log(leftShift);
