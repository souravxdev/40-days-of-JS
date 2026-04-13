# Day 03: Operators & Expressions in JavaScript

## Operands, Operators, and Expressions

Before diving into operator types, it is important to understand the three core terms used throughout this session.

### Operator

An **operator** is a symbol that you apply on something to carry out a calculation or operation.

| Symbol | Operation |
|--------|-----------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |

### Operand

An **operand** is the actual value (or variable) on which the operator works.

```javascript
x + y
```

Here, `+` is the **operator** and `x` and `y` are the **operands**.

### Expression

An **expression** is something that **resolves to a single value**. There are two types of expressions:

| Type | Description | Example |
|------|-------------|---------|
| **Assignment Expression** | Assigning a value to a variable | `let x = 2;` → `x` resolves to `2` |
| **Evaluating Expression** | Using operands and operators to produce a new value | `3 + 4` → resolves to `7` |

In real programming, both types are often combined:

```javascript
let x = 4 + 5;
// operands: 4 and 5
// operator: +
// result: 9 is assigned to x
// the entire thing is one expression
```

---

## Overview of Operator Types

JavaScript provides many different categories of operators:

| # | Operator Type | Purpose |
|---|---------------|---------|
| 1 | **Arithmetic** | Perform mathematical calculations |
| 2 | **Assignment** | Assign values to variables |
| 3 | **Comparison** | Compare two values — returns a Boolean |
| 4 | **Logical** | Combine or invert Boolean/truthy expressions |
| 5 | **Conditional (Ternary)** | Shorthand for simple if/else decisions |
| 6 | **Bitwise** | Operate directly on binary (bit-level) representations |
| 7 | **Relational** | Check relationships between objects (e.g. `in`, `instanceof`) |
| 8 | **Grouping** | Control operator precedence using parentheses |
| 9 | **`typeof`** | Determine the data type of a value |
| 10 | **`instanceof`** | Check if an object is an instance of a specific type |

---

## 1. Arithmetic Operators

Arithmetic operators take **numeric values as operands** and return a single numeric result.

### Basic Arithmetic

```javascript
let a = 10;
let b = 20;

console.log(a + b);  // 30  → Addition
console.log(a - b);  // -10 → Subtraction
console.log(b - a);  // 10
console.log(a * b);  // 200 → Multiplication
console.log(a / b);  // 0.5 → Division
```

### String Concatenation with `+`

If both operands are strings, the `+` operator **concatenates** them instead of adding:

```javascript
let firstName = "Tapas";
let lastName  = "Adhikari";

console.log(firstName + lastName); // "TapasAdhikari"
```

> **Note:** Using `+` for string concatenation is **discouraged** in modern JavaScript. The preferred approach is **Template Literals**, which will be covered in a future session.

### Exponentiation Operator `**`

The `**` operator raises the left operand to the power of the right operand — equivalent to "to the power of" in mathematics.

```javascript
console.log(2 ** 3); // 8  → 2³ = 2 × 2 × 2
console.log(10 ** 20); // 1e+20
```

### Remainder (Modulo) Operator `%`

The `%` operator returns the **remainder** after integer division. It does **not** calculate a percentage.

```javascript
// 12 ÷ 5 = 2 remainder 2  (5×2=10, 12-10=2)
console.log(12 % 5); // 2
```

**Step-by-step:**
- 5 × 1 = 5
- 5 × 2 = 10
- 5 × 3 = 15 (exceeds 12, stop here)
- 12 − 10 = **2** → remainder is 2

### Increment Operators `++`

The `++` operator increases a value by 1. It has two forms depending on *where* you place it:

#### Post-Increment (`count++`)

**Returns the current value first, then increments.**

```javascript
let count = 5;
console.log(count++); // 5 ← returns FIRST, then increments
console.log(count);   // 6 ← now it's incremented
```

#### Pre-Increment (`++count`)

**Increments first, then returns the new value.**

```javascript
let count = 5;
console.log(count++); // 5
console.log(count);   // 6
console.log(++count); // 7 ← increments first, THEN returns
```

