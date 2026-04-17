# Day 05 — Interview Questions & Answers

**Topic:** Loops, Iterations, `break`/`continue`, and Performance

---

## Q1. What are the different types of loops in JavaScript, and when would you use each?

**Answer:** JavaScript supports multiple loop constructs. Modern interviews expect you to know them all:

| Loop | Best Use Case |
|------|---------------|
| `for` | Known iteration count, index-based access |
| `while` | Unknown iterations, condition-based exit |
| `do...while` | Guarantees at least one execution |
| `for...of` | Iterate **values** of iterables (arrays, strings, Maps, Sets) |
| `for...in` | Iterate **keys** of an object (use cautiously) |
| `Array.forEach()` | Functional iteration over arrays |
| `Array.map/filter/reduce` | Transformation / aggregation (returns a value) |

```javascript
// for — fixed count
for (let i = 0; i < 5; i++) { /* ... */ }

// while — condition unknown
while (hasMoreData()) { processChunk(); }

// do...while — at least once
do { askForInput(); } while (input !== "quit");

// for...of — values
for (const item of ["a","b","c"]) { /* ... */ }

// for...in — keys (prototype keys too!)
for (const key in obj) { /* ... */ }
```

---

## Q2. Explain the three parts of a `for` loop. What happens in each phase?

**Answer:**
```javascript
for (initialization; condition; update) {
  // body
}
```

**Execution order:**
1. **Initialization** runs **once** before the loop starts (e.g., `let i = 0`).
2. **Condition** is evaluated **before each iteration**. If `true`, body runs. If `false`, loop exits.
3. **Body** executes.
4. **Update** runs **after the body** (e.g., `i++`).
5. Go back to step 2.

**Trace of `for (let i = 0; i < 3; i++) { console.log(i); }`:**
- Init: `i = 0`
- Check `0 < 3` → true → print `0` → update `i = 1`
- Check `1 < 3` → true → print `1` → update `i = 2`
- Check `2 < 3` → true → print `2` → update `i = 3`
- Check `3 < 3` → false → exit.

> **Scope gotcha:** `let i` is block-scoped (new `i` per iteration). `var i` would be function-scoped (shared across iterations — causes closure bugs).

---

## Q3. What's the difference between `break` and `continue`?

**Answer:**

| Keyword | Effect |
|---------|--------|
| `break` | **Exits the entire loop** immediately |
| `continue` | **Skips to the next iteration** |

```javascript
// break — stops at 3
for (let i = 1; i <= 5; i++) {
  if (i === 3) break;
  console.log(i);    // 1, 2
}

// continue — skips 3
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);    // 1, 2, 4, 5
}
```

**Labeled breaks** (rarely used, but asked in interviews):
```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;  // exits BOTH loops
  }
}
```

---

## Q4. What's an infinite loop? How do you accidentally create one?

**Answer:** An **infinite loop** is one whose exit condition never becomes false — it runs forever until the runtime crashes, the tab freezes, or `Ctrl+C` is pressed.

**Common causes:**

1. **Forgotten update:**
   ```javascript
   let i = 0;
   while (i < 10) {
     console.log(i);
     // ❌ forgot i++
   }
   ```

2. **Wrong update direction:**
   ```javascript
   for (let i = 0; i < 10; i--) { /* ... */ }  // i goes negative
   ```

3. **Always-true condition without `break`:**
   ```javascript
   while (true) { /* no break inside */ }
   ```

4. **Floating-point precision issue:**
   ```javascript
   for (let x = 0; x !== 1; x += 0.1) { /* 0.1 + 0.2 ≠ 0.3 */ }
   ```

**Legitimate uses:**
- Event loops in long-running services (with proper `await` inside)
- Game loops
- Retry-until-success patterns (with a cap)

> **Safety net:** Modern browsers detect long-running scripts (~10s) and offer to stop them. Node.js has no such guardrail — a runaway loop can hang a server.

---

## Q5. What's the time complexity of a nested loop? When is it a problem?

**Answer:** A loop inside a loop is **O(n²)** — for every outer iteration, the inner runs `n` times.

```javascript
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // runs n × n = n² times
  }
}
```

**When it's a problem:**
- `arr.length = 1,000` → **1,000,000 iterations** (~10ms — fine)
- `arr.length = 10,000` → **100,000,000 iterations** (~1s — laggy)
- `arr.length = 100,000` → **10 billion iterations** (~minutes — broken)

**Common optimizations:**

1. **Use a `Set` / `Map` for lookups** — converts O(n²) to O(n).
   ```javascript
   // ❌ O(n²) — find duplicates
   for (let i = 0; i < arr.length; i++) {
     for (let j = i+1; j < arr.length; j++) {
       if (arr[i] === arr[j]) return true;
     }
   }

   // ✅ O(n)
   const seen = new Set();
   for (const item of arr) {
     if (seen.has(item)) return true;
     seen.add(item);
   }
   ```

2. **Cache `.length`** in hot loops (minor, but real on old engines).
3. **Exit early** via `break` when possible.

---

## Q6. What's the difference between `for...of` and `for...in`? Which should you use for arrays?

**Answer:** This is a **classic interview trap**.

