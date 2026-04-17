# Day 05: Loops and Iterations in JavaScript

## Why Loops Matter for Logic Building

Before jumping into Data Structures, Algorithms, or Dynamic Programming, you need a **solid grip on logic building**. Without that foundation, DSA and other advanced topics quickly become frustrating and you lose interest.

- **DSA = Data Structures + Algorithms** — structuring data efficiently and writing efficient logic to handle it.
- **Logic building** is the prerequisite — it starts from the fundamentals of a programming language.

So far we've covered: **Operators → Expressions → Conditions → Control Statements**. Today we step into **loops and iterations**, which complete the core toolkit for basic problem-solving.

---

## 1. What is a Loop?

A **loop** means doing the same task repeatedly.

### Real-World Analogy — The Potato Run

Imagine your mom asks you to go to the market, buy potatoes, and come back. If she asks you to do this **five times**, you are:

1. Going to the market
2. Buying potatoes
3. Coming back

…and repeating these steps over and over. You are in a **loop** of performing these tasks.

### Loops in Programming

In programming, a loop allows you to execute a block of code multiple times **without writing the same code over and over**. Instead of copy-pasting instructions line by line, you use a loop construct that **automates** the repeated execution.

> **In short:** A loop executes a block of code multiple times, automating the repeated task for you.

### Iteration — The Jargon

**Iteration** is just another word for a single pass through a loop.
- Looping once = 1 iteration
- Looping twice = 2 iterations
- Looping four times = 4 iterations

Don't be intimidated by the word — it simply means *one cycle of the loop*.

---

## 2. Three Types of Loops in JavaScript

JavaScript primarily provides three loop constructs:

| Loop | When to Use |
|------|-------------|
| `for` | When you know **exactly** how many times to loop (fixed iterations) |
| `while` | When you **don't know** in advance how many times to loop |
| `do...while` | When you need to guarantee **at least one execution** before checking the condition |

### The Potato Analogy Extended

- **`for` loop** → You already know you're going to the market **5 times**.
- **`while` loop** → You don't know how many times mom will send you — depends on how potatoes run out.
- **`do...while` loop** → You're definitely going **at least once** today, no excuses like "there's a cricket match on."

---

## 3. The `for` Loop

The `for` loop is best when you know exactly how many times a block of code needs to run.

### Syntax

```javascript
for (initialization; condition; update) {
  // code to execute
}
```

Inside the parentheses, you write **three** things separated by semicolons:

| Part | Purpose |
|------|---------|
| **initialization** | Where the loop starts — usually declares and assigns a counter variable |
| **condition** | The check that decides whether the loop continues — must evaluate to `true` or `false` |
| **update** | How the counter is modified after each iteration so the loop can progress |

### The Ball-Drop Analogy

You want to drop and catch a ball **5 times**:

- **Initialization** → `let ballDropCount = 1;` (start at 1)
- **Condition** → `ballDropCount <= 5` (continue while count is 5 or less)
- **Update** → `ballDropCount++` (increment after every drop-catch)

After the 5th drop, the counter becomes 6. The condition `6 <= 5` is `false`, so the loop exits.

---

## 4. How a `for` Loop Executes — Flowchart View

Drawing the flowchart helps cement the concept. Every program has a **Start** and an **End**.

```
        ┌─────────┐
        │  Start  │
        └────┬────┘
             ▼
     ┌───────────────┐
     │ Initialize    │
     │ variable      │
     └───────┬───────┘
             ▼
       ┌──────────┐
       │ Check    │◄────────┐
       │condition │         │
       └────┬─────┘         │
            │               │
     No ◄───┴───► Yes       │
      │           │         │
      ▼           ▼         │
   ┌─────┐   ┌─────────┐    │
   │ End │   │ Execute │    │
   └─────┘   │  code   │    │
             └────┬────┘    │
                  ▼         │
            ┌──────────┐    │
            │ Update   │────┘
            │ variable │
            └──────────┘
```

**Key points:**
- If the condition is **true**, execute the body, then update, then check again.
- If the condition is **false**, terminate the loop.
- The update happens **after** the body runs, not before.

> **Tip:** When learning, draw this flowchart on paper for the first few loops you write. It burns the logic into your memory.

---

## 5. `for` Loop Examples

### Example 1 — Print Numbers from 1 to 5

```javascript
for (let count = 1; count <= 5; count++) {
  console.log("Iteration / Loop", count);
}

// Output:
// Iteration / Loop 1
// Iteration / Loop 2
// Iteration / Loop 3
// Iteration / Loop 4
// Iteration / Loop 5
```

**Why `<=` and not `<`?**
Because we want to include 5. With `count < 5`, the loop would stop at 4.

### Example 2 — Sum of All Even Numbers from 1 to 100

