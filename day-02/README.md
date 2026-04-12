# Day 02: Variables and Data Types in JavaScript

## 1. What Are Variables?

### Real-Life Analogy

Imagine you are visiting a friend's place for the first time. Your friend gives you an address over the phone. What do you do next? You write that address on a piece of paper, a notepad, or save it in your mobile — so that you can carry that address with you until you reach your friend's place. You are **storing** that information somewhere.

Similarly, in programming, if you need to remember a user's name, age, marks, address, or an employee's salary — you need a place to store that information. **The place where you store this information with a name is called a variable.**

### The Box Analogy

Think of a variable as a **box** (a storage container):

- Every box has a **name** (the variable name).
- Inside the box, you put some **content** (the value).
- When you need the content, you refer to the box by its name.

**Example:** Imagine a box named `fruit`. Inside it, you place `"mango"`. Here, `fruit` is the variable and `"mango"` is the value.

### Formal Definition

> **Variables are used to store data in JavaScript.**

---

## 2. Defining Variables in JavaScript

### Syntax

```
let / const / var  storageName = value;
```

- **`let`**, **`const`**, and **`var`** are called **specifiers** (also known as declaration keywords).
- They actually control that perticular storage - where, and who can access the value from that perticular storage. Also they controls how many times I can put value to that perticular storage.
- **`storageName`** is the variable name (the name of your box).
- **`=`** is the **assignment operator**.
- **`value`** is the data you are storing inside the variable.

### Example

```javascript
let fruit = "mango";
```

Here, `let` is the specifier, `fruit` is the storage/variable name, and `"mango"` is the value assigned to it.

### Key Terminology

| Term | Meaning |
|------|---------|
| **Declaration** | Creating a variable for the first time using `let`, `const`, or `var` |
| **Assignment** | Putting a value into a declared variable using `=` |
| **Reassignment** | Changing the value of an already declared variable |
| **Redeclaration** | Declaring the same variable name again with a specifier |

---

## 3. Value Assignment

- The **assignment operator** in JavaScript is the single equals sign (`=`).
- The **left side** of `=` is the variable name (storage).
- The **right side** of `=` is the value being assigned.

### Assignment & Reassignment Visualized

```javascript
let fruit = "mango";   // Declaration + Assignment → box "fruit" holds "mango"
fruit = "kiwi";        // Reassignment → "mango" is removed, "kiwi" is placed in
```

When you reassign, the old value is **wiped out** and replaced with the new value. Think of someone coming, taking the mango out of the box, and putting a kiwi inside instead.

### Assigning One Variable to Another (Primitive – Pass by Value)

```javascript
let fruit = "mango";
let vegetable = "carrots";
fruit = vegetable;
```

What happens here?

- Both `"mango"` and `"carrots"` are **strings** — a primitive data type.
- All primitive values in JavaScript follow **pass by value**.
- The **value** of `vegetable` (`"carrots"`) is **copied** into `fruit`.
- `fruit` now holds `"carrots"`, but `vegetable` remains `"carrots"` — **unchanged**.
- **Nothing happens to the right-side variable.** Only the left-side variable's value changes.

> **Pass by Value:** When you assign one variable to another, the right-side variable's value is copied to the left-side variable. The right-side variable remains completely unaffected. This applies to all **primitive data types**.

---

## 4. Variable Naming Rules

JavaScript has a grammar, and just like any spoken language, if you don't follow the grammar, the language won't understand you. The most basic rule of JavaScript grammar is **how you name your variables**.

### Rules

1. **Must contain digits (0–9) or letters (a–z, A–Z).**
2. **Can include special characters:** only `$` (dollar) and `_` (underscore) are allowed.
3. **Must NOT start with a digit.** The first character cannot be a number.
4. **Cannot use reserved keywords** as variable names (e.g., `for`, `if`, `else`, `while`, `return`, etc.).
5. **Variable names are case-sensitive.** `myName` and `MyName` are two completely different variables.

### Quick Test Examples