| | `for...in` | `for...of` |
|---|------------|------------|
| **Iterates** | **Keys** (enumerable properties) | **Values** (iterable items) |
| **Works on** | Objects, arrays (risky) | Arrays, strings, Maps, Sets, generators |
| **Inherited props** | **Yes** (walks prototype chain) | No |
| **Order guaranteed** | No (mostly integer keys first) | Yes (insertion order) |

```javascript
const arr = ["a", "b", "c"];
arr.customProp = "OOPS";

for (const i in arr)  console.log(i);   // "0", "1", "2", "customProp"  ← bug
for (const v of arr)  console.log(v);   // "a", "b", "c"                ← correct
```

**Rule:**
- **Arrays / iterables** → `for...of` (or `forEach`, `map`, etc.)
- **Objects** → `for...in` (with `hasOwnProperty` guard) OR `Object.keys(obj).forEach(...)`.

---

## Q7. What's the difference between `forEach`, `map`, and a `for` loop?

**Answer:**

| Method | Returns | Use Case | Can Break? |
|--------|---------|----------|------------|
| `for` | — | General-purpose | ✅ `break`/`continue` |
| `forEach` | `undefined` | Side effects (logging, DOM) | ❌ (throw to escape) |
| `map` | **New array** | Transformation | ❌ |
| `filter` | **New array** (subset) | Selection | ❌ |
| `reduce` | Single value | Aggregation | ❌ |
| `for...of` | — | Iteration | ✅ |

**Which to use:**
- **Need a new transformed array?** → `map`
- **Filtering?** → `filter`
- **Accumulating a total/single value?** → `reduce`
- **Just side effects, no result?** → `forEach` or `for...of`
- **Need `break` / `async-await`?** → `for` or `for...of` (`forEach` **does not wait** for async callbacks)

```javascript
// ❌ Does not sequence awaits
[1,2,3].forEach(async (n) => { await save(n); });

// ✅ Sequences awaits
for (const n of [1,2,3]) { await save(n); }
```

---

## Q8. How do you prevent the classic `var` + `setTimeout` closure bug inside a loop?

**Answer:**

```javascript
// ❌ All log "5" — var is function-scoped; shared across all iterations
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}

// ✅ Fix 1: use let (block-scoped per iteration)
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);   // 0, 1, 2, 3, 4
}

// ✅ Fix 2: IIFE to capture current value
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

**Why:** `var` creates **one variable shared across all iterations**. By the time the callbacks run, the loop has finished and `i` is `5`. `let` creates a **new binding per iteration**, so each closure captures its own `i`.

> **Why this matters:** Before ES6, every senior JS dev knew this bug. It still appears in interviews because it tests your grasp of **scope + closures + async timing** all in one question.

---

## Q9. Explain `do...while` with a real use case. How is it different from `while`?

**Answer:**

- **`while`** — condition is checked **before** the body. Body may run **zero times**.
- **`do...while`** — condition is checked **after** the body. Body runs **at least once**.

```javascript
// Must prompt at least once, then keep prompting if invalid
let input;
do {
  input = prompt("Enter a number between 1 and 10:");
} while (isNaN(input) || input < 1 || input > 10);
```

**Real-world use cases:**
- **Input validation** — ask once, re-ask on invalid input.
- **Retrying with exponential backoff** — make the first attempt regardless.
- **Menu loops** — show menu at least once before checking for exit.
- **Pagination** — fetch page 1, then decide if page 2 exists.

---

## Q10. How do you implement a pause/delay between iterations? (e.g., rate-limiting API calls)

**Answer:** Use `async/await` with a sleep helper. This is a **very common real-world interview question**.

```javascript
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processWithDelay(items) {
  for (const item of items) {
    await apiCall(item);
    await sleep(200);   // 200ms between calls
  }
}
```

**Key points:**
- **Must use `for` / `for...of`** — `forEach` does NOT await.
- **Sequential** here — each call waits for the previous.
- **Parallel with concurrency limit** uses `Promise.all` + batching or libraries like `p-limit`.

**Common variation:** "How would you retry a failed API call up to 3 times with exponential backoff?"
```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try { return await fetch(url); }
    catch (err) {
      if (i === retries - 1) throw err;
      await sleep(2 ** i * 1000);   // 1s, 2s, 4s
    }
  }
}
```

---

## Q11. Bonus — Predict the output.

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
```

**Answer:**
```
var 3
var 3
var 3
let 0
let 1
let 2
```

**Why:**
- `var i` → one shared variable. By the time the microtasks run, the loop is done; `i = 3`.
- `let j` → new binding each iteration; each closure captures its own `j`.

---

## Q12. Print a star pyramid — logic-building classic.

**Problem:** Print
```
*
* *
* * *
* * * *
```

**Answer:**
```javascript
const rows = 4;
for (let i = 1; i <= rows; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "* ";
  }
  console.log(line.trim());
}
```

**Why interviewers love this:**
- Tests **nested loop** understanding.
- Tests **string concatenation** patterns.
- Easy to extend to "right-aligned pyramid", "diamond", "inverted pyramid" — classic DSA warm-ups.

**Optimization using `.repeat()`:**
```javascript
for (let i = 1; i <= rows; i++) {
  console.log("* ".repeat(i).trim());
}
```