This example combines looping with a conditional check. It's a classic "peel the onion" problem — solve one layer at a time.

**Step 1: Identify an even number.**
A number is even if `number % 2 === 0`.

**Step 2: Loop through 1 to 100 and check each one.**

```javascript
let sum = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum = sum + i;   // or: sum += i
  }
}

console.log("Sum is:", sum);

// Output: Sum is: 2550
```

**Tracing the execution:**
- `i = 1` → `1 % 2 === 1` → skip
- `i = 2` → `2 % 2 === 0` → `sum = 0 + 2 = 2`
- `i = 3` → skip
- `i = 4` → `sum = 2 + 4 = 6`
- `i = 5` → skip
- `i = 6` → `sum = 6 + 6 = 12`
- … continues until `i = 100`
- Final `sum = 2550`

> **Logic-building tip:** Break the problem into small layers — first identify the condition (even number), then wrap it inside the loop that provides the inputs.

### Example 3 — Loop Through a String

Loops aren't limited to numbers. You can iterate over the characters of a string too.

```javascript
let language = "JavaScript";

for (let i = 0; i < language.length; i++) {
  console.log(language.charAt(i));
}

// Output:
// J
// a
// v
// a
// S
// c
// r
// i
// p
// t
```

**What's happening here?**

- Strings are **zero-indexed** — the first character is at position `0`, not `1`.
- `"JavaScript"` has 10 characters, so positions go from `0` to `9`.
- `language.length` returns `10`.
- The condition `i < language.length` means `i` goes from `0` up to `9` (10 is excluded).
- `language.charAt(i)` returns the character at position `i`.

| `i` | `language.charAt(i)` |
|-----|----------------------|
| 0 | `"J"` |
| 1 | `"a"` |
| 2 | `"v"` |
| 3 | `"a"` |
| 4 | `"S"` |
| 5 | `"c"` |
| 6 | `"r"` |
| 7 | `"i"` |
| 8 | `"p"` |
| 9 | `"t"` |

> **Position vs. Count:** A string of 10 characters has positions `0` through `9`. Position is always one less than the count because indexing starts at `0`.

---

## 6. Nested Loops — A Loop Inside a Loop

You can place one loop **inside** another. This is called a **nested loop** and it's the go-to pattern for **multi-dimensional data** — tables, grids, matrices, and any data that has both rows and columns.

### Syntax

```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log("row", i, "column", j);
  }
}
```

> **Note:** The inner loop must use a **different variable name** — you can't reuse `i` because it's already declared in the outer loop.

### Output

```
row 1 column 1
row 1 column 2
row 1 column 3
row 2 column 1
row 2 column 2
row 2 column 3
row 3 column 1
row 3 column 2
row 3 column 3
```

### How Nested Loops Execute

**The inner loop completes fully for every single iteration of the outer loop.**

Trace through:
1. Outer loop starts: `i = 1`.
2. Inner loop runs completely: `j = 1, 2, 3`.
3. Only after the inner loop finishes does the outer loop increment: `i = 2`.
4. Inner loop runs completely again: `j = 1, 2, 3`.
5. Outer loop increments: `i = 3`.
6. Inner loop runs completely: `j = 1, 2, 3`.
7. Outer loop tries `i = 4` → condition fails → exit.

### When to Use Nested Loops

- Working with **tables** or **grids**
- Processing **matrices** in mathematics
- Implementing **game boards** (e.g., tic-tac-toe, chess)

> **Caution:** Nested loops have real performance cost — a loop inside a loop is O(n²), so avoid them when simpler alternatives exist. Performance optimization for nested loops is covered in advanced sessions.

### Variable Naming in Nested Loops

Using `i`, `j`, `k` is common **for practice** but **not for real-world code**. In production:

```javascript
// ❌ Not descriptive
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) { /* ... */ }
}

// ✅ Descriptive and readable
for (let row = 0; row < 3; row++) {
  for (let column = 0; column < 3; column++) { /* ... */ }
}
```

---

## 7. `break` and `continue`

These two keywords control the flow **inside** a loop.

### `break` — Exit the Loop Immediately

`break` stops the loop entirely — no more iterations happen after it's encountered.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}

// Output:
// 1
// 2
```

**Why is 3 not printed?**
When `i` becomes 3, `break` is hit **before** `console.log(i)` runs. The loop exits right there.

If the `console.log` came **before** the `break`:

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
  if (i === 3) {
    break;
  }
}

// Output:
// 1
// 2
// 3
```

Now 3 **is** printed — because the log happens first and then `break` exits.

> **Recap:** You've already seen `break` used in `switch...case` to prevent fall-through. The idea is the same: **immediately exit the enclosing block.**

### `continue` — Skip the Current Iteration

`continue` skips the **rest of the current iteration** and jumps to the **next one**. It does **not** exit the loop.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}