| Declaration | Valid? | Reason |
|-------------|--------|--------|
| `let $ = "dollar"` | Yes | `$` is an allowed special character |
| `let 2morrow = "value"` | No | Starts with a digit |
| `let _ = "underscore"` | Yes | `_` is an allowed special character |
| `let react-play = "value"` | No | Hyphen (`-`) is not an allowed character |
| `let myName = "Tapas"` | Yes | Follows all rules |
| `let MyName = "Alex"` | Yes | Valid, but it's a **different** variable from `myName` |

### Naming Standards (Best Practices)

1. **Use camelCase:** Start with a lowercase letter; capitalize the first letter of each subsequent word.
   - Example: `firstName`, `homeAddress`, `employeeSalary`
   - The word "camelCase" itself is written in camelCase — `camel` (lowercase) + `Case` (capitalized).

2. **Names should be human-readable:** Anyone reading your code should be able to understand what the variable represents.
   - Good: `address`, `homeAddress`, `officeAddress`
   - Bad: `abc`, `x1`, `k$_hash`

3. **Names should match the use case:** If you're dealing with a salary, name it `salary` — not `amount` or `count`, even though they can all hold numbers. The name should reflect its exact purpose in the program.

---

## 5. `var`, `let`, and `const` — The Specifiers

### Overview

| Specifier | Can Redeclare? | Can Reassign? | Scope (covered later) |
|-----------|---------------|---------------|----------------------|
| `var` | Yes | Yes | Function scope |
| `let` | No | Yes | Block scope |
| `const` | No | No | Block scope |

> **Note:** The concept of **scope** (function scope vs block scope) will be covered in a dedicated future session. For now, focus on redeclaration and reassignment behavior.

### `var` — Can Be Redeclared

```javascript
var address = "Bangalore";
console.log(address);       // Output: Bangalore

var address = "USA";        // Redeclaration — allowed with var
console.log(address);       // Output: USA
```

`var` allows you to redeclare the same variable multiple times. This behavior caused a lot of **misconceptions and misunderstandings** in JavaScript programming for a very long time, because:

- You should ideally **declare a variable only once**.
- You can **use** and **reassign** it as many times as needed.
- But **redeclaring** with the specifier again creates confusion about intent.

`var` even allows you to omit the keyword entirely on subsequent uses, which made things worse. This is why `let` and `const` were introduced.

### `let` — Can Be Reassigned, Cannot Be Redeclared

```javascript
let address = "Bangalore";
console.log(address);       // Output: Bangalore

address = "USA";            // Reassignment — allowed
console.log(address);       // Output: USA

let address = "London";     // Redeclaration — ERROR!
// SyntaxError: Identifier 'address' has already been declared
```

With ES6 (ECMAScript 2015), `let` was introduced to fix the redeclaration problem. Once a variable is declared with `let`, you **cannot** declare it again with the same name. You can only **reassign** a new value to it.

**Key distinction:**
- **Declaring** = using a specifier (`let`, `const`, `var`) in front of the variable name.
- **Reassigning** = changing the value without using a specifier again.

### `const` — Cannot Be Reassigned, Cannot Be Redeclared

```javascript
const address = "Bangalore";
console.log(address);       // Output: Bangalore

address = "USA";            // Reassignment — ERROR!
// TypeError: Assignment to constant variable
```

`const` comes from the word **constant** — something that doesn't change. Once you assign a value to a `const` variable, you **cannot change it** later.

### Why Does `var` Still Exist?

`var` has not been removed from JavaScript because there is a massive amount of **legacy code** (programs written years or decades ago) still running in production. If JavaScript stopped supporting `var`, all those old programs would break. It may be removed someday, but for now it's supported — **you just shouldn't use it in new code**.

### Declaration Styles

```javascript
// Declare first, assign later
let age;
age = 25;

// Declare and assign at the same time
let age = 25;

// Multiple declarations in one line
let name, salary, department;

// Assign values later
name = "Alice";
salary = 50000;
department = "Engineering";
```

### Rules for Safe and Clean Programming

