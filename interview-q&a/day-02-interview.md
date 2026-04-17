# Day 02 — Interview Questions & Answers

**Topic:** Variables, Data Types, Memory Model, and Pass by Value vs Reference

---

## Q1. What is the difference between `var`, `let`, and `const`? Which should you prefer?

**Answer:** This is the **#1 most asked JavaScript interview question**.

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Redeclaration** | Allowed | Not allowed | Not allowed |
| **Reassignment** | Allowed | Allowed | **Not allowed** |
| **Hoisting** | Hoisted & initialized to `undefined` | Hoisted but in **TDZ** | Hoisted but in **TDZ** |
| **Global `this` binding** | Attaches to `window` | Does NOT attach to `window` | Does NOT attach to `window` |

**Preference order:** `const` > `let` > *avoid* `var`.

- Use **`const` by default** — signals intent that the binding won't change.
- Use **`let`** only when you know the value will be reassigned (loop counters, mutable state).
- Use **`var`** only when maintaining legacy code.

> **Gotcha:** `const` prevents **reassignment of the binding**, not mutation of the value. `const arr = [1,2]; arr.push(3);` is perfectly valid.

---

## Q2. What is the Temporal Dead Zone (TDZ)?

**Answer:** The **Temporal Dead Zone** is the period between when a `let` or `const` variable is **hoisted** and when it is **actually initialized**. Accessing it in that window throws a `ReferenceError`.

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;

console.log(y); // undefined — var is hoisted AND initialized to undefined
var y = 10;
```

**Why TDZ exists:** It prevents bugs where you accidentally use a variable before it's meaningfully defined. It makes `let`/`const` safer than `var`.

---

## Q3. How many primitive data types does JavaScript have? Name them.

**Answer:** JavaScript has **7 primitive** data types:

| # | Type | Example | Notes |
|---|------|---------|-------|
| 1 | **String** | `"hello"` | Immutable sequence of UTF-16 code units |
| 2 | **Number** | `42`, `3.14`, `NaN`, `Infinity` | 64-bit IEEE-754 floating point |
| 3 | **Boolean** | `true`, `false` | |
| 4 | **Undefined** | `undefined` | Variable declared but never assigned |
| 5 | **Null** | `null` | Explicit "no value" |
| 6 | **BigInt** | `9007199254740993n` | Integers beyond `Number.MAX_SAFE_INTEGER` |
| 7 | **Symbol** | `Symbol("id")` | Unique, immutable identifier |

Non-primitives: **Object** (includes Array, Function, Date, Map, Set, etc.).

> **Mnemonic:** *"**SNB** UNBS"* — String, Number, Boolean, Undefined, Null, BigInt, Symbol.

---

## Q4. What's the difference between `null` and `undefined`?

**Answer:**

| Aspect | `undefined` | `null` |
|--------|-------------|--------|
| **Meaning** | "I haven't been assigned a value yet" | "I'm intentionally empty" |
| **Set by** | JavaScript engine (automatic) | Developer (explicit) |
| **`typeof`** | `"undefined"` | `"object"` *(known bug)* |
| **`==` comparison** | `null == undefined` is `true` | Same |
| **`===` comparison** | `null === undefined` is `false` | Same |
| **JSON** | Removed from JSON output | Preserved as `null` |
| **Use case** | Uninitialized variables, missing function args | Clearing a reference, DB "no value" |

```javascript
let a;               // undefined (implicit)
let b = null;        // null (explicit)

console.log(a == b);   // true  (loose equality)
console.log(a === b);  // false (different types)
```

---

## Q5. Explain "Pass by Value" vs "Pass by Reference" in JavaScript.

**Answer:** This is a **critical, high-signal** interview question.

**JavaScript is always "pass by value"** — but for non-primitives, the *value* being passed is a **reference (memory address)**. This is sometimes called **"pass by sharing"** or "pass by value of the reference."

**Primitives (pass by value):**
```javascript
let a = 5;
let b = a;      // b gets a copy of the value 5
b = 10;
console.log(a); // 5  — unchanged
```

**Non-primitives (pass by value-of-reference):**
```javascript
let obj1 = { name: "Alice" };
let obj2 = obj1;       // obj2 gets a copy of the REFERENCE
obj2.name = "Bob";
console.log(obj1.name); // "Bob"  — both point to same heap object