// Output:
// 1
// 2
// 4
// 5
```

**What happened to 3?**
When `i === 3`, `continue` skips the `console.log` for that iteration and moves on to `i = 4`. The loop itself keeps running.

### `break` vs. `continue` — Quick Reference

| Keyword | Effect |
|---------|--------|
| `break` | Exits the loop entirely — no more iterations |
| `continue` | Skips only the current iteration — loop keeps running |

---

## 8. Multiple Counters in a Single Loop

Sometimes you need **two counters** moving simultaneously within a single `for` loop — for example, one counting up while another counts down.

### Example — Counting Up and Down Together

```javascript
for (let i = 1, j = 10; i <= 10 && j >= 1; i++, j--) {
  console.log(i, j);
}

// Output:
// 1 10
// 2 9
// 3 8
// 4 7
// 5 6
// 6 5
// 7 4
// 8 3
// 9 2
// 10 1
```

**Breakdown of the syntax:**

| Part | What It Does |
|------|-------------|
| `let i = 1, j = 10` | Initializes **two** counters using the comma operator |
| `i <= 10 && j >= 1` | Combines two conditions with the logical `&&` operator |
| `i++, j--` | Updates both counters — one increments, the other decrements |

> **Key distinction:** In initialization and update, you use the **comma operator** to separate multiple expressions. But the **condition** section always takes a single logical expression — combine multiple conditions using `&&` or `||`.

### Nested Loops vs. Multiple Counters

| Pattern | Use Case |
|---------|----------|
| **Nested loops** | One loop inside another — for 2D data |
| **Multiple counters** | One loop, multiple variables changing together — for parallel progression |

---

## 9. The `while` Loop

Use a `while` loop when you **don't know in advance** how many times the loop needs to run.

### Syntax

```javascript
while (condition) {
  // code to execute
}
```

Much simpler than `for`:
- No initialization inside the parentheses (do it *before* the loop).
- No update inside the parentheses (do it *inside* the body).
- Just a condition — as long as it's `true`, the body runs.

### Flowchart View

```
        ┌─────────┐
        │  Start  │
        └────┬────┘
             ▼
     ┌───────────────┐
     │ (Optional)    │
     │ Initialize    │
     └───────┬───────┘
             ▼
       ┌──────────┐
       │ Check    │◄────────┐
       │condition │         │
       └────┬─────┘         │
            │               │
    False ◄─┴─► True        │
      │         │           │
      ▼         ▼           │
   ┌─────┐  ┌─────────┐     │
   │ End │  │ Execute │─────┘
   └─────┘  │  code   │
            └─────────┘
```

### Example — Print 1 to 5 Using `while`

```javascript
let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter++;
}

// Output:
// 1
// 2
// 3
// 4
// 5
```

**Tracing the execution:**
- `counter = 1` → `1 <= 5` is `true` → print `1`, increment to `2`
- `counter = 2` → `2 <= 5` is `true` → print `2`, increment to `3`
- … and so on
- `counter = 6` → `6 <= 5` is `false` → exit loop

### When to Use `while` in Real Projects

The classic use case is **processing user input** until the user signals they're done. You don't know up front how many times the user will enter something, so you keep looping until a specific input breaks you out.

> **Critical:** Always make sure something inside the loop changes the condition — otherwise you get an **infinite loop** (covered below). Forgetting `counter++` inside a `while` loop is the most common beginner mistake.

---

## 10. The `do...while` Loop

The `do...while` loop **guarantees that the body runs at least once**, because the condition is checked **after** the body — not before.

### Syntax

```javascript
do {
  // code to execute
} while (condition);
```

Notice the **semicolon** after the `while(...)` — this is required.

### Flowchart View

```
        ┌─────────┐
        │  Start  │
        └────┬────┘
             ▼
     ┌───────────────┐
     │ Initialize    │
     └───────┬───────┘
             ▼
       ┌─────────┐
       │ Execute │◄────────┐
       │  code   │         │
       └────┬────┘         │
            ▼              │
     ┌────────────┐        │
     │ Update     │        │
     │ variable   │        │
     └─────┬──────┘        │
           ▼               │
       ┌──────────┐        │
       │ Check    │        │
       │condition │────────┘ (true)
       └────┬─────┘
            │ (false)
            ▼
         ┌─────┐
         │ End │
         └─────┘
```

### Example — Print 1 to 5 Using `do...while`

```javascript
let number = 1;

do {
  console.log(number);
  number++;
} while (number <= 5);

// Output:
// 1
// 2
// 3
// 4
// 5
```

### The Key Difference — `while` vs. `do...while`

Consider a case where the condition is **false from the start**:

```javascript
// while loop — body never executes
let x = 10;
while (x < 5) {
  console.log("while:", x);   // never prints
  x++;
}