> **Interview Tip:** Post-increment → *return first, increment later*. Pre-increment → *increment first, return after*.

### Decrement Operators `--`

Exactly like increment but subtracts 1:

```javascript
let count = 5;
console.log(count--); // 5 ← returns 5, then decrements to 4
console.log(count);   // 4
console.log(--count); // 3 ← decrements first to 3, then returns 3
```

Output sequence: `5 → 4 → 3`

---

## 2. Assignment Operators

Assignment operators are used to **assign (or update) values** stored in variables.

### Basic Assignment

```javascript
let x = 10; // assigns value 10 to x
```

### Compound Assignment Shorthand

Instead of writing `x = x + 5`, JavaScript provides convenient shorthand forms:

| Shorthand | Equivalent Long Form | Example (x starts at 10) |
|-----------|---------------------|--------------------------|
| `x += 5`  | `x = x + 5`  | x → 15 |
| `x -= 3`  | `x = x - 3`  | x → 12 (after the above) |
| `x *= 2`  | `x = x * 2`  | x → 24 (after the above) |
| `x /= 4`  | `x = x / 4`  | x → 6 (after the above) |

```javascript
let x = 10;

x += 5;  // x is now 15
x -= 3;  // x is now 12  (uses the UPDATED x = 15)
x *= 2;  // x is now 24  (uses the UPDATED x = 12)
x /= 4;  // x is now 6   (uses the UPDATED x = 24)
```

> **Important:** Each operation uses the **current value** of `x`, not the original. The value of `x` evolves with each line.

---

## 3. Comparison Operators

Comparison operators compare two values and **always return a Boolean** (`true` or `false`).

### i. Equality: Loose (`==`) vs. Strict (`===`)

JavaScript provides two sets of equality operators. Understanding the difference is critical.

#### a. Loose Equality `==` (Avoid Using)

The `==` operator performs **type coercion** — it automatically converts operands to a "nearest possible type" before comparing.

```javascript
console.log(0 == false);   // true  ← WEIRD! 0 is a Number, false is a Boolean
console.log(3 == "3");     // true  ← WEIRD! 3 is a Number, "3" is a String
```

**Why this is dangerous:** Your API may return the number `3` while your input box returns the string `"3"`. Using `==` would mistakenly tell you they are the same.

#### b. Strict Equality `===` (Always Use This)

The `===` operator checks **both value AND type**. No coercion happens.

```javascript
console.log(3 === "3");    // false ← different types, immediately false
console.log(3 === 3);      // true  ← same value, same type
```

### Strict Equality Rules (Important to Memorise)

| Rule | Behaviour | Example |
|------|-----------|---------|
| Different types | Always `false` | `3 === "3"` → `false` |
| Both `null` | `true` | `null === null` → `true` |
| Both `undefined` | `true` | `undefined === undefined` → `true` |
| Either operand is `NaN` | Always `false` | `NaN === NaN` → `false` |
| Two objects with same data | `false` | `{name:"x"} === {name:"x"}` → `false` |

### Why Two Objects with the Same Data Are Not Equal

Objects are stored in **Heap memory**, and variables hold a **reference (memory address)**, not the actual value.

```javascript
let obj1 = { name: "TapasScript" };
let obj2 = { name: "TapasScript" };

console.log(obj1 === obj2); // false
console.log(obj1.name === obj2.name); // True
```

- `obj1` points to memory address `XX11`
- `obj2` points to memory address `YY22`
- Even though both addresses **contain** the same value, the **addresses themselves** are different
- Strict equality compares these addresses — and they don't match


### ii. Not-Equal Operators

| Operator | Type | Behaviour |
|----------|------|-----------|
| `!=` | Loose not-equal | Coerces types before comparing — **avoid** |
| `!==` | Strict not-equal | Checks both value AND type — **always use this** |

```javascript
console.log(3 !== "3");   // true  ← different types, so NOT equal
console.log(3 !== 3);     // false ← same type and value, so they ARE equal
```

