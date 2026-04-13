# Day 04: Control Flow in JavaScript

## What is Control Flow?

JavaScript normally executes code **line by line**, from top to bottom. But in real programs, you often need to **skip certain lines** or **jump to a different section** depending on a condition. This ability to redirect the path of execution is called **Control Flow**.

> **In short:** Control Flow = controlling *which lines* get executed and *in what order*, based on conditions.

### How Control Flow is Achieved

JavaScript provides the following constructs for control flow:

| Construct | Purpose |
|-----------|---------|
| `if` | Execute a block only when a condition is true |
| `if...else` | Execute one block if true, another if false |
| `else if` | Chain multiple conditions |
| `switch...case` | Match a fixed value against multiple cases |
| `break` | Exit out of a switch (or loop) immediately |
| `continue` | Skip the current iteration of a loop *(covered in Loops)* |

---

## 1. `if` and `if...else` — Branching

### The `if` Statement

The `if` keyword takes a **condition** inside parentheses. The condition must evaluate to either `true` or `false` (a Boolean). If the condition is true, the code inside the curly braces runs.

```javascript
if (condition) {
  // code that runs when condition is true
}
```

### The `if...else` Statement

If you also want something to happen when the condition is **not** met, you add an `else` block.

```javascript
if (condition) {
  // runs when condition is TRUE
} else {
  // runs when condition is FALSE
}
```

### Real-World Example — The Bus Analogy

```javascript
let catchingBus = false;

if (catchingBus) {
  console.log("I will reach home on time");
} else {
  console.log("I will be late to reach");
}

// Output: "I will be late to reach"
// Because catchingBus is false, the if block is skipped
// and the else block executes instead.
```

**How JavaScript executes this line by line:**
- Line 1 → variable `catchingBus` is created and assigned `false`
- Line 3 → condition is evaluated: `false` → condition NOT met → skip the `if` block
- Line 5 → `else` block executes → prints the message

This is the essence of **branching** — the execution path splits based on the condition, and only one branch runs.

---

## 2. Practical Example — Voting Eligibility

```javascript
let age = 18;

if (age >= 18) {
  console.log("You are eligible to vote");
} else {
  console.log("You are not eligible to vote");
}
```

**Why `>=` and not `>`?**
Because a person who is *exactly* 18 is also eligible. Using `>` alone would exclude 18-year-olds. The `>=` (greater than or equal to) operator ensures both cases pass.

| `age` value | Condition `age >= 18` | Output |
|-------------|----------------------|--------|
| `18` | `true` (18 equals 18) | "You are eligible to vote" |
| `8` | `false` (8 is not ≥ 18) | "You are not eligible to vote" |

---

## 3. Omitting Curly Braces

JavaScript technically allows you to omit the curly braces `{}` when an `if` or `else` block has **only one statement**:

```javascript
// This works (but is NOT recommended)
if (age >= 18)
  console.log("You are eligible to vote");
else
  console.log("You are not eligible to vote");
```

However, the moment you add a **second statement**, you *must* use curly braces — otherwise only the first line is treated as part of the block.

> ⚠️ **Best Practice:** **Always use curly braces**, even for single-line blocks. This prevents bugs and makes code easier to read and maintain.

---

## 4. Multiple Conditions — `else if` Chain

When you have **more than two possible outcomes**, you chain conditions using `else if`.

### Grading System Example

**Problem:** Given a student's score, determine their grade:
- Score ≥ 90 → Grade A
- Score ≥ 80 → Grade B
- Score ≥ 70 → Grade C
- Anything else → Fail

```javascript
let score = 76;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}

// Output: "Grade C"
```

### Independent `if` Blocks vs. `else if` Chain — What's the Difference?

This is a critical concept for logic building. Consider the value `x = 0`:

**Approach 1 — Independent `if` blocks (all conditions checked):**

```javascript
let x = 0;

if (x === 0)       console.log("zero");
if (x >= 0)        console.log("greater than zero");  // also true for 0!
if (x <= 0)        console.log("less than zero");      // also true for 0!

// Output: "zero", "greater than zero", "less than zero"
// All three conditions are satisfied independently.
```

**Approach 2 — `else if` chain (exits on first match):**

