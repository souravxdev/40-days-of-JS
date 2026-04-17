# Day 04 — Interview Questions & Answers

**Topic:** Control Flow, `if/else`, `switch/case`, and Decision Logic

---

## Q1. What is control flow in JavaScript?

**Answer:** **Control flow** is the order in which statements, expressions, or function calls in a program are executed. By default, JavaScript executes code **top-to-bottom, line-by-line**. Control flow constructs let you **deviate** from that default:

- **Conditional statements** — `if`, `else`, `else if`, `switch`
- **Loops** — `for`, `while`, `do...while`, `for...of`, `for...in`
- **Jump statements** — `break`, `continue`, `return`, `throw`
- **Error handling** — `try/catch/finally`

Control flow is the **foundation of logic building** — without it, programs would be static scripts that always do the same thing.

---

## Q2. What's the difference between using multiple independent `if` statements vs an `if/else if` chain?

**Answer:** This is a **subtle but high-value** interview question.

- **Independent `if` blocks** → **every** condition is evaluated, and **multiple** blocks can run.
- **`if/else if` chain** → once a condition matches, the **rest are skipped** (early exit).

```javascript
// Independent — all three checked
const x = 10;
if (x > 0)  console.log("positive");    // runs
if (x > 5)  console.log("greater than 5"); // runs
if (x > 8)  console.log("greater than 8"); // runs
// Output: all three

// Chain — only first match runs
if (x > 0) {
  console.log("positive");
} else if (x > 5) {
  console.log("greater than 5");  // skipped
} else if (x > 8) {
  console.log("greater than 8");  // skipped
}
// Output: "positive"
```

**When to use which:**
- **Chain** → mutually exclusive conditions (grade ranges, status classifications).
- **Independent** → when multiple conditions legitimately apply (validation errors — collect all, not just the first).

**Performance:** Chains short-circuit — faster when the first case is most likely. Order conditions by likelihood (most common first) for best performance.

---

## Q3. When should you use `switch/case` instead of `if/else if`?

**Answer:**

| Factor | `if/else if` | `switch/case` |
|--------|--------------|---------------|
| **Condition type** | Any (ranges, complex logic) | Discrete equality checks only |
| **Readability** | Messy with many branches | Clean for many discrete values |
| **Performance** | Sequential O(n) | Can be O(1) via **jump table** optimization |
| **Comparison operator** | Whatever you write | **Strict `===`** |
| **Fall-through** | Not applicable | Supported (and dangerous) |

**Use `switch` when:**
- Matching a **single value** against many discrete options (HTTP status codes, user roles, action types).
- Writing a **reducer** (Redux-style state management).
- Parsing tokens or command routers.

**Use `if/else` when:**
- You need **ranges** (`score >= 80 && score < 90`).
- You need **combined logical conditions** (`user.isAdmin && isFeatureEnabled`).
- Only 2-3 branches total — `switch` adds boilerplate.

> **Industry reality:** Modern engines optimize long `if/else if` chains reasonably well. Choose based on **readability first**, performance second.

---

## Q4. What is fall-through in `switch/case`? Give a real-world use.

**Answer:** **Fall-through** happens when you *omit* `break` — execution continues into the next case(s) until it hits a `break`, `return`, or the end of the switch.

```javascript
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;
}
```

**Real-world uses:**
1. **Grouping multiple inputs** to the same output (days of week, HTTP status categories, role hierarchies).
2. **Redux reducers** handling multiple related actions identically.
3. **Finite state machines** where multiple states share the same transition.

> **Warning:** **Unintentional fall-through** is a classic bug. Linters like ESLint flag it as `no-fallthrough`. Many style guides require explicit comments: `// falls through` when intentional.

---

## Q5. What's a "jump table" and how does `switch` use it?

**Answer:** A **jump table** is a compiler optimization where instead of linearly checking each case, the engine builds an **indexed lookup table** that maps case values directly to code addresses.

**`if/else if` chain:**
```
if (x === 1) { ... }      // check 1
else if (x === 2) { ... } // check 2
...
else if (x === 100) {...} // check 100 — O(n) in worst case
```

**`switch` with jump table (when values are small integers):**
```
jumpTable[x]()   // O(1) direct lookup
```

**Requirements for V8 to emit a jump table:**
- Dense range of small integers as case values.
- Consistent type (avoids deopt).

**Takeaway:** For **many discrete numeric cases**, `switch` can be significantly faster. For 3–4 cases, the difference is negligible.

---

## Q6. Why does `else` always need to be paired with `if`?

**Answer:** Because `else` is a **grammatical continuation** of the `if` statement, not a standalone construct. It defines "what to do when the `if` condition is false" — so without an `if`, it has no condition to negate.