1. **Declare your variables only once.**
2. **Assign values** to your variables as many times as needed (if using `let`).
3. You may choose **not to assign** a value immediately — declare first, assign later based on your use case.
4. **Use your variable name** as many times as needed throughout your program.
5. **Never use `var`** — always prefer `let` or `const`.

---

## 6. Comments in JavaScript

Before diving into data types, a quick note on comments:

### Single-Line Comment

```javascript
// This is a single-line comment
// JavaScript engine will skip this line
```

### Multi-Line (Block) Comment

```javascript
/*
  This is a multi-line comment.
  Everything between these markers
  is ignored by the JavaScript engine.
*/
```

Comments are used to write explanations or notes within your code. The JavaScript engine **does not execute** commented lines.

---

## 7. Data Types in JavaScript

There are two broad categories of data types:

1. **Primitive Data Types** (basic/fundamental)
2. **Non-Primitive Data Types** (complex/reference)

---

### 7.1 Primitive Data Types

Primitive data types are the most **basic** data types in JavaScript. There are **7 primitive data types**:

| # | Type | Description | Example |
|---|------|-------------|---------|
| 1 | **String** | Text enclosed in single or double quotes | `"hello"`, `'world'` |
| 2 | **Number** | Numeric values (integers and decimals) | `24`, `3.14` |
| 3 | **Boolean** | Logical value — only `true` or `false` | `true`, `false` |
| 4 | **Undefined** | Variable is declared but **no value assigned** | `let name;` → `undefined` |
| 5 | **Null** | Variable is declared and intentionally assigned **"nothing"** | `let salary = null;` |
| 6 | **BigInt** | For representing very large integers beyond Number's safe range | `9007199254740991n` |
| 7 | **Symbol** | Used to create **unique identifiers** for data | `Symbol("id")` |

### `undefined` vs `null` — A Critical Distinction

**`undefined`:**
- A variable is **declared** but **no value has been assigned** to it.
- JavaScript automatically assigns `undefined` to such variables.

```javascript
let name, salary, department;
console.log(name);       // undefined
console.log(salary);     // undefined
```

The variable exists, but you haven't defined how it's going to behave — whether it will be a string, a number, etc. It's **undefined** because you just declared and left it.

**`null`:**
- A variable is **declared** and **explicitly assigned the value `null`**.
- `null` itself **is a value** — it represents "nothing" or "empty."
- Once a value (even `null`) is assigned, the variable is **no longer undefined** — it is **defined**, but its value is intentionally nothing.

```javascript
let salary;
console.log(salary);     // undefined (declared, not assigned)

salary = null;
console.log(salary);     // null (declared AND assigned — value is "nothing")
```

> **In short:** `undefined` = "I don't know what it is yet." `null` = "I know it's nothing."

### BigInt and Symbol (Brief Introduction)

- **BigInt:** Used when you need numbers larger than what the standard `Number` type can safely handle. Detailed usage comes in advanced sessions.
- **Symbol:** Introduced to create **unique identifiers**. Before `Symbol`, developers relied on strings for unique IDs. Symbol provides a dedicated data type for this purpose. Covered in depth in the advanced section of the 40-day journey.

---

### 7.2 Non-Primitive (Reference/Complex) Data Types

Non-primitive data types are **complex structures** built using primitive data types. The three main non-primitive types are:

| Type | Description | Example |
|------|-------------|---------|
| **Object** | A collection of key-value pairs | `{ name: "Alice", age: 22 }` |
| **Array** | An ordered sequence/list of values | `[1, 2, 3, 4, 5]` |
| **Function** | A reusable block of code | `function greet() { ... }` |

### Object Example

```javascript
let student = {
    name: "Alice",        // key: "name", value: "Alice" (String — primitive)
    age: 22,              // key: "age", value: 22 (Number — primitive)
    isEnrolled: true      // key: "isEnrolled", value: true (Boolean — primitive)
};
```

- An object is a **key-value pair** structure enclosed in curly braces `{}`.
- Keys and values are separated by a **colon** (`:`).
- All the values inside this object are **built from primitive data types**.
- Non-primitive values can also be **nested** — a property's value can itself be another object or array.