```javascript
let x = 0;

if (x === 0) {
  console.log("zero");
} else if (x > 0) {
  console.log("greater than zero");
} else if (x < 0) {
  console.log("less than zero");
}

// Output: "zero"
// Once the first condition is satisfied, the rest are skipped entirely.
```

### When to Use Which?

| Use Case | Recommendation |
|----------|---------------|
| Conditions are **mutually exclusive** and you want an **early exit** | Use `else if` chain |
| Conditions are **independent** and multiple could be true at once | Use separate `if` blocks |
| You need a **fallback** for when nothing matches | Use `else` at the end |

> **Rule of Thumb:** If your logic has two *sides* to a condition (true path and false path), always stitch them with `else`. If conditions are fully independent, use standalone `if` blocks.

---

## 5. Nesting `if...else`

You can place an `if...else` block **inside** another `if...else` block. This is called **nesting**.

```javascript
let condition      = true;
let innerCondition = false;

if (condition) {
  console.log("outer if");

  if (innerCondition) {
    console.log("inner if");
  } else {
    console.log("inner else");
  }

} else {
  console.log("outer else");
}
```

**Trace through the logic:**

| `condition` | `innerCondition` | Output |
|-------------|-----------------|--------|
| `true`  | `true`  | `"outer if"` → `"inner if"` |
| `true`  | `false` | `"outer if"` → `"inner else"` |
| `false` | *(irrelevant)* | `"outer else"` *(inner block never reached)* |

> If the outer `if` is `false`, the entire inner `if...else` is completely skipped — JavaScript doesn't even evaluate the inner condition.

### Important: `else` Cannot Exist Alone

```javascript
// ❌ This is a SyntaxError
else {
  console.log("I am alone");
}
// Uncaught SyntaxError: Unexpected token 'else'
```

An `else` block **must always** be attached to an `if`. It cannot stand on its own.

---

## 6. `switch...case`

When you have **many conditions to check against a single value**, `switch...case` is cleaner and often more performant than a long `else if` chain.

### Syntax

```javascript
switch (value) {
  case caseValue1:
    // code to run if value === caseValue1
    break;
  case caseValue2:
    // code to run if value === caseValue2
    break;
  default:
    // code to run if no case matches (like the final else)
}
```

- `switch` takes a **value** (not a condition like `if`)
- Each `case` is compared to that value using **strict equality (`===`)**
- `break` exits the switch once a case matches
- `default` is the fallback — runs when no case matches

### Example 1 — Position Number

```javascript
let position = 4;

switch (position) {
  case 1:
    console.log("Print One");
    break;
  case 2:
    console.log("Print Two");
    break;
  case 3:
    console.log("Print Three");
    break;
  case 4:
    console.log("Print Four");
    break;
  default:
    console.log("Nothing is matched");
}

// Output: "Print Four"
```

> ❗ **Without `break`:** Without the `break` keyword, once a matching case is found, JavaScript "falls through" and continues executing all subsequent cases until it hits a `break` or the end of the `switch`. This is usually unintended.

### Example 2 — Day of the Week

```javascript
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

// Output: "Friday"
```

### Example 3 — String Values in Cases

`switch` is not limited to numbers — case values can be **strings, booleans, or any primitive**:

```javascript
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

// Output: "Teaching 40 days of JS"
```

> ⚠️ **Case sensitivity matters:** `"Google"` and `"google"` are **different strings**. If the value is `"google"` (lowercase g), it won't match `case "Google"` and the `default` block will run.

---

## 7. Fall-Through in `switch...case`

**Fall-through** is when you intentionally leave out `break` statements so multiple cases share the same code block.

### Example — City Grouping by Country

```javascript
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

// Output: "All these are in India"
```

**How it works:**
1. `city = "Bangalore"` matches `case "Bangalore"`
2. There is no `break`, so execution **falls through** to `case "Kolkata"` → no `break` → falls through to `"Agra"` → falls through to `"Jaipur"`
3. At `case "Jaipur"`, there is a `console.log` followed by `break`
4. Output is printed and the switch exits — `case "New York"` is never reached

> **Use case:** This pattern is useful when several different input values should produce the same result.

---

## 8. `if...else` vs. `switch...case` — Which to Use?