// do...while loop — body runs once anyway
let y = 10;
do {
  console.log("do while:", y);   // prints "do while: 10"
  y++;
} while (y < 5);
```

- With `while`, the condition is checked **first** — if it's false, the body never runs.
- With `do...while`, the body runs **once** before the condition is ever evaluated.

> **Use `do...while` when:** the operation must happen at least once regardless of the condition — e.g., prompting a user for input (you must ask at least once before deciding whether to ask again).

---

## 11. Infinite Loops — Handle With Care

An **infinite loop** is a loop whose exit condition is never met — it keeps running forever (until the program crashes or is manually stopped).

### Why Infinite Loops Happen

1. **Missing exit condition** — you forgot to include one.
2. **Condition always true** — e.g., `while (true)` with no `break` inside.
3. **Update missing** — the counter never changes, so the condition never flips to false.

### Consequences

- Program **crashes** or hangs
- **Excessive CPU consumption**
- Browser tab freezes
- Can require force-quitting the process

### How to Create Infinite Loops (Do NOT Do This By Accident)

**Infinite `for` loop:**
```javascript
for (;;) {
  console.log("forever");
}
```
No initialization, no condition, no update — just two semicolons. JavaScript assumes the condition is always true.

**Infinite `while` loop:**
```javascript
while (true) {
  console.log("forever");
}
```

**Infinite `do...while` loop:**
```javascript
do {
  console.log("forever");
} while (true);
```

### Are Infinite Loops Ever Useful?

Yes — but **only in advanced scenarios** where you deliberately want a loop that runs until an external event (like a user action or server signal) breaks it out. These cases always have a `break` inside that's triggered by a specific condition.

> **For now:** Avoid infinite loops. Always double-check your exit condition and make sure something inside the loop moves the counter toward the exit. Don't hard-code `true` as a condition unless you know exactly why.

---

## 12. When to Use Which Loop — Decision Guide

```
Do you know EXACTLY how many times to iterate?
  → YES → Use for loop
  → NO  → Do you need to run the body AT LEAST ONCE?
              → YES → Use do...while loop
              → NO  → Use while loop
```

| Situation | Best Loop |
|-----------|-----------|
| Iterate over an array of known length | `for` |
| Iterate through characters of a string | `for` |
| Loop a fixed number of times (e.g., 5, 10, 100) | `for` |
| Process user input until they type "quit" | `while` |
| Read data from a source until it's exhausted | `while` |
| Ask user for input — but ensure at least one prompt | `do...while` |
| Validate input — prompt once, then re-prompt if invalid | `do...while` |

---

## 13. Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Loop** | Executes a block of code repeatedly, automating the task |
| **Iteration** | A single pass through a loop |
| **`for` loop** | Best when the number of iterations is known in advance |
| **`for` syntax** | `for (initialization; condition; update) { ... }` |
| **`while` loop** | Best when the number of iterations is unknown |
| **`do...while` loop** | Guarantees the body runs at least once before checking the condition |
| **Nested loop** | A loop inside another loop — used for multi-dimensional data (grids, tables) |
| **Inner-loop rule** | The inner loop runs completely for each iteration of the outer loop |
| **Multiple counters** | Declare and update multiple variables using the comma operator |
| **`break`** | Exits the loop immediately |
| **`continue`** | Skips the current iteration and moves to the next |
| **Infinite loop** | A loop that never ends — avoid unless intentional |
| **`length` property** | Strings have a `.length` that returns the number of characters |
| **Zero-indexed** | Strings start at position `0`, so the last index is `length - 1` |
| **`.charAt(i)`** | Returns the character at position `i` in a string |

---

## 14. Coming Up Next (Day 06)

Day 06 will begin the **real coding** part of the course. So far you've built up the fundamentals:

**Variables → Operators → Conditions → Loops → Functions (next)**

We'll use everything learned so far to **build functionality with functions**. After that, Day 07 closes out **Module 1** with a small project that ties it all together.

---

## 15. Tasks

Tasks for this session can be found at:

```
https://github.com/tapascript/40-days-of-javascript
→ Day 05 → task.md
```

### Sample Task — Star Pyramid

Using **nested loops**, print a pyramid / triangle pattern like:

```
*
* *
* * *
* * * *
```

- Line 1 → 1 star
- Line 2 → 2 stars
- Line 3 → 3 stars
- Line 4 → 4 stars

> **Hint:** Use one outer loop for the rows and one inner loop for the stars per row.

### Submission Rules

- Submit completed tasks on the **40 Days of JavaScript Discord server** under `#task-assignments`.
- **Do NOT use ChatGPT or any other AI tool** to solve tasks — it defeats the purpose. You're cheating yourself out of learning.
- If stuck, **come to Discord and discuss**. Peer learning is encouraged; shortcuts are not.
- Have patience. Practice. You will win.