```javascript
// ❌ SyntaxError: Unexpected token 'else'
else {
  console.log("orphan");
}
```

In the AST, an `IfStatement` node has three children: `test`, `consequent`, and optional `alternate` (the `else` branch). `else` cannot exist as its own AST node.

---

## Q7. Should you always use curly braces `{}` for single-line `if` blocks?

**Answer:** **Yes.** Though JS allows omitting them for single statements, **industry style guides (Airbnb, Google, StandardJS) require them**.

**Why:**
1. **Bug prevention** — Adding a second line silently breaks the block:
   ```javascript
   if (isAdmin)
     grantAccess();
     logAction();    // ← ALWAYS runs, even if !isAdmin. Indentation is a lie.
   ```
2. **Consistency** — Easier to read when every block looks the same.
3. **Diff clarity** — Adding a line to a braceless block causes a multi-line diff.
4. **Apple's "goto fail" bug (2014)** — A missing brace in an `if` statement shipped a critical SSL vulnerability in iOS/macOS.

> **Rule:** Always use `{}`. Non-negotiable in team code.

---

## Q8. What's wrong with deeply nested `if/else`? How do you refactor?

**Answer:** Deep nesting (the **"arrow pattern"** or **"pyramid of doom"**) is hard to read, test, and maintain. Each level adds cognitive load.

```javascript
// ❌ Deeply nested
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.user.isVerified) {
        if (order.paymentMethod) {
          // ... actual logic at 4 levels deep
        }
      }
    }
  }
}
```

**Refactoring techniques:**

### 1. Early return (guard clauses) — most impactful
```javascript
function processOrder(order) {
  if (!order) return;
  if (order.items.length === 0) return;
  if (!order.user.isVerified) return;
  if (!order.paymentMethod) return;

  // ... happy path at level 1
}
```

### 2. Extract functions
```javascript
function isValidOrder(order) {
  return order && order.items.length > 0
      && order.user.isVerified && order.paymentMethod;
}
```

### 3. Lookup tables / strategy pattern
```javascript
const handlers = { create: handleCreate, update: handleUpdate, delete: handleDelete };
handlers[action]?.();
```

### 4. Optional chaining + nullish coalescing (ES2020)
```javascript
const city = order?.user?.address?.city ?? "Unknown";
```

---

## Q9. What are truthy and falsy values, and how do they interact with `if`?

**Answer:** JavaScript `if` statements **automatically coerce** the condition to a Boolean. Values that coerce to `false` are **falsy**; all others are **truthy**.

**The 7 falsy values (memorize):**
- `false`
- `0`, `-0`, `0n` (BigInt zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy**, including:
- `"0"`, `"false"` (non-empty strings)
- `[]` (empty array!)
- `{}` (empty object!)
- `function(){}`, `Symbol()`

```javascript
if ([])  console.log("empty array is truthy");   // runs
if ({})  console.log("empty object is truthy");  // runs
if ("0") console.log("string '0' is truthy");    // runs
```

> **Industry tip:** Use `Boolean(x)` or `!!x` to explicitly coerce, and prefer `Array.isArray(arr) && arr.length > 0` over `if (arr)`.

---

## Q10. When should you use the ternary operator vs `if/else`?

**Answer:**

**Use ternary when:**
- **Returning or assigning** a value based on a condition.
  ```javascript
  const role = user.isAdmin ? "admin" : "user";
  return age >= 18 ? "adult" : "minor";
  ```
- Inside **JSX** (React) where you can't use statements.
  ```jsx
  {isLoggedIn ? <Dashboard /> : <Login />}
  ```

**Use `if/else` when:**
- The branches have **side effects** (mutations, API calls, logging).
- Branches are **multi-line** or complex.
- You need **more than 2 outcomes** (`else if` chains).

**Avoid nested ternaries** — rewrite with `if/else` or extract a helper:
```javascript
// ❌ Nested — unreadable
const status = a ? b ? "both" : "only a" : c ? "only c" : "none";

// ✅ Explicit
function getStatus() {
  if (a && b) return "both";
  if (a) return "only a";
  if (c) return "only c";
  return "none";
}
```

---

## Q11. Bonus — What will this print and why?

```javascript
const value = 0;

if (value) {
  console.log("truthy");
} else if (value === false) {
  console.log("explicitly false");
} else if (value == false) {
  console.log("loose equal false");
} else {
  console.log("fell through");
}
```

**Answer:** `"loose equal false"`

- `if (value)` → `0` is **falsy** → skip.
- `value === false` → `0` is not `false` (different types) → skip.
- `value == false` → with coercion, `false → 0`, so `0 == 0` → `true` → **match**.

**Lesson:** This is exactly why `===` should always be preferred.