### iii. Relational Comparison Operators

```javascript
console.log(4 > 3);    // true
console.log(1 > 7);    // false
console.log(2 >= 4);   // false
console.log(2 >= 2);   // true  ← equal satisfies >=
console.log(4 < 3);    // false
console.log(2 < 7);    // true
console.log(3 <= 9);   // true
```

> **Common Mistake:** `=>` is **not** "greater than or equal to". That is `>=`. The `=>` symbol is the **arrow function** syntax and will be covered in the functions session.

---

## 4. Logical Operators

Logical operators are used to **combine expressions**. While they are often used with Boolean values, they work with any value in JavaScript.

### i. Logical AND `&&`

**Rule:** If the **first operand can be converted to `false`**, return the first operand. Otherwise, return the second operand.

```javascript
console.log(false && false); // false ← first is false → return first
console.log(true  && false); // false ← first is true, cannot convert to false → return second (false)
console.log(true  && true);  // true  ← first is true → return second (true)
console.log(false && true);  // false ← first is false → return first (false)
```

**Shortcut to remember:** If **any** operand is `false`, the result is `false`. Only when **both** are `true` will the result be `true`.

#### `&&` with Non-Boolean Values

```javascript
console.log("cow" && "horse"); // "horse"
// "cow" is a truthy value (not zero, not false, not empty string)
// so it CANNOT be converted to false → return second operand
```

#### `&&` with Expressions

```javascript
console.log(4 > 5 && 4 === 6);
// 4 > 5  → false
// 4 === 6 → false
// false && false → false
```

### ii. Logical OR `||`

**Rule:** If the **first operand can be converted to `true`**, return the first operand. Otherwise, return the second operand.

```javascript
console.log(false || false); // false ← first cannot be true → return second
console.log(true  || false); // true  ← first is true → return first
console.log(true  || true);  // true  ← first is true → return first
console.log(false || true);  // true  ← first cannot be true → return second
```

**Shortcut to remember:** If **any** operand is `true`, the result is `true`. Only when **both** are `false` will the result be `false`.

#### `||` with Non-Boolean Values

```javascript
console.log("cow" || "horse"); // "cow"
// "cow" is truthy → it CAN be converted to true → return FIRST operand
```

### iii. Logical NOT `!`

Negates (flips) the Boolean value of the operand.

```javascript
console.log(!true);  // false
console.log(!false); // true
```

### iv. Nullish Coalescing Operator `??`

**Rule:** If the **first operand is `null` or `undefined`**, return the second operand. Otherwise, return the first operand.

```javascript
let a1 = null      ?? 1;         // 1         ← first is null → return second
let a2 = undefined ?? 3;         // 3         ← first is undefined → return second
let a3 = false     ?? "tapas";   // false     ← first is NOT null/undefined → return first
let a4 = 0         ?? "tapas";   // 0         ← first is NOT null/undefined → return first
```

> **Key Difference from `||`:** `||` checks for **falsy** values (which includes `0`, `false`, `""`). `??` checks **only** for `null` or `undefined`. This makes `??` safer when `0` or `false` are valid expected values.

**Practical use case:**
```javascript
// Check if a database connection was established
// if null/undefined (not established), use a fallback
const connection = getDbConnection() ?? "No connection available";
```

---

## 5. Conditional (Ternary) Operator

The conditional ternary operator is a compact alternative to a simple `if/else` statement. It operates on a **condition**.

### Syntax

```
condition ? valueIfTrue : valueIfFalse
```

- The `condition` **must evaluate to a Boolean** (`true` or `false`)
- If the condition is `true` → the **first** value (after `?`) is returned
- If the condition is `false` → the **second** value (after `:`) is returned

### Example

```javascript
let age = 23;
let status = age >= 60 ? "Senior Citizen" : "Non-Senior Citizen";

console.log(status); // "Non-Senior Citizen"
// because 23 >= 60 is false → the second value is returned
```