obj2 = { name: "Carol" };  // reassignment: obj2 now points elsewhere
console.log(obj1.name);    // "Bob"  — obj1 unaffected
```

> **Interview trap:** Reassigning `obj2 = {...}` does NOT change `obj1`, because reassignment only changes *which* object `obj2` points to. Mutating properties (`obj2.name = ...`) affects the shared object.

---

## Q6. How is memory allocated in JavaScript? Explain Stack vs Heap.

**Answer:**

- **Stack memory** → Stores **primitive values** and **references (pointers)** to heap objects. Fixed-size, fast access, LIFO (Last-In-First-Out). Function call frames also live here.
- **Heap memory** → Stores **objects, arrays, functions** (anything non-primitive). Dynamic size, slower access, garbage-collected.

```javascript
let age = 25;                       // 25 stored on stack
let user = { name: "Alice" };       // {...} lives on heap
                                    // `user` on stack holds the heap address
```

**Why does this matter?**
- Explains why `===` on two object literals with same data returns `false` — different heap addresses.
- Explains mutation behavior — multiple variables can point to the same heap object.
- Critical for understanding **garbage collection**: when nothing on the stack references a heap object, it becomes eligible for GC (mark-and-sweep algorithm in V8).

---

## Q7. Why does `typeof null` return `"object"`? Is it a bug?

**Answer:** **Yes, it's a historical bug** in JavaScript that was never fixed due to backward compatibility.

In the original JS implementation, values were stored with a **type tag** in their low bits:
- `000` → object
- `1` → integer
- `010` → double
- `100` → string
- `110` → boolean

The `null` value was represented as the **null pointer** (`0x00`), which happened to have the object type tag (`000`). So `typeof null` returned `"object"`.

A fix was proposed for ES6 (making `typeof null === "null"`), but it was rejected because it would break a massive amount of legacy code across the web.

**Workaround for null checks:**
```javascript
function isObject(val) {
  return val !== null && typeof val === "object";
}
```

---

## Q8. What are the rules for naming a valid JavaScript identifier?

**Answer:**
1. Can contain **letters** (`a-z`, `A-Z`), **digits** (`0-9`), `$`, and `_`.
2. **Cannot start with a digit** (e.g., `2morrow` is invalid).
3. **Cannot be a reserved keyword** (`let`, `class`, `return`, etc.).
4. **Case-sensitive** (`name` and `Name` are different).
5. Hyphens (`-`) and spaces are **not allowed**.

**Industry conventions:**
- `camelCase` → variables and functions (`userName`, `getUserData`)
- `PascalCase` → classes and constructors (`UserAccount`)
- `UPPER_SNAKE_CASE` → constants (`MAX_RETRIES`, `API_KEY`)
- `_prefixed` → "private" by convention (`_internalState`)
- `$prefixed` → often used in jQuery / reactive frameworks for DOM elements

---

## Q9. What happens at each phase when JS engine processes `var age = 7;`?

**Answer:**

1. **Tokenizing** — Code is broken into tokens: `var`, `age`, `=`, `7`, `;`.
2. **Parsing** — Tokens form an AST node: `VariableDeclaration` with declarator `age` and initializer `7`.
3. **Creation phase** (hoisting) — `age` is registered in the variable environment and initialized to `undefined`.
4. **Execution phase** — The assignment runs: `age` is updated to `7`.

Had we written `1age = 7`, parsing would fail at step 2 and JavaScript would throw `SyntaxError: Unexpected number`.

---

## Q10. Why do two objects with identical content fail `===`?

**Answer:** Because `===` on non-primitives compares **references (memory addresses)**, not content.

```javascript
const a = { id: 1 };
const b = { id: 1 };
console.log(a === b);         // false — different heap addresses
console.log(a === a);         // true  — same reference
```

**To compare content (shallow):**
```javascript
JSON.stringify(a) === JSON.stringify(b); // true (careful: key order matters)
```

**For deep equality in production**, use:
- `lodash.isEqual(a, b)`
- `Node.js` → `util.isDeepStrictEqual(a, b)`
- Jest → `expect(a).toEqual(b)`

---

## Q11. Bonus — What's the output?

```javascript
let a = 10;
let b = a;
b = 20;

let x = { val: 10 };
let y = x;
y.val = 20;

console.log(a, x.val);
```

**Answer:** `10 20`

- `a` holds a primitive → `b = a` copies the value. Modifying `b` doesn't touch `a`.
- `x` holds a reference to a heap object → `y = x` copies the reference. Both point to the **same object**, so `y.val = 20` mutates that shared object.
