# Day 01 — Interview Questions & Answers

**Topic:** Introduction to JavaScript, Script Loading, and the JS Engine Pipeline

---

## Q1. What is JavaScript, and why is it called a "multi-paradigm" language?

**Answer:**
JavaScript is a high-level, dynamically-typed, single-threaded, interpreted (and JIT-compiled) programming language that conforms to the **ECMAScript specification**. It was originally built for browsers to add interactivity, but via runtimes like **Node.js** and **Deno**, it now runs on servers, desktops, mobile devices, and embedded systems.

It's called **multi-paradigm** because it supports:
- **Imperative / procedural** programming (step-by-step instructions)
- **Object-oriented** programming (prototypes, classes)
- **Functional** programming (first-class functions, closures, higher-order functions)
- **Event-driven / asynchronous** programming (callbacks, promises, async/await)

> **Interviewer's follow-up:** "Is JavaScript compiled or interpreted?"
> **Answer:** Modern engines like V8 use **JIT (Just-In-Time) compilation** — code is parsed, then hot code paths are compiled to optimized machine code at runtime. So it's *both*.

---

## Q2. Explain the difference between client-side and server-side JavaScript.

**Answer:**

| Aspect | Client-Side JS | Server-Side JS |
|--------|---------------|----------------|
| **Where it runs** | Browser (Chrome V8, Firefox SpiderMonkey) | Runtime (Node.js, Deno, Bun) |
| **Primary purpose** | DOM manipulation, UI interactivity, API calls | Business logic, DB access, file I/O, auth |
| **Access** | `window`, `document`, `localStorage` | `fs`, `http`, `process`, env vars |
| **Security** | Sandboxed — no file/system access | Full OS-level access |
| **Visible to user** | Source code is exposed | Source code stays private |

---

## Q3. Compare `inline`, `internal`, and `external` ways of including JavaScript. Which is preferred in production?

**Answer:**

1. **Inline** — JS written directly in an HTML attribute (e.g., `onclick="..."`). Violates separation of concerns; blocks CSP policies.
2. **Internal** — JS inside `<script>` tags in the HTML `<head>` or `<body>`. Useful for one-off page scripts.
3. **External** — JS in a separate `.js` file, linked via `<script src="app.js">`. **Preferred for production** because:
   - Enables **browser caching** (file is downloaded once, reused across pages)
   - Enforces **separation of concerns** (HTML = structure, CSS = style, JS = behavior)
   - Makes code **reusable** across multiple pages
   - Easier to **minify, bundle, and tree-shake** via build tools (Webpack, Vite, esbuild)

---

## Q4. What is the difference between `async` and `defer` in `<script>` tags? When would you use each?

**Answer:** This is one of the **most common front-end performance interview questions**.

| Attribute | Download | Execution | DOM Ready? | Order Preserved? |
|-----------|----------|-----------|------------|------------------|
| *(none)* | Blocks HTML parse | Immediately after download | Not guaranteed | Yes |
| `async` | Parallel to HTML parse | **Immediately after download** (pauses parsing) | **Not** guaranteed | **No** (runs as soon as ready) |
| `defer` | Parallel to HTML parse | **After DOM is fully parsed** | **Guaranteed** | **Yes** (order preserved) |

**When to use which:**
- **`async`** → Independent third-party scripts (Google Analytics, ads, telemetry) that have **no DOM dependency** and don't depend on other scripts.
- **`defer`** → Your own app scripts that **interact with the DOM** and may depend on other scripts (e.g., load `jquery.js` before `app.js`).

> **Best practice:** Default to `defer` for application code. Use `async` only when the script is fully self-contained.

---

## Q5. Walk me through what happens when the JavaScript engine executes a piece of code.

**Answer:** The JS engine processes code in **three phases**:

1. **Tokenizing (Lexical Analysis)** — Source code is broken into atomic units called **tokens** (keywords, identifiers, operators, literals). E.g., `let x = 7;` → `[let] [x] [=] [7] [;]`.

2. **Parsing** — Tokens are arranged into a tree structure called the **Abstract Syntax Tree (AST)**. The AST represents the grammatical structure of the program. If syntax rules are violated, parsing fails and a `SyntaxError` is thrown **before any code runs**.

3. **Interpreting & Code Generation** — The AST is walked by the interpreter. Modern engines like **V8** use a hybrid approach:
   - Initial execution via the **Ignition interpreter** (generates bytecode)
   - Hot code paths are re-compiled to optimized machine code by **TurboFan** (JIT compiler)
   - **Inline caching** and **hidden classes** speed up repeated property access

> **Pipeline:** `Source → Tokenize → Parse (AST) → Bytecode → JIT-compiled Machine Code → Execute`

---

## Q6. Why does placing a `<script>` in `<head>` without `async`/`defer` cause a "null element" error?

**Answer:** Because scripts in `<head>` are **parser-blocking** by default. When the browser hits the script tag, it **pauses HTML parsing**, downloads and executes the script, and only then resumes parsing the `<body>`.

So when the script runs `document.getElementById("myBtn")`, the button element doesn't exist yet — the `<body>` hasn't been parsed. The result: `null`.

**Fixes (in order of preference):**
1. Add `defer` → waits until DOM is parsed.
2. Move the `<script>` tag to the end of `<body>`.
3. Wrap your code in a `DOMContentLoaded` listener:
   ```javascript
   document.addEventListener("DOMContentLoaded", () => {
     document.getElementById("myBtn").addEventListener("click", handleClick);
   });
   ```

---

## Q7. What is "Separation of Concerns" and why does it matter?

**Answer:** Separation of Concerns (SoC) is a design principle where **each part of a system has a single, well-defined responsibility**:

- **HTML** → structure and semantics
- **CSS** → presentation and style
- **JavaScript** → behavior and interactivity

**Why it matters in real projects:**
- **Maintainability** — A designer can change styles without touching JS logic.
- **Reusability** — External JS files can be used across dozens of pages.
- **Testability** — Logic in external modules can be unit-tested.
- **Performance** — Cached CSS/JS files load faster on repeat visits.
- **Collaboration** — Frontend and backend teams can work in parallel.

---

## Q8. What's the significance of ES6 (ECMAScript 2015)?

**Answer:** ES6 is the **most transformative release** in JavaScript's history. It introduced:

- `let` and `const` (block-scoped variables, replacing `var`)
- **Arrow functions** (`=>`)
- **Template literals** (`` `Hello, ${name}` ``)
- **Destructuring** (`const {a, b} = obj`)
- **Default parameters**, **rest/spread operators** (`...args`)
- **Classes** (syntactic sugar over prototypes)
- **Modules** (`import` / `export`)
- **Promises** (native async primitive)
- `Map`, `Set`, `Symbol`, `Iterators`, `Generators`

Post-ES6, the language moved to a **yearly release cadence** (ES2016, ES2017, …), each adding incremental features (async/await, optional chaining, nullish coalescing, etc.).

---

## Q9. Bonus — How does `defer` behave when you have multiple scripts?

**Answer:** Scripts with `defer` execute **in the order they appear in the HTML**, after DOM parsing completes but before the `DOMContentLoaded` event fires.

```html
<script src="lib.js" defer></script>   <!-- runs first -->
<script src="app.js" defer></script>   <!-- runs second, can safely use lib.js -->
```

Scripts with `async`, in contrast, execute **in whatever order they finish downloading** — which can break dependencies. This is why `defer` is the right choice for app code with ordering requirements.
