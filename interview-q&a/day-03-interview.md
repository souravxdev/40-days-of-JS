# Day 03 — Interview Questions & Answers

**Topic:** Operators, Expressions, Type Coercion, and Precedence

---

## Q1. What's the difference between `==` and `===`? Which should you always use?

**Answer:** The **single most asked JavaScript interview question**.

- **`==` (loose/abstract equality)** — Performs **type coercion** before comparison. Converts both operands to a common type.
- **`===` (strict equality)** — Compares **value AND type**. No coercion.

```javascript
0   == false      // true   (boolean → number: false → 0)
""  == false      // true   (both coerce to 0)
"3" == 3          // true   (string → number)
null == undefined // true   (special case)
1   == "1"        // true

0   === false     // false
"3" === 3         // false
null === undefined // false
```

**Always use `===`** in production code. The only common exception is `x == null`, which conveniently checks for **both `null` and `undefined`** in one shot.

> **Why `==` is dangerous:** An API may return `3` (number) while an HTML input returns `"3"` (string). `==` hides this bug; `===` surfaces it.

---

## Q2. Explain type coercion in JavaScript with examples.

**Answer:** **Type coercion** is JavaScript's automatic conversion of a value from one type to another. There are two kinds:

### 1. Implicit Coercion (done by the engine)
```javascript
"5" + 1       // "51"   (+ with string → string concatenation)
"5" - 1       // 4      (- forces numeric conversion)
"5" * "2"     // 10
true + 1      // 2      (true → 1)
null + 1      // 1      (null → 0)
undefined + 1 // NaN    (undefined → NaN)
[] + []       // ""     (arrays → empty strings)
[] + {}       // "[object Object]"
```

### 2. Explicit Coercion (done by the developer)
```javascript
Number("42")    // 42
String(42)      // "42"
Boolean(0)      // false
parseInt("3px") // 3
+"42"           // 42  (unary plus)
```

**Falsy values in JS (memorize these 7):**
`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

Everything else is **truthy** — including `"false"`, `"0"`, `[]`, `{}`.

---

## Q3. Explain `&&`, `||`, and `??`. When would you use `??` over `||`?

**Answer:**

| Operator | Returns | Checks |
|----------|---------|--------|
| `a && b` | First **falsy**, else last | Truthiness |
| `a \|\| b` | First **truthy**, else last | Truthiness |
| `a ?? b` | First if **not null/undefined**, else `b` | Nullishness |

**Why `??` exists:** `||` treats `0`, `""`, and `false` as "missing" — which breaks when those are **valid** values.

```javascript
// Problem with ||
const volume = userVolume || 50;  // if userVolume is 0, defaults to 50 — WRONG

// Solution with ??
const volume = userVolume ?? 50;  // only defaults if userVolume is null/undefined
```

**Real-world scenarios for `??`:**
- User preferences where `0` is a valid value (volume, brightness)
- Checking if a DB lookup returned a result
- Form inputs where `""` is valid (empty comment, search query)

> **Introduced:** `??` came in **ES2020**. Combined with optional chaining (`?.`) and logical assignment (`??=`).

---

## Q4. What's the difference between `x++` and `++x`?

**Answer:**

- **`x++` (post-increment)** → returns the **current value**, *then* increments.
- **`++x` (pre-increment)** → increments *first*, then returns the **new value**.

```javascript
let x = 5;
console.log(x++);  // 5  (returns old value, then x becomes 6)
console.log(x);    // 6

