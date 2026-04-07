# Day 01: Introduction to JavaScript & Setting Up Environments

## What is JavaScript?

- JavaScript is a programming language.
- We can write programs using JS to build many things that can run on browser or server.
- **Browser** – Client side – user interactions.
- **Server** – data, user management, identity management.
- JS allows us to add interactivity on our application – button click, animation, doing something on the movement of the mouse, dynamically updating our web page.
- JS – Web application, mobile application, games, AI powered products.

## History of JS


| Year | Milestone |
|------|-----------|
| 1995 | Brendan Eich creates JS in 10 days at Netscape |
| 1996 | Microsoft releases JScript for Internet Explorer |
| 1997 | ECMAScript (ES1) is standardized |
| 1999 | ES3 introduces Regex and exception handling |
| 2005 | AJAX revolutionizes web interactivity |
| 2006 | jQuery simplifies JavaScript |
| 2009 | ES5 brings JSON support, map(), filter(), reduce() |
| 2010 | AngularJS popularizes front-end frameworks |
| 2013 | React.js changes UI development widely |
| 2014 | ECMAScript updates become annual |
| 2015 | ES6 (ECMAScript 2015) introduces let, const, classes, modules, and arrow functions |
| 2016 | Vue.js gains popularity as an alternative to React |
| 2017 | ES8 adds async/await, making asynchronous coding easier |
| 2019 | ES10 introduces optional catch binding and flatMap() |
| 2020 | Deno (by Ryan Dahl) challenges Node.js with better security |
| 2021 | ES12 adds logical assignment operators (&&=, //=, ??=) |
| 2022 | ES13 introduces at() for arrays and top-level await |
| 2023 | ES14 brings array grouping groupBy |
| 2024 | React Server Components (RSC) revolutionize web app performance |
| 2025 | JavaScript continues evolving, integrating more AI-driven features & WebAssembly advancements |


## Client Side vs Server Side

- JavaScript is something which is used for client side and also in the server side.
- When we say client side – it runs on the web browser or can run on the mobile devices; something that we can see; something visible.
- The thing that provides the structure of the visual aspect of web page on browser is HTML.
- HTML provides the web page structure. HTML contains all the visual aspects of web page.
- User interactions with those visual aspects done by JavaScript.
- CSS comes into picture to beautify the HTML, JS interactions.
- HTML, CSS and JS make our web application workable.


## Including Scripts in HTML

- There are various ways to include JS `<script>` in HTML:
  1. **Inline** of the HTML – including JS into HTML directly.
  2. **Internal** – including JS codes into HTML `<head>` tag.
  3. **External** – including a JS file into HTML `<head>` tag.

- `HTML → <head>` → configuration for the HTML → importing styles & scripts → SEO
- `<body>` → everything here will render/show

## Programming Philosophy – Separation of Concerns

- Keep the things & duties separate.
- HTML's job is to do structuring.
- JS job is to bring dynamic behavior.
- CSS job is to do styling.

- For every element on web page we can identify those elements with a unique identifier which we call **id**.
- Keep them all separated. This approach gives scope for reusability.


## Including Scripts in HTML: A Deep Dive

### 1. Inline Script (Directly in HTML)

```html
<script>
  console.log("This script runs immediately!");
</script>
```

- Quick tests on small scripts.
- **Pros:** No external file dependencies. Useful for simple, one time logic.
- **Cons:** Mixes HTML and JS, violating separation of concerns philosophy. Hard to maintain for larger projects.

### 2. External Script (Linked File)

```html
<script src="script.js"></script>
```

- **Use Case:** Most real world applications.
- **Pros:** Cleaner code structure. Reusable across multiple HTML files. Browser caching improves performance.
- **Cons:** Require proper placement to avoid DOM errors.


## Script Placement: Head vs Body

### 1. Script in `<head>`

```html
<head>
  <script src="script.js"></script>
</head>
```

- **Behavior:** Script downloads and executes before the HTML body is parsed. Blocks HTML parsing, delaying page rendering.
- **Problem:** If the script tries to access DOM elements that haven't loaded yet:

```javascript
document.getElementById("someId").innerText = "Hello"; // Error: Element is null
```

### 2. Script at the end of `<body>`

```html
<body>
  <!-- HTML content -->
  <script src="script.js"></script>
</body>
```

- **Behavior:** Script downloads and executes after the DOM is fully parsed.
- **Pros:** Guarantees DOM elements are accessible.
- **Cons:** Sequential loading, scripts delay page interactivity until fully loaded.

---

## Modern Solutions for Including Scripts: async & defer

### 1. async Attribute

```html
<head>
  <script src="script.js" async></script>
</head>
```

- **Behavior:** Downloads script in parallel with HTML parsing. Executes immediately after download, pausing HTML parsing.
- **Use case:** Third party scripts (analytics, ads) with no DOM dependencies.
- **Example:**

```javascript
// Google analytics script
console.log("Tracking user activity...");
```

### 2. defer Attribute

```html
<head>
  <script src="script.js" defer></script>
</head>
```

- **Behavior:** Downloads script in parallel with HTML parsing. Executes after DOM is fully parsed (before DOMContentLoaded event).
- **Use case:** Scripts that depend on the DOM (dynamic content, event listeners).
- **Example:**

```javascript
// script.js
document.getElementById("btn").addEventListener("click", handleClick); // works
```

---

## Comparison Table

| Method        | Download         | Execution        | DOM Readiness | Use Case             |
| ------------- | ---------------- | ---------------- | ------------- | -------------------- |
| Inline (Head) | N/A              | Immediate        | Risky         | Small scripts        |
| End of body   | After HTML parse | After HTML parse | Guaranteed    | Simple projects      |
| async         | Parallel         | Immediate        | Risky         | Non-DOM scripts      |
| defer         | Parallel         | After DOM parse  | Guaranteed    | Most real world apps |

---

## Common Pitfalls & Fixes

### 1. Null DOM Element Errors

- **Cause:** Script runs before DOM element exists.

```html
<head>
  <script>
    document.getElementById("myElement"); // null
  </script>
</head>
<body>
  <div id="myElement"></div>
</body>
```

- **Fix:** Use `defer` or place script after the element.

### 2. Render-Blocking Scripts

- **Cause:** Large scripts in `<head>` without async/defer.

```html
<head>
  <script src="heavy-script.js"></script>
  <!-- Blocks page load -->
</head>
```

- **Fix:** Use `defer` to prioritize critical content.

---

## Best Practices

1. **Use defer by default**
   - Ensures scripts run after DOM is ready.
   - Maintains parallel downloading.

2. **Minimize inline scripts**
   - Keep JS in external files for reusability and caching.

3. **Order matters for defer scripts**
   - Scripts with defer execute in the order they appear in HTML.

```html
<script src="library.js" defer></script>
<!-- Runs first -->
<script src="app.js" defer></script>
<!-- Runs second -->
```

---

## Real World Example: Dynamic Content Loading

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="analytics.js" async></script>
    <!-- Non-blocking analytics -->
    <!-- Fires immediately but doesn't block the page -->

    <script src="app.js" defer></script>
    <!-- DOM-dependent code -->
    <!-- Safely manipulates #content after DOM loads -->
  </head>
  <body>
    <h1>Welcome!</h1>
    <div id="content"></div>
    <!-- Loaded by app.js -->
  </body>
</html>
```