> The ternary operator will be used **extensively** in real programming. Practice it well.

---

## 6. Bitwise Operators

Bitwise operators treat their operands as **32-bit binary numbers (sequences of 0s and 1s)** and perform operations at the bit level.

### Understanding Decimal ↔ Binary Conversion

**Decimal to Binary (repeated division by 2):**

```
15 ÷ 2 = 7, remainder 1
 7 ÷ 2 = 3, remainder 1
 3 ÷ 2 = 1, remainder 1
         → remainders bottom-up: 1111

9 ÷ 2 = 4, remainder 1
4 ÷ 2 = 2, remainder 0
2 ÷ 2 = 1, remainder 0
        → remainders bottom-up: 1001
```

**Binary to Decimal (positional powers of 2):**

```
1001 = (1 × 2³) + (0 × 2²) + (0 × 2¹) + (1 × 2⁰)
     = 8 + 0 + 0 + 1
     = 9
```

### Bitwise AND `&`

Compares each bit pair — returns `1` only when **both bits are 1**.

```
15  =  1 1 1 1
 9  =  1 0 0 1
       -------
&   =  1 0 0 1  →  decimal 9
```

```javascript
console.log(15 & 9); // 9
```

### Bitwise OR `|`

Returns `1` when **at least one** of the bit pair is `1`.

```
15  =  1 1 1 1
 9  =  1 0 0 1
       -------
|   =  1 1 1 1  →  decimal 15
```

```javascript
console.log(15 | 9); // 15
```

### Bitwise XOR `^`

Returns `1` only when **exactly one** of the bit pair is `1` (not both, not neither).

```
15  =  1 1 1 1
 9  =  1 0 0 1
       -------
^   =  0 1 1 0  →  decimal 6
```

```javascript
console.log(15 ^ 9); // 6
```

**XOR 0+1=1 Conversion:**
```
0110 = (0×2³) + (1×2²) + (1×2¹) + (0×2⁰)
     = 0 + 4 + 2 + 0 = 6
```

### Left Shift `<<`

Shifts all bits to the **left** by the specified number of positions. The vacated positions on the right are filled with `0`.

```javascript
// 9 in binary: 1001
// Shift left by 2: 100100
// = 1×2⁵ + 0×2⁴ + 0×2³ + 1×2² + 0×2¹ + 0×2⁰
// = 32 + 0 + 0 + 4 + 0 + 0 = 36

console.log(9 << 2); // 36
```

### Right Shift `>>`

Shifts all bits to the **right** by the specified number of positions.

```javascript
// 9 in binary: 1001
// Shift right by 2: 0010
// = 2 in decimal

console.log(9 >> 2); // 2
```

### Summary of Bitwise Operators

| Operator | Symbol | Rule |
|----------|--------|------|
| AND | `&` | 1 only when both bits are 1 |
| OR | `\|` | 1 when at least one bit is 1 |
| XOR | `^` | 1 only when exactly one bit is 1 |
| NOT | `~` | Flips all bits |
| Left Shift | `<<` | Shifts bits left, fills right with 0s |
| Right Shift | `>>` | Shifts bits right |

---

## 7. Relational Operators

Relational operators check the relationship between objects.

### The `in` Keyword

Checks if a **property exists** in an object.

```javascript
// "propertyName" in object → true or false
```

> This will be taught properly in the **Objects** session. It is listed here for awareness.

### The `instanceof` Operator

Checks if an object is an **instance of a specific object type** (class/constructor).

```javascript
// syntax: object instanceof ObjectType

// Example concept:
// BMW instanceof Car → true  (BMW was created from Car type)
// Fish instanceof Car → false (Fish was not created from Car type)
```

> `instanceof` will be covered in full detail during the **Objects and Prototypes** session.

---

## 8. Grouping and Operator Precedence

### What is Operator Precedence?

When multiple operators are used in the same expression, JavaScript follows a **precedence order** to decide which operation to perform first — similar to the **BODMAS** rule in mathematics.