### Array Example

```javascript
let numbers = [1, 2, 3, 4, 5];
```

- An array is an **ordered sequence** of values inside square brackets `[]`.
- Each element here is a number (primitive), but together they form a complex data type.

> **Key Insight:** Complex (non-primitive) data types are always **built using** primitive data types. However, they can also contain other non-primitive types (objects within objects, arrays of objects, etc.).

---

## 8. How Variables and Data Are Stored in Memory

When you create variables and assign values, they must be **stored somewhere** in your computer's memory — otherwise you couldn't reuse them later. At a high level, JavaScript uses two types of memory:

### Stack Memory (for Primitives)

- Stores **primitive data types** directly.
- Each variable has its own memory location with the value stored right there.
- Fast and straightforward access.

### Heap Memory (for Non-Primitives)

- Stores **non-primitive (reference) data types**.
- The actual object/array/function data lives in the Heap.
- The variable in the Stack holds a **reference (memory address)** pointing to the location in the Heap.
- JavaScript uses this memory address to retrieve the value when needed.

> **Summary:** Primitive values → stored in **Stack**. Non-primitive values → stored in **Heap** (with a reference/address in the Stack).

> **Note:** A dedicated session on **Memory Management** is planned later in the 40-day journey, where stack, heap, garbage collection, and related topics will be covered in much greater depth.

---

## 9. How JavaScript Sees Your Code

JavaScript has a **grammar** (like any language). Before executing your code, the JavaScript engine verifies whether your code follows this grammar. Every line of code goes through **three main phases**:

### Phase 1: Tokenizing

The JavaScript engine **breaks the code into small pieces** called **tokens**.

```javascript
// Source code:
var age = 7;

// Tokens:
var | age | = | 7 | ;
```

Each keyword, variable name, operator, value, and punctuation mark becomes a separate token.

### Phase 2: Parsing

The tokens are organized into a **tree structure** called the **Abstract Syntax Tree (AST)**.

- The AST represents the grammatical structure of your code.
- Each node in the tree holds a token along with metadata (type, position, relationships).
- If the code **violates grammar rules**, the AST cannot be formed, and JavaScript throws an error.

**Tool to explore ASTs:** [AST Explorer](https://astexplorer.net) — write any JavaScript code on the left and see its AST representation on the right (as a tree or JSON).

### Phase 3: Interpreting & Code Generation

- The AST is **interpreted** and converted into **machine code** (bytecode).
- This machine code is what your computer actually understands and executes.

### The Full Pipeline

```
Source Code → Tokenizing → Parsing (AST) → Code Generation (Machine Code) → Execution
```

### Grammar Validation in Action

```javascript
let _valid = 10;     // ✅ AST forms successfully → code runs
let $also = 20;      // ✅ AST forms successfully → code runs
let 1invalid = 30;   // ❌ AST cannot form → Error: "Identifier directly after number"
```

When the AST cannot be formed due to a grammar violation, JavaScript **immediately throws an error** and does not execute the code.

---

## 10. Summary

| Concept | Key Takeaway |
|---------|-------------|
| Variable | A named storage (box) that holds a value |
| `var` | Can redeclare and reassign — **avoid in modern JS** |
| `let` | Cannot redeclare, can reassign — **use for changeable values** |
| `const` | Cannot redeclare, cannot reassign — **use for constants** |
| Assignment (`=`) | Left side = variable name, Right side = value |
| Pass by Value | For primitives — value is copied; original variable is unaffected |
| Primitive Types | String, Number, Boolean, Undefined, Null, BigInt, Symbol (7 types) |
| Non-Primitive Types | Object, Array, Function (reference/complex types) |
| `undefined` | Declared but never assigned a value |
| `null` | Declared and intentionally assigned "nothing" |
| Stack Memory | Stores primitive values |
| Heap Memory | Stores non-primitive values (referenced by address) |
| JS Code Pipeline | Tokenizing → Parsing (AST) → Code Generation → Execution |