| Factor | `if...else` | `switch...case` |
|--------|-------------|-----------------|
| **Condition type** | Complex logical conditions (ranges, combinations) | Fixed/discrete values (numbers, strings) |
| **Performance** | Sequential evaluation — slower with many conditions | Uses a **jump table** internally — faster with many cases |
| **Readability** | Can become messy with many `else if` blocks | Very readable when matching against many discrete values |
| **Flexibility** | Can handle ranges like `score >= 80 && score < 90` | Cannot handle ranges directly |

### The Jump Table Advantage

When a `switch` statement is compiled/optimised, the JavaScript engine often creates an internal **jump table** — essentially an indexed lookup of all case values. Instead of checking conditions one-by-one (like `if...else`), it can jump directly to the matching case in near-constant time.

> This makes `switch` significantly faster than a long `if...else if` chain when there are **many conditions to check**.

### Decision Guide

```
Is the condition a RANGE or a COMPLEX LOGICAL expression?
  → YES → Use if...else
  → NO, it's a FIXED DISCRETE VALUE?
        → YES → Use switch...case (especially for many values)
        → Very FEW values? → Either is fine, but if...else is acceptable
```

---

## 9. Ternary Operator (Revisited)

The ternary operator is the **shorthand** for a simple `if...else` with a single statement in each branch.

### Syntax

```
condition ? valueIfTrue : valueIfFalse
```

### Example

```javascript
// Using if...else
let catchingBus = true;
if (catchingBus) {
  console.log("I will reach home on time");
} else {
  console.log("I will be late to reach");
}

// Using ternary — equivalent, shorter
catchingBus
  ? console.log("I will reach home on time")
  : console.log("I will be late to reach");
```

### When NOT to Use the Ternary Operator

Avoid **nesting** ternary operators. If you find yourself writing a ternary inside another ternary, switch back to `if...else` for readability:

```javascript
// ❌ Avoid — hard to read
let result = a ? b ? "both true" : "only a true" : "a is false";

// ✅ Prefer if...else for nested logic
if (a) {
  if (b) {
    result = "both true";
  } else {
    result = "only a true";
  }
} else {
  result = "a is false";
}
```

> **Rule:** Use the ternary operator only for **one level** of `if...else`. Any deeper nesting → use `if...else`.

---

## 10. Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Control Flow** | The ability to redirect code execution based on conditions |
| **`if` statement** | Runs a block only when a condition is `true` |
| **`if...else`** | Runs one block for `true`, another for `false` |
| **`else if` chain** | Handles multiple mutually exclusive conditions with early exit |
| **Independent `if` blocks** | All blocks are checked — multiple can match and run |
| **Curly Braces `{}`** | Always use them — even for single-line blocks |
| **`else` alone** | Invalid — `else` must always be paired with `if` |
| **Nested `if...else`** | You can place `if...else` inside another `if...else` |
| **`switch...case`** | Matches a single value against discrete cases using strict equality |
| **`break` in `switch`** | Exits the switch after a matching case — prevents fall-through |
| **`default` in `switch`** | The fallback block when no case matches (like `else`) |
| **Fall-Through** | Intentionally omitting `break` so multiple cases share one code block |
| **Jump Table** | Internal optimisation `switch` uses for fast case lookup — better than long `if...else if` chains |
| **`if...else` use case** | Complex logical conditions and ranges |
| **`switch` use case** | Matching against fixed discrete values (many possible values) |
| **Ternary Operator** | Shorthand `if...else` — use only for one level of logic |

---

## 11. Coming Up Next (Day 05)

Day 05 will build directly on what we covered today. We move into **Loops**:

- `for` loop
- `while` loop
- `do...while` loop
- `break` and `continue` (revisited in loop context)

Every session builds on the previous: Variables → Operators → **Conditions** → Loops → Functions. Stay consistent.

---

## 12. Tasks

Tasks for this session can be found at:

```
https://github.com/tapascript/40-days-of-javascript
→ Day 04 → task.md
```

- Tasks require applying `if...else`, `switch...case`, and the ternary operator
- Tasks are **more complex** than Day 03 — designed to strengthen logic-building skills
- Submit completed tasks on the **40 Days of JavaScript Discord server** under `#task-assignments`