> Multiplication (`*`) has a **higher precedence** than addition (`+`).

```javascript
let p = 1;
let q = 2;
let r = 3;

console.log(p + q * r);  // 7
// Evaluated as: p + (q * r) = 1 + (2 × 3) = 1 + 6 = 7
```

### The Grouping Operator `()`

Parentheses allow you to **override default precedence**. Whatever is inside `()` is evaluated **first**.

```javascript
console.log(p + q * r);      // 7 → default: multiplication first
console.log((p + q) * r);    // 9 → grouping: addition first → (1+2) × 3 = 9
```

> **Rule:** Anything inside parentheses gets the **highest precedence** regardless of the operators involved.

---

## 9. `typeof` Operator

The `typeof` operator returns a **string** that indicates the data type of a given operand. It takes only **one operand** (a unary operator).

### Syntax

```javascript
typeof operand
```

### Examples

```javascript
console.log(typeof "tapas");    // "string"
console.log(typeof false);      // "boolean"
console.log(typeof 100);        // "number"
console.log(typeof {});         // "object"
console.log(typeof function(){}); // "function"
```

### Special Cases

```javascript
let numbers = [1, 2, 3, 4];
console.log(typeof numbers); // "object"
// Arrays in JavaScript are a type of object — typeof returns "object" for arrays
```

```javascript
console.log(typeof null); // "object"
// This is a KNOWN BUG in JavaScript
// null is not actually an object, but typeof null returns "object"
// It was never fixed because existing applications rely on this behaviour
```

### `typeof` Return Values Summary

| Value | `typeof` result |
|-------|----------------|
| `"hello"` | `"string"` |
| `42` | `"number"` |
| `true` / `false` | `"boolean"` |
| `undefined` | `"undefined"` |
| `null` | `"object"` ← (known bug) |
| `{}` | `"object"` |
| `[1,2,3]` | `"object"` ← arrays are objects |
| `function(){}` | `"function"` |

---

## 12. Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Operator** | A symbol that performs an operation on operands |
| **Operand** | The value(s) on which an operator acts |
| **Expression** | Any code that resolves to a single value |
| **Arithmetic Operators** | `+`, `-`, `*`, `/`, `**`, `%`, `++`, `--` — work on numbers |
| **Post-Increment `x++`** | Returns value FIRST, then increments |
| **Pre-Increment `++x`** | Increments FIRST, then returns |
| **Assignment Shorthand** | `+=`, `-=`, `*=`, `/=` — compact update syntax |
| **Loose Equality `==`** | Coerces types — **never use** |
| **Strict Equality `===`** | Checks value AND type — **always use** |
| **Logical AND `&&`** | Returns first falsy operand, or last operand if all truthy |
| **Logical OR `\|\|`** | Returns first truthy operand, or last operand if all falsy |
| **Nullish Coalescing `??`** | Returns second operand only if first is `null` or `undefined` |
| **Ternary Operator** | `condition ? trueValue : falseValue` — compact if/else |
| **Bitwise Operators** | Operate on 32-bit binary representations of numbers |
| **Grouping `()`** | Forces highest evaluation precedence inside parentheses |
| **`typeof`** | Returns a string describing the type of a value |
| **`typeof null`** | Returns `"object"` — this is a known JavaScript bug |
| **`instanceof`** | Checks if an object was created from a specific type — covered in Objects session |

---

## 13. Coming Up Next (Day 04)

Day 04 will build directly on what we learned today. We will step into **logic building with conditions**:

- `if` / `else` statements
- `switch` / `case`
- Real-world use cases using the operators we mastered here

Every session builds on the previous one. Operators → Conditions → Loops → Functions. Stay consistent.

---

## 14. Tasks

Tasks for this session can be found at:

```
https://github.com/tapascript/40-days-of-javascript
→ Day 03 → task.md
```

- Tasks cover all operator types from this session
- Some tasks combine **multiple operators** to test deeper understanding
- Submit completed tasks on the **40 Days of JavaScript Discord server** under `#task-assignments`