let y = 5;
console.log(++y);  // 6  (increments first, then returns)
console.log(y);    // 6
```

**Tricky question:**
```javascript
let a = 5;
let b = a++ + ++a;  // ?
```
- `a++` → returns `5`, `a` becomes `6`
- `++a` → `a` becomes `7`, returns `7`
- `b = 5 + 7 = 12`, final `a = 7`

> **Best practice:** Avoid using `++`/`--` inside complex expressions. Separate into clear statements.

---

## Q5. What does `typeof` return for various values? What's the known bug?

**Answer:**

| Value | `typeof` Result |
|-------|----------------|
| `"hello"` | `"string"` |
| `42`, `NaN`, `Infinity` | `"number"` |
| `42n` | `"bigint"` |
| `true` / `false` | `"boolean"` |
| `undefined` | `"undefined"` |
| `Symbol()` | `"symbol"` |
| `function(){}` | `"function"` |
| `{}` | `"object"` |
| `[]` | `"object"` ← not `"array"`! |
| **`null`** | **`"object"`** ← **known bug** |

**Correctly check for array:**
```javascript
Array.isArray([1, 2, 3])  // true
```

**Correctly check for null:**
```javascript
value === null
```

---

## Q6. What's operator precedence? Walk through `1 + 2 * 3 - 4 / 2`.

**Answer:** **Operator precedence** determines the order in which operators are evaluated when multiple are present. Higher-precedence operators bind tighter.

**Partial precedence table (high to low):**

| Precedence | Operator | Example |
|-----------|----------|---------|
| 20 | `()` grouping | `(a + b)` |
| 17 | `.`, `[]`, function call | `obj.prop` |
| 15 | `++`, `--` (postfix) | `x++` |
| 14 | `!`, `typeof`, unary `-/+` | `!flag` |
| 13 | `**` | `2 ** 3` |
| 12 | `*`, `/`, `%` | `a * b` |
| 11 | `+`, `-` (binary) | `a + b` |
| 9 | `<`, `<=`, `>`, `>=` | `a < b` |
| 8 | `==`, `===`, `!=`, `!==` | `a === b` |
| 4 | `&&` | `a && b` |
| 3 | `\|\|`, `??` | `a \|\| b` |
| 2 | `? :` ternary | `a ? b : c` |
| 1 | `=`, `+=`, etc. | `a = 5` |

**Walkthrough of `1 + 2 * 3 - 4 / 2`:**
- `*` and `/` have equal, higher precedence than `+/-`
- `2 * 3 = 6`, `4 / 2 = 2`
- Expression becomes `1 + 6 - 2`
- `+` and `-` are left-associative → `(1 + 6) - 2 = 5`

**Always use parentheses** when in doubt — they make intent explicit and are free at runtime.

---

## Q7. Explain the ternary operator. When should you NOT use it?

**Answer:**

```javascript
const result = condition ? valueIfTrue : valueIfFalse;
```

**Good use:**
```javascript
const label = isLoggedIn ? "Logout" : "Login";
const discount = isPremium ? 0.2 : 0.05;
```

**Don't use when:**
1. **Nested** — quickly becomes unreadable.
   ```javascript
   // ❌ Bad
   const msg = a ? b ? "both" : "just a" : c ? "just c" : "neither";
   ```
2. **Side effects** — ternary is an *expression*, not a statement. Avoid:
   ```javascript
   // ❌ Bad
   isActive ? user.login() : user.logout();
   // ✅ Better
   if (isActive) user.login(); else user.logout();
   ```
3. **Long branches** — if each branch is complex, prefer `if/else`.

> **Rule of thumb:** Ternary is for **returning values**. `if/else` is for **running actions**.

---

## Q8. What's the `%` (modulo) operator used for in real code?

**Answer:** Returns the **remainder** of integer division. Common industry use cases:

1. **Check even/odd:**
   ```javascript
   if (n % 2 === 0) console.log("even");
   ```
2. **Run something every N iterations:**
   ```javascript
   if (i % 10 === 0) saveProgress();   // every 10 steps
   ```
3. **Cycle through a fixed array (wrap-around):**
   ```javascript
   const colors = ["red", "green", "blue"];
   const color = colors[i % colors.length];
   ```
4. **Convert total seconds to minutes/seconds:**
   ```javascript
   const minutes = Math.floor(total / 60);
   const seconds = total % 60;
   ```
5. **Zebra-striping table rows** (odd vs even styling).

> **Note:** `%` uses **truncated division**, so signs follow the dividend: `-7 % 3 === -1` (not `2`). For mathematical modulo, use `((n % m) + m) % m`.

---

## Q9. Explain bitwise operators. Give a real-world use case.

**Answer:** Bitwise operators treat operands as **32-bit signed integers** and operate bit by bit.

| Operator | Name | Example (9 = `1001`, 15 = `1111`) |
|----------|------|-----------------------------------|
| `&` | AND | `15 & 9 = 9` |
| `\|` | OR | `15 \| 9 = 15` |
| `^` | XOR | `15 ^ 9 = 6` |
| `~` | NOT | `~9 = -10` |
| `<<` | Left shift | `9 << 2 = 36` |
| `>>` | Signed right shift | `9 >> 2 = 2` |
| `>>>` | Unsigned right shift | `-1 >>> 0 = 4294967295` |

**Real-world uses:**
1. **Feature flags / permission masks** — Encode multiple booleans into one integer.
   ```javascript
   const READ = 1, WRITE = 2, DELETE = 4;
   const permissions = READ | WRITE;        // 3
   const canWrite = (permissions & WRITE) !== 0;  // true
   ```
2. **Fast integer math** — `n << 1` = multiply by 2; `n >> 1` = divide by 2.
3. **Color manipulation** — Extract R/G/B from a hex integer.
4. **`Math.floor` for positives** — `(7.8 | 0) === 7` (faster for small ints).

---

## Q10. Bonus — Predict the output.

```javascript
console.log([] + []);            // ?
console.log([] + {});            // ?
console.log({} + []);            // ?
console.log(true + "1");         // ?
console.log(1 + null);           // ?
console.log(1 + undefined);      // ?
console.log("5" - "2");          // ?
console.log("5" + - "2");        // ?
```

**Answers:**

```
""                     (both arrays coerce to "")
"[object Object]"      ([]→"", {}→"[object Object]")
"[object Object]"      (context dependent; as expression → same)
"true1"                (boolean → string, then concat)
1                      (null → 0)
NaN                    (undefined → NaN)
3                      (both strings → numbers, subtraction)
"5-2"                  ("5" + (-"2")) → "5" + -2 → "5-2"
```

> **Takeaway:** When in doubt, **prefer explicit conversion** (`Number(x)`, `String(x)`) over relying on implicit coercion.
