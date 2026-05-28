import { Lesson, QuizQuestion } from '@/types'

export const PASS_THRESHOLD = 70
export const MIN_SESSION_MINUTES = 60

export const lessons: Lesson[] = [
  // ─── WEEK 1: BASICS ───────────────────────────────────────────────────────
  {
    id: 'l1',
    week: 1, day: 1, level: 'basic', order: 1,
    title: 'Introduction to JavaScript',
    description: 'What is JavaScript, how it runs in the browser, and writing your first script.',
    minDurationMinutes: 60,
    content: `## What is JavaScript?

JavaScript is the programming language of the web. It runs directly in your browser and lets you create dynamic, interactive experiences.

### Where does JS run?
- **Browser** – Every modern browser has a built-in JS engine (V8 in Chrome, SpiderMonkey in Firefox).
- **Server** – Node.js lets you run JS on the server.
- **Everywhere** – Mobile apps, desktop apps, IoT devices.

### Your first script
Open the browser's DevTools (F12) and type in the Console:

\`\`\`js
console.log("Hello, World!");
\`\`\`

You can also embed JS in an HTML file:

\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <script>
      alert("Hello from JS!");
    </script>
  </body>
</html>
\`\`\`

### Key characteristics
- **Interpreted** – no compile step, runs line-by-line
- **Dynamically typed** – variable types are determined at runtime
- **Single-threaded** – one thing at a time, but uses async patterns to stay fast`,
    codeExample: `// Try these in your browser console
console.log("Hello, World!");
console.log(1 + 2);
console.log(typeof "hello");`,
  },
  {
    id: 'l2',
    week: 1, day: 2, level: 'basic', order: 2,
    title: 'Variables & Data Types',
    description: 'Declaring variables with let, const, var and understanding primitive types.',
    minDurationMinutes: 60,
    content: `## Variables

Variables are named containers for storing data.

### Declaration keywords

\`\`\`js
var oldWay = "avoid this";   // function-scoped, hoisted – avoid
let count = 0;               // block-scoped, reassignable
const PI = 3.14159;          // block-scoped, cannot be reassigned
\`\`\`

**Rule of thumb:** prefer \`const\`, use \`let\` when you need to reassign, never use \`var\`.

### Primitive data types

| Type | Example | typeof |
|------|---------|--------|
| String | \`"hello"\` | "string" |
| Number | \`42\`, \`3.14\` | "number" |
| Boolean | \`true\`, \`false\` | "boolean" |
| Undefined | \`undefined\` | "undefined" |
| Null | \`null\` | "object" (quirk!) |
| BigInt | \`9007199254740993n\` | "bigint" |
| Symbol | \`Symbol("id")\` | "symbol" |

### Type coercion gotchas

\`\`\`js
console.log(1 + "2");   // "12"  (string concatenation)
console.log(1 - "2");   // -1   (numeric subtraction)
console.log(true + 1);  // 2
\`\`\`

Use \`===\` (strict equality) to avoid unexpected type coercion.`,
    codeExample: `const name = "Alice";
let age = 25;
const isStudent = true;

console.log(typeof name);     // "string"
console.log(typeof age);      // "number"
console.log(typeof isStudent); // "boolean"

// Template literals
console.log(\`\${name} is \${age} years old\`);`,
  },
  {
    id: 'l3',
    week: 1, day: 3, level: 'basic', order: 3,
    title: 'Operators & Expressions',
    description: 'Arithmetic, comparison, logical operators, and how expressions are evaluated.',
    minDurationMinutes: 60,
    content: `## Operators

### Arithmetic
\`\`\`js
5 + 3   // 8
10 - 4  // 6
3 * 7   // 21
15 / 4  // 3.75
15 % 4  // 3  (remainder)
2 ** 8  // 256 (exponentiation)
\`\`\`

### Comparison
\`\`\`js
5 == "5"   // true  (loose – avoid)
5 === "5"  // false (strict – prefer)
5 !== 6    // true
5 > 3      // true
5 >= 5     // true
\`\`\`

### Logical
\`\`\`js
true && false  // false (AND)
true || false  // true  (OR)
!true          // false (NOT)
\`\`\`

### Short-circuit evaluation
\`\`\`js
const user = null;
const name = user && user.name;   // null  (doesn't crash)
const display = name || "Guest";  // "Guest"
const value = null ?? "default";  // "default" (nullish coalescing)
\`\`\`

### Assignment operators
\`\`\`js
let x = 10;
x += 5;   // x = 15
x -= 3;   // x = 12
x *= 2;   // x = 24
x /= 4;   // x = 6
x **= 2;  // x = 36
\`\`\``,
    codeExample: `// Ternary operator – shorthand if/else
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Nullish coalescing
const config = null;
const timeout = config?.timeout ?? 5000;
console.log(timeout); // 5000`,
  },
  {
    id: 'l4',
    week: 1, day: 4, level: 'basic', order: 4,
    title: 'Control Flow – if / switch',
    description: 'Making decisions in code using conditionals.',
    minDurationMinutes: 60,
    content: `## Conditionals

### if / else if / else
\`\`\`js
const score = 82;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}
\`\`\`

### switch
Best when comparing one value against many fixed options:

\`\`\`js
const day = "Monday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Unknown");
}
\`\`\`

### Truthy and Falsy
These values are **falsy**: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`
Everything else is **truthy**.

\`\`\`js
if ("") console.log("never runs");
if (0)  console.log("never runs");
if ([]) console.log("arrays are truthy!");  // runs
\`\`\``,
    codeExample: `function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log(grade(95));  // A
console.log(grade(73));  // C
console.log(grade(55));  // F`,
  },
  {
    id: 'l5',
    week: 1, day: 5, level: 'basic', order: 5,
    title: 'Loops',
    description: 'for, while, do-while loops and iterating over data.',
    minDurationMinutes: 60,
    content: `## Loops

### for loop
\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

### while loop
\`\`\`js
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
\`\`\`

### do-while (runs at least once)
\`\`\`js
let n = 10;
do {
  console.log(n); // prints 10 even though condition is false
  n++;
} while (n < 5);
\`\`\`

### for...of (iterating arrays)
\`\`\`js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

### for...in (iterating object keys)
\`\`\`js
const person = { name: "Alice", age: 25 };
for (const key in person) {
  console.log(key, person[key]);
}
\`\`\`

### break and continue
\`\`\`js
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;  // skip 3
  if (i === 6) break;     // stop at 6
  console.log(i);         // 0, 1, 2, 4, 5
}
\`\`\``,
    codeExample: `// FizzBuzz – classic loop exercise
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
  },

  // ─── WEEK 2: INTERMEDIATE ─────────────────────────────────────────────────
  {
    id: 'l6',
    week: 2, day: 1, level: 'intermediate', order: 6,
    title: 'Functions',
    description: 'Function declarations, expressions, arrow functions, and scope.',
    minDurationMinutes: 60,
    content: `## Functions

Functions are reusable blocks of code.

### Declaration vs Expression
\`\`\`js
// Declaration – hoisted, callable before definition
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Expression – not hoisted
const greet2 = function(name) {
  return \`Hi, \${name}!\`;
};
\`\`\`

### Arrow functions (ES6)
\`\`\`js
const add = (a, b) => a + b;
const square = n => n * n;
const sayHello = () => "Hello!";

// Multi-line
const divide = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};
\`\`\`

### Default parameters
\`\`\`js
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
greet();         // "Hello, World!"
greet("Alice");  // "Hello, Alice!"
\`\`\`

### Rest parameters & spread
\`\`\`js
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
\`\`\`

### Scope
\`\`\`js
const outer = "I'm outer";

function inner() {
  const local = "I'm local";
  console.log(outer); // accessible
}

console.log(local); // ReferenceError!
\`\`\``,
    codeExample: `// Higher-order function: a function that takes/returns a function
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15`,
  },
  {
    id: 'l7',
    week: 2, day: 2, level: 'intermediate', order: 7,
    title: 'Arrays & Array Methods',
    description: 'Creating, accessing, and transforming arrays with built-in methods.',
    minDurationMinutes: 60,
    content: `## Arrays

### Creation & access
\`\`\`js
const fruits = ["apple", "banana", "cherry"];
fruits[0];       // "apple"
fruits.length;   // 3
fruits.at(-1);   // "cherry" (last element)
\`\`\`

### Mutation methods
\`\`\`js
fruits.push("date");       // add to end → ["apple","banana","cherry","date"]
fruits.pop();              // remove from end → "date"
fruits.unshift("avocado"); // add to start
fruits.shift();            // remove from start
fruits.splice(1, 1);       // remove 1 at index 1
\`\`\`

### Transformation (non-mutating)
\`\`\`js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);          // [2,4,6,8,10]
nums.filter(n => n % 2 === 0); // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 15
nums.find(n => n > 3);         // 4
nums.findIndex(n => n > 3);    // 3
nums.some(n => n > 4);         // true
nums.every(n => n > 0);        // true
nums.includes(3);              // true
nums.slice(1, 3);              // [2,3]
\`\`\`

### Sorting
\`\`\`js
[3,1,2].sort((a,b) => a - b);  // [1,2,3] ascending
[3,1,2].sort((a,b) => b - a);  // [3,2,1] descending
["banana","apple"].sort();      // ["apple","banana"]
\`\`\`

### Destructuring
\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1 2 [3,4,5]
\`\`\``,
    codeExample: `const students = [
  { name: "Alice", score: 92 },
  { name: "Bob",   score: 65 },
  { name: "Carol", score: 78 },
];

// Get names of students who passed (>= 70), sorted by score
const passed = students
  .filter(s => s.score >= 70)
  .sort((a, b) => b.score - a.score)
  .map(s => s.name);

console.log(passed); // ["Alice", "Carol"]`,
  },
  {
    id: 'l8',
    week: 2, day: 3, level: 'intermediate', order: 8,
    title: 'Objects & Destructuring',
    description: 'Creating and manipulating objects, spread, destructuring, optional chaining.',
    minDurationMinutes: 60,
    content: `## Objects

### Creating objects
\`\`\`js
const person = {
  name: "Alice",
  age: 25,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};
\`\`\`

### Accessing & modifying
\`\`\`js
person.name;            // dot notation
person["age"];          // bracket notation (useful for dynamic keys)
person.city = "NYC";    // add property
delete person.city;     // remove property
\`\`\`

### Destructuring
\`\`\`js
const { name, age, city = "Unknown" } = person;
// city gets default "Unknown" since it doesn't exist

// Rename while destructuring
const { name: fullName } = person;
\`\`\`

### Spread & Object.assign
\`\`\`js
const updated = { ...person, age: 26 }; // creates new object
const copy = Object.assign({}, person);
\`\`\`

### Useful Object methods
\`\`\`js
Object.keys(person);    // ["name","age","greet"]
Object.values(person);  // ["Alice",25,fn]
Object.entries(person); // [["name","Alice"],["age",25],...]
\`\`\`

### Optional chaining
\`\`\`js
const user = null;
console.log(user?.profile?.avatar); // undefined, no crash
\`\`\``,
    codeExample: `// Merging config with defaults
const defaults = { theme: "light", lang: "en", timeout: 5000 };
const userConfig = { theme: "dark", timeout: 3000 };

const config = { ...defaults, ...userConfig };
console.log(config);
// { theme: "dark", lang: "en", timeout: 3000 }`,
  },
  {
    id: 'l9',
    week: 2, day: 4, level: 'intermediate', order: 9,
    title: 'DOM Manipulation',
    description: 'Selecting, creating, and modifying HTML elements with JavaScript.',
    minDurationMinutes: 60,
    content: `## The DOM

The Document Object Model (DOM) is a tree of objects representing your HTML. JS can read and modify it in real time.

### Selecting elements
\`\`\`js
document.getElementById("myId");
document.querySelector(".my-class");      // first match
document.querySelectorAll("p");           // NodeList of all <p>
document.querySelector("[data-id='42']"); // attribute selector
\`\`\`

### Reading & writing content
\`\`\`js
const el = document.querySelector("#title");
el.textContent;              // get text
el.textContent = "New text"; // set text
el.innerHTML = "<b>Bold</b>"; // parse HTML (be careful: XSS risk)
\`\`\`

### Modifying attributes & styles
\`\`\`js
el.setAttribute("data-id", "42");
el.getAttribute("href");
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("open");
el.style.color = "red";
\`\`\`

### Creating & inserting elements
\`\`\`js
const btn = document.createElement("button");
btn.textContent = "Click me";
btn.classList.add("btn");
document.body.appendChild(btn);

// More flexible insertion
parent.insertBefore(newEl, referenceEl);
parent.append(el1, el2, "text");  // modern, multiple nodes
\`\`\`

### Removing elements
\`\`\`js
el.remove();
parent.removeChild(el);
\`\`\``,
    codeExample: `// Build a simple todo item
function createTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  return li;
}

const ul = document.querySelector("#todo-list");
ul.appendChild(createTodo("Learn JavaScript"));`,
  },
  {
    id: 'l10',
    week: 2, day: 5, level: 'intermediate', order: 10,
    title: 'Events',
    description: 'Handling user interactions with event listeners, event delegation.',
    minDurationMinutes: 60,
    content: `## Events

### Adding listeners
\`\`\`js
const btn = document.querySelector("#myBtn");

btn.addEventListener("click", (event) => {
  console.log("Clicked!", event.target);
});
\`\`\`

### Common events
| Category | Events |
|----------|--------|
| Mouse | click, dblclick, mouseenter, mouseleave, mousemove |
| Keyboard | keydown, keyup, keypress |
| Form | submit, change, input, focus, blur |
| Window | load, resize, scroll |

### The Event object
\`\`\`js
document.addEventListener("keydown", (e) => {
  console.log(e.key);       // "Enter", "a", "ArrowUp", …
  console.log(e.ctrlKey);   // true if Ctrl held
  e.preventDefault();       // stop default browser behavior
  e.stopPropagation();      // stop bubbling up
});
\`\`\`

### Event delegation
Attach one listener to a parent instead of many to children:

\`\`\`js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    e.target.classList.toggle("done");
  }
});
\`\`\`

### Removing listeners
\`\`\`js
function handler() { console.log("once"); }
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);
// Or use { once: true }
btn.addEventListener("click", handler, { once: true });
\`\`\``,
    codeExample: `// Form validation with events
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");

emailInput.addEventListener("input", (e) => {
  const isValid = e.target.value.includes("@");
  e.target.style.borderColor = isValid ? "green" : "red";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted:", Object.fromEntries(new FormData(form)));
});`,
  },

  // ─── WEEK 3: ADVANCED ─────────────────────────────────────────────────────
  {
    id: 'l11',
    week: 3, day: 1, level: 'advanced', order: 11,
    title: 'Promises & Async/Await',
    description: 'Asynchronous JavaScript with Promises, async/await, and error handling.',
    minDurationMinutes: 60,
    content: `## Asynchronous JavaScript

JS is single-threaded, but it handles async work (network requests, timers, file I/O) via the **event loop**.

### Callbacks (the old way)
\`\`\`js
setTimeout(() => console.log("Done!"), 1000);
\`\`\`

### Promises
\`\`\`js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("data"), 1000);
});

p.then(data => console.log(data))
 .catch(err => console.error(err))
 .finally(() => console.log("always runs"));
\`\`\`

### Promise combinators
\`\`\`js
// All resolve or first rejection
Promise.all([fetch(url1), fetch(url2)]);

// First to settle (resolve or reject)
Promise.race([timeout(3000), fetch(url)]);

// All settle regardless
Promise.allSettled([p1, p2, p3]);

// First to resolve (ignores rejections)
Promise.any([p1, p2, p3]);
\`\`\`

### async/await (syntactic sugar over Promises)
\`\`\`js
async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed:", err.message);
    throw err;
  }
}
\`\`\`

### Common mistake: forgetting await
\`\`\`js
// Wrong – p is a Promise, not the value!
const p = getData(url);

// Right
const data = await getData(url);
\`\`\``,
    codeExample: `async function fetchUser(id) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  const user = await res.json();
  return user;
}

// Fetching multiple users in parallel
async function main() {
  const users = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  users.forEach(u => console.log(u.name));
}

main();`,
  },
  {
    id: 'l12',
    week: 3, day: 2, level: 'advanced', order: 12,
    title: 'Fetch API & REST',
    description: 'Making HTTP requests, working with JSON, and handling API responses.',
    minDurationMinutes: 60,
    content: `## The Fetch API

\`fetch()\` is the modern way to make HTTP requests in the browser.

### GET request
\`\`\`js
const res = await fetch("https://api.example.com/users");
const users = await res.json();
\`\`\`

### POST request
\`\`\`js
const res = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", age: 25 }),
});
const created = await res.json();
\`\`\`

### Full CRUD example
\`\`\`js
const BASE = "https://jsonplaceholder.typicode.com";

// Create
await fetch(\`\${BASE}/posts\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello" }),
});

// Read
const posts = await (await fetch(\`\${BASE}/posts\`)).json();

// Update
await fetch(\`\${BASE}/posts/1\`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Updated" }),
});

// Delete
await fetch(\`\${BASE}/posts/1\`, { method: "DELETE" });
\`\`\`

### Error handling
\`\`\`js
async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(\`Request failed: \${res.status} \${res.statusText}\`);
  }
  return res.json();
}
\`\`\``,
    codeExample: `// Generic API client with error handling
async function api(path, options = {}) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com\${path}\`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) throw new Error(\`\${res.status}: \${res.statusText}\`);
  return res.status === 204 ? null : res.json();
}

// Usage
const post = await api("/posts/1");
console.log(post.title);`,
  },
  {
    id: 'l13',
    week: 3, day: 3, level: 'advanced', order: 13,
    title: 'Closures & Scope',
    description: 'Lexical scope, closures, and practical patterns like memoization and module pattern.',
    minDurationMinutes: 60,
    content: `## Closures

A closure is a function that **remembers** the variables from its outer scope even after the outer function has returned.

### How closures work
\`\`\`js
function makeCounter() {
  let count = 0;  // enclosed variable

  return {
    increment() { count++; },
    decrement() { count--; },
    value()     { return count; },
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.value(); // 2
\`\`\`

### Practical: private state
\`\`\`js
function createBank(initial) {
  let balance = initial; // private

  return {
    deposit(amount)  { balance += amount; },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
    },
    getBalance()     { return balance; },
  };
}
\`\`\`

### Memoization
\`\`\`js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});
\`\`\`

### Classic loop gotcha
\`\`\`js
// Bug – all print 3
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);

// Fix – use let (block-scoped)
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
\`\`\``,
    codeExample: `// Partial application using closures
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

function add(a, b, c) { return a + b + c; }

const add5 = partial(add, 2, 3);
console.log(add5(10)); // 15`,
  },
  {
    id: 'l14',
    week: 3, day: 4, level: 'advanced', order: 14,
    title: 'Classes & Prototypes',
    description: 'OOP in JavaScript with classes, inheritance, getters/setters, and the prototype chain.',
    minDurationMinutes: 60,
    content: `## Classes (ES6)

### Defining a class
\`\`\`js
class Animal {
  #name; // private field (ES2022)

  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.#name} says \${this.sound}!\`;
  }

  get name() { return this.#name; }
  set name(v) {
    if (!v) throw new Error("Name required");
    this.#name = v;
  }

  static create(name, sound) {
    return new Animal(name, sound);
  }
}
\`\`\`

### Inheritance
\`\`\`js
class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // call parent constructor
  }

  fetch(item) {
    return \`\${this.name} fetches the \${item}!\`;
  }
}

const rex = new Dog("Rex");
rex.speak();         // "Rex says Woof!"
rex.fetch("ball");   // "Rex fetches the ball!"
rex instanceof Dog;  // true
rex instanceof Animal; // true
\`\`\`

### The prototype chain (under the hood)
\`\`\`js
// Classes are syntactic sugar over prototypes
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
\`\`\`

### Mixins (composition over inheritance)
\`\`\`js
const Serializable = (Base) => class extends Base {
  toJSON() { return JSON.stringify(this); }
};

class User extends Serializable(Animal) {}
\`\`\``,
    codeExample: `class Stack {
  #items = [];

  push(...values) { this.#items.push(...values); }
  pop()  { return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get size() { return this.#items.length; }
  isEmpty() { return this.#items.length === 0; }
}

const s = new Stack();
s.push(1, 2, 3);
console.log(s.peek());  // 3
console.log(s.size);    // 3
console.log(s.pop());   // 3`,
  },
  {
    id: 'l15',
    week: 3, day: 5, level: 'advanced', order: 15,
    title: 'Modules & Tooling',
    description: 'ES Modules, import/export, bundlers, and modern JavaScript tooling.',
    minDurationMinutes: 60,
    content: `## ES Modules

### Named exports
\`\`\`js
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
\`\`\`

### Default export
\`\`\`js
// logger.js
export default class Logger {
  log(msg) { console.log(\`[LOG] \${msg}\`); }
}
\`\`\`

### Importing
\`\`\`js
import Logger from "./logger.js";           // default
import { add, multiply } from "./math.js";  // named
import * as Math from "./math.js";          // namespace
import { add as sum } from "./math.js";     // alias
\`\`\`

### Dynamic imports
\`\`\`js
// Only load when needed (code-splitting)
const module = await import("./heavy-chart-library.js");
module.render(data);
\`\`\`

### Module patterns
\`\`\`js
// Re-exporting from an index file (barrel export)
// components/index.js
export { Button } from "./Button.js";
export { Modal } from "./Modal.js";
export { default as Table } from "./Table.js";
\`\`\`

### CommonJS vs ESM
| Feature | CommonJS (\`require\`) | ESM (\`import\`) |
|---------|----------------------|----------------|
| Syntax | \`require/module.exports\` | \`import/export\` |
| Loading | Synchronous | Asynchronous |
| Tree-shaking | No | Yes |
| Node.js | Default | Use .mjs or "type":"module" |`,
    codeExample: `// utils.js
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};`,
  },

  // ─── WEEK 4: ADVANCED + CAPSTONE ──────────────────────────────────────────
  {
    id: 'l16',
    week: 4, day: 1, level: 'advanced', order: 16,
    title: 'Error Handling',
    description: 'try/catch/finally, custom errors, and defensive programming patterns.',
    minDurationMinutes: 60,
    content: `## Error Handling

### try / catch / finally
\`\`\`js
try {
  const data = JSON.parse(badString);
} catch (err) {
  console.error(err.name);    // "SyntaxError"
  console.error(err.message); // "Unexpected token …"
} finally {
  console.log("always runs – cleanup here");
}
\`\`\`

### Custom errors
\`\`\`js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "NetworkError";
    this.status = status;
  }
}

// Usage
function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("email", "Invalid email format");
  }
}
\`\`\`

### Error handling in async code
\`\`\`js
// Option 1 – try/catch
async function load() {
  try {
    const data = await fetchData();
    return data;
  } catch (err) {
    if (err instanceof NetworkError) {
      // retry
    }
    throw err; // re-throw if can't handle
  }
}

// Option 2 – Result type pattern
async function safeLoad() {
  try {
    return { ok: true, data: await fetchData() };
  } catch (error) {
    return { ok: false, error };
  }
}
\`\`\``,
    codeExample: `// Retry with exponential backoff
async function withRetry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const delay = 2 ** attempt * 100;
      await new Promise(r => setTimeout(r, delay));
      console.log(\`Retry \${attempt}/\${maxAttempts - 1}...\`);
    }
  }
}`,
  },
  {
    id: 'l17',
    week: 4, day: 2, level: 'advanced', order: 17,
    title: 'Local Storage & Web APIs',
    description: 'Persisting data with localStorage, sessionStorage, and other browser APIs.',
    minDurationMinutes: 60,
    content: `## Browser Storage

### localStorage (persists until cleared)
\`\`\`js
// Store data (strings only – use JSON for objects)
localStorage.setItem("token", "abc123");
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));

// Retrieve
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

// Remove
localStorage.removeItem("token");
localStorage.clear(); // nuke everything
\`\`\`

### sessionStorage (cleared on tab close)
Same API as localStorage, but limited to the browser session.

### Wrapper utility
\`\`\`js
const storage = {
  get(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) { localStorage.removeItem(key); },
};
\`\`\`

### Other useful Web APIs
\`\`\`js
// Clipboard
await navigator.clipboard.writeText("Copied!");
const text = await navigator.clipboard.readText();

// Geolocation
navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});

// Intersection Observer (lazy loading, infinite scroll)
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) loadMore(); });
});
observer.observe(sentinel);
\`\`\``,
    codeExample: `// Theme preference with localStorage
function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

initTheme();`,
  },
  {
    id: 'l18',
    week: 4, day: 3, level: 'advanced', order: 18,
    title: 'Iterators & Generators',
    description: 'Custom iterables, generators, and lazy evaluation patterns.',
    minDurationMinutes: 60,
    content: `## Iterators

The iterator protocol allows any object to be iterated with \`for...of\`.

### Custom iterator
\`\`\`js
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) console.log(n); // 1 2 3 4 5
const nums = [...new Range(1, 3)]; // [1,2,3]
\`\`\`

### Generators (function*)
\`\`\`js
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2

// Take first n values
function take(gen, n) {
  const result = [];
  for (const val of gen) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}
take(fibonacci(), 8); // [0,1,1,2,3,5,8,13]
\`\`\``,
    codeExample: `// Infinite ID generator
function* idGenerator(prefix = "id") {
  let n = 1;
  while (true) yield \`\${prefix}-\${n++}\`;
}

const ids = idGenerator("user");
console.log(ids.next().value); // "user-1"
console.log(ids.next().value); // "user-2"`,
  },
  {
    id: 'l19',
    week: 4, day: 4, level: 'advanced', order: 19,
    title: 'Design Patterns',
    description: 'Observer, Singleton, Factory, and other patterns applied in JavaScript.',
    minDurationMinutes: 60,
    content: `## Design Patterns

### Observer / EventEmitter
\`\`\`js
class EventEmitter {
  #listeners = new Map();

  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(fn);
    return () => this.off(event, fn); // returns unsubscribe fn
  }

  off(event, fn) {
    this.#listeners.set(event, (this.#listeners.get(event) || []).filter(l => l !== fn));
  }

  emit(event, ...args) {
    (this.#listeners.get(event) || []).forEach(fn => fn(...args));
  }
}
\`\`\`

### Singleton
\`\`\`js
class Config {
  static #instance = null;
  #data = {};

  static getInstance() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }

  set(key, value) { this.#data[key] = value; }
  get(key) { return this.#data[key]; }
}
\`\`\`

### Factory
\`\`\`js
function createUser(role) {
  const base = { role, createdAt: new Date() };
  if (role === "admin")  return { ...base, canDelete: true, canBan: true };
  if (role === "editor") return { ...base, canEdit: true };
  return { ...base, canView: true };
}
\`\`\`

### Strategy
\`\`\`js
const sorters = {
  bubble: arr => { /* bubble sort */ },
  quick:  arr => [...arr].sort((a,b) => a - b),
  merge:  arr => { /* merge sort */ },
};

function sort(arr, strategy = "quick") {
  return sorters[strategy](arr);
}
\`\`\``,
    codeExample: `// Simple reactive state (Observer pattern)
function createStore(initial) {
  let state = initial;
  const listeners = new Set();

  return {
    getState: () => state,
    setState(updater) {
      state = typeof updater === "function" ? updater(state) : updater;
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
  };
}

const store = createStore({ count: 0 });
store.subscribe(s => console.log("Count:", s.count));
store.setState(s => ({ count: s.count + 1 })); // Count: 1`,
  },
  {
    id: 'l20',
    week: 4, day: 5, level: 'advanced', order: 20,
    title: 'Performance & Best Practices',
    description: 'Profiling, memory management, debounce/throttle, and writing maintainable JS.',
    minDurationMinutes: 60,
    content: `## Performance

### Measuring performance
\`\`\`js
performance.mark("start");
// ... your code ...
performance.mark("end");
performance.measure("my-task", "start", "end");
const [entry] = performance.getEntriesByName("my-task");
console.log(\`\${entry.duration.toFixed(2)}ms\`);
\`\`\`

### Debounce vs Throttle
\`\`\`js
// Debounce: execute after user STOPS doing X for Y ms
// Use for: search input, resize handler
const debounced = debounce(search, 300);
input.addEventListener("input", debounced);

// Throttle: execute at most once every Y ms
// Use for: scroll events, mousemove
const throttled = throttle(updatePosition, 100);
document.addEventListener("mousemove", throttled);
\`\`\`

### Memory leaks
Common causes:
1. **Forgotten event listeners** – always remove when element is destroyed
2. **Closures holding large data** – null out references when done
3. **Detached DOM nodes** – remove references to removed elements
4. **Timers** – always clearInterval/clearTimeout

\`\`\`js
// Bad – timer keeps running after component unmounts
const id = setInterval(update, 1000);

// Good – cleanup
return () => clearInterval(id);
\`\`\`

### Best practices checklist
- ✅ Use \`const\` by default, \`let\` when needed
- ✅ Prefer \`===\` over \`==\`
- ✅ Handle all promise rejections
- ✅ Validate inputs at boundaries
- ✅ Keep functions small and single-purpose
- ✅ Use meaningful variable names
- ✅ Avoid deep nesting (early returns)
- ✅ Don't mutate function arguments`,
    codeExample: `// Virtual list for rendering large datasets
function renderVisibleItems(items, containerEl, itemHeight = 40) {
  const container = containerEl;
  const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;

  container.addEventListener("scroll", () => {
    const scrollTop = container.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visible = items.slice(startIndex, startIndex + visibleCount);

    container.innerHTML = "";
    container.style.paddingTop = \`\${startIndex * itemHeight}px\`;
    visible.forEach(item => {
      const div = document.createElement("div");
      div.style.height = \`\${itemHeight}px\`;
      div.textContent = item;
      container.appendChild(div);
    });
  });
}`,
  },
]

export const quizQuestions: QuizQuestion[] = [
  // Lesson 1 – Intro
  { id: 'q1-1', lessonId: 'l1', question: 'What does console.log() do?', options: ['Logs errors to the server', 'Prints output to the browser console', 'Sends data to a database', 'Creates a popup alert'], correctIndex: 1, explanation: 'console.log() prints values to the browser\'s developer console, useful for debugging.' },
  { id: 'q1-2', lessonId: 'l1', question: 'Which company originally created JavaScript?', options: ['Microsoft', 'Google', 'Netscape', 'Apple'], correctIndex: 2, explanation: 'JavaScript was created by Brendan Eich at Netscape in 1995.' },
  { id: 'q1-3', lessonId: 'l1', question: 'JavaScript is best described as:', options: ['Compiled and statically typed', 'Interpreted and dynamically typed', 'Machine language', 'A database query language'], correctIndex: 1, explanation: 'JS is interpreted (no compile step) and dynamically typed (types resolved at runtime).' },
  { id: 'q1-4', lessonId: 'l1', question: 'Where can JavaScript run?', options: ['Only in browsers', 'Only on servers', 'In browsers, on servers (Node.js), and more', 'Only in desktop apps'], correctIndex: 2, explanation: 'JS runs in browsers via the JS engine, on the server via Node.js, and in many other environments.' },
  { id: 'q1-5', lessonId: 'l1', question: 'How do you open browser DevTools on most systems?', options: ['Ctrl+Alt+T', 'F12', 'Ctrl+Shift+X', 'Alt+F4'], correctIndex: 1, explanation: 'Pressing F12 (or right-click → Inspect) opens the browser\'s DevTools.' },

  // Lesson 2 – Variables
  { id: 'q2-1', lessonId: 'l2', question: 'Which keyword creates a block-scoped, reassignable variable?', options: ['var', 'let', 'const', 'def'], correctIndex: 1, explanation: '`let` is block-scoped and allows reassignment. `const` is block-scoped but not reassignable. `var` is function-scoped.' },
  { id: 'q2-2', lessonId: 'l2', question: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctIndex: 2, explanation: 'This is a well-known JavaScript quirk — typeof null returns "object" due to a historical bug in the language.' },
  { id: 'q2-3', lessonId: 'l2', question: 'What is the result of 1 + "2"?', options: ['3', '"12"', 'NaN', 'Error'], correctIndex: 1, explanation: 'When you add a number and a string, JS converts the number to a string and concatenates them: "12".' },
  { id: 'q2-4', lessonId: 'l2', question: 'Which is the best practice when declaring a variable that will never change?', options: ['var', 'let', 'const', 'static'], correctIndex: 2, explanation: 'Use `const` for values that should not be reassigned. It communicates intent and prevents accidental changes.' },
  { id: 'q2-5', lessonId: 'l2', question: 'What is the type of undefined?', options: ['"null"', '"undefined"', '"void"', '"object"'], correctIndex: 1, explanation: 'typeof undefined returns "undefined" — it\'s the type of a declared but uninitialized variable.' },

  // Lesson 3 – Operators
  { id: 'q3-1', lessonId: 'l3', question: 'What is the result of 5 === "5"?', options: ['true', 'false', 'TypeError', '1'], correctIndex: 1, explanation: 'Strict equality (===) checks both value AND type. 5 is a number, "5" is a string, so they are not equal.' },
  { id: 'q3-2', lessonId: 'l3', question: 'What does the ?? operator do?', options: ['Compares two values', 'Returns the right side if the left is null or undefined', 'Throws if the value is null', 'Converts to boolean'], correctIndex: 1, explanation: 'The nullish coalescing operator (??) returns the right operand only when the left is null or undefined (not 0 or "").' },
  { id: 'q3-3', lessonId: 'l3', question: 'What is 2 ** 10?', options: ['20', '100', '1024', '512'], correctIndex: 2, explanation: '** is the exponentiation operator. 2^10 = 1024.' },
  { id: 'q3-4', lessonId: 'l3', question: 'What does short-circuit evaluation mean?', options: ['Code runs faster in a loop', 'JS stops evaluating an expression as soon as the result is determined', 'Variables are automatically deleted', 'Functions are inlined'], correctIndex: 1, explanation: 'In `a && b`, if `a` is falsy, JS skips evaluating `b`. In `a || b`, if `a` is truthy, `b` is skipped.' },
  { id: 'q3-5', lessonId: 'l3', question: 'What does 17 % 5 equal?', options: ['3', '2', '5', '17'], correctIndex: 1, explanation: '% is the remainder operator. 17 / 5 = 3 remainder 2, so 17 % 5 = 2.' },

  // Lesson 4 – Control Flow
  { id: 'q4-1', lessonId: 'l4', question: 'Which of these values is truthy?', options: ['0', '""', 'null', '[]'], correctIndex: 3, explanation: 'Empty arrays ([]) are truthy in JavaScript! Only 0, "", null, undefined, NaN, and false are falsy.' },
  { id: 'q4-2', lessonId: 'l4', question: 'What happens if you forget `break` in a switch case?', options: ['SyntaxError', 'The code stops', 'Execution falls through to the next case', 'Nothing changes'], correctIndex: 2, explanation: 'Without `break`, execution "falls through" and continues into the next case block.' },
  { id: 'q4-3', lessonId: 'l4', question: 'What is the ternary operator syntax?', options: ['if (cond) a : b', 'cond ? a : b', 'cond -> a : b', 'a if cond else b'], correctIndex: 1, explanation: 'The ternary operator: condition ? valueIfTrue : valueIfFalse' },
  { id: 'q4-4', lessonId: 'l4', question: 'What does `undefined` evaluate to in a boolean context?', options: ['true', 'false', '0', 'It throws'], correctIndex: 1, explanation: 'undefined is falsy, so `if (undefined)` will not execute the block.' },
  { id: 'q4-5', lessonId: 'l4', question: 'Which keyword is used to exit a switch statement?', options: ['exit', 'return', 'break', 'continue'], correctIndex: 2, explanation: '`break` exits a switch statement. Without it, execution falls through to subsequent cases.' },

  // Lesson 5 – Loops
  { id: 'q5-1', lessonId: 'l5', question: 'What does `continue` do in a loop?', options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the loop from the beginning', 'Pauses execution'], correctIndex: 1, explanation: '`continue` skips the rest of the current iteration and jumps to the next one.' },
  { id: 'q5-2', lessonId: 'l5', question: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'for...of'], correctIndex: 2, explanation: 'A do-while loop executes its body first, then checks the condition, so it always runs at least once.' },
  { id: 'q5-3', lessonId: 'l5', question: 'Which is the correct FizzBuzz condition to check for multiples of both 3 and 5?', options: ['i % 3 === 0 || i % 5 === 0', 'i % 3 === 0 && i % 5 === 0', 'i % 15 === 0', 'Both B and C'], correctIndex: 3, explanation: 'i % 15 === 0 is equivalent to i % 3 === 0 && i % 5 === 0. Both check for multiples of 15.' },
  { id: 'q5-4', lessonId: 'l5', question: 'What does `for...of` iterate over?', options: ['Object keys', 'Iterable values like arrays and strings', 'Only numbers', 'Object properties'], correctIndex: 1, explanation: '`for...of` iterates over iterable objects (arrays, strings, Maps, Sets, etc.) giving you each value.' },
  { id: 'q5-5', lessonId: 'l5', question: 'What is an infinite loop?', options: ['A loop that runs exactly 100 times', 'A loop whose condition never becomes false', 'A recursive function', 'A loop in a worker thread'], correctIndex: 1, explanation: 'An infinite loop runs forever because its terminating condition is never met. This freezes the browser tab.' },

  // Lesson 6 – Functions
  { id: 'q6-1', lessonId: 'l6', question: 'What is hoisting?', options: ['Moving heavy code to the bottom', 'Variables and function declarations moved to the top of their scope before execution', 'Deleting unused variables', 'Importing external modules'], correctIndex: 1, explanation: 'Hoisting means function declarations (and var variables) are available throughout their scope, even before the line they are written.' },
  { id: 'q6-2', lessonId: 'l6', question: 'Arrow functions differ from regular functions because:', options: ['They run faster', 'They have their own `this` binding', 'They do NOT have their own `this` binding', 'They can\'t be passed as arguments'], correctIndex: 2, explanation: 'Arrow functions inherit `this` from their enclosing scope. Regular functions get their own `this` depending on how they\'re called.' },
  { id: 'q6-3', lessonId: 'l6', question: 'What does the rest parameter (...args) do?', options: ['Spreads an array into arguments', 'Collects remaining arguments into an array', 'Rests the function execution', 'Creates optional parameters'], correctIndex: 1, explanation: 'The rest parameter collects any extra arguments into an array. function sum(...nums) lets you call sum(1,2,3,4).' },
  { id: 'q6-4', lessonId: 'l6', question: 'What is a higher-order function?', options: ['A function with many lines', 'A function that takes or returns another function', 'An async function', 'A recursive function'], correctIndex: 1, explanation: 'Higher-order functions accept functions as arguments or return them. Examples: map, filter, reduce.' },
  { id: 'q6-5', lessonId: 'l6', question: 'What is the output of: const add = (a, b=5) => a + b; add(3);', options: ['undefined', 'NaN', '8', '3'], correctIndex: 2, explanation: 'b defaults to 5 when not provided, so add(3) returns 3 + 5 = 8.' },

  // Lesson 7 – Arrays
  { id: 'q7-1', lessonId: 'l7', question: 'What does Array.map() return?', options: ['A filtered subset of the array', 'A new array with each element transformed', 'A single accumulated value', 'The index of a matching element'], correctIndex: 1, explanation: 'map() creates a new array by applying a function to each element of the original array.' },
  { id: 'q7-2', lessonId: 'l7', question: 'What does arr.reduce((acc, n) => acc + n, 0) do for [1,2,3]?', options: ['Returns [1,2,3]', 'Returns 6', 'Returns [0,1,2,3]', 'Returns 0'], correctIndex: 1, explanation: 'reduce() accumulates values. Starting at 0: 0+1=1, 1+2=3, 3+3=6. Result: 6.' },
  { id: 'q7-3', lessonId: 'l7', question: 'Which method removes the last element of an array?', options: ['shift()', 'pop()', 'splice()', 'slice()'], correctIndex: 1, explanation: 'pop() removes and returns the last element. shift() removes the first element.' },
  { id: 'q7-4', lessonId: 'l7', question: 'What does arr.filter(n => n > 2) return for [1,2,3,4]?', options: ['[1,2]', '[3,4]', '[2,3,4]', 'true'], correctIndex: 1, explanation: 'filter() returns elements that pass the test. Elements > 2 in [1,2,3,4] are 3 and 4.' },
  { id: 'q7-5', lessonId: 'l7', question: 'What is array destructuring?', options: ['Removing elements from an array', 'Unpacking array values into variables', 'Sorting an array', 'Copying an array'], correctIndex: 1, explanation: 'Destructuring: const [a, b] = [1, 2] assigns a=1 and b=2.' },

  // Lesson 8 – Objects
  { id: 'q8-1', lessonId: 'l8', question: 'What does the spread operator do when used with objects?', options: ['Deletes object properties', 'Creates a shallow copy / merges objects', 'Freezes the object', 'Converts it to an array'], correctIndex: 1, explanation: 'Spread creates a shallow copy: {...obj} or merges: {...obj1, ...obj2}. Changes to nested objects still affect the copy.' },
  { id: 'q8-2', lessonId: 'l8', question: 'What is optional chaining (?.) used for?', options: ['Creating optional object properties', 'Safely accessing nested properties without throwing on null/undefined', 'Making a property optional to define', 'Async property access'], correctIndex: 1, explanation: 'obj?.prop returns undefined instead of throwing a TypeError when obj is null or undefined.' },
  { id: 'q8-3', lessonId: 'l8', question: 'What does Object.entries() return?', options: ['An array of keys', 'An array of values', 'An array of [key, value] pairs', 'A Map object'], correctIndex: 2, explanation: 'Object.entries({a:1, b:2}) returns [["a",1],["b",2]] — an array of key-value pair arrays.' },
  { id: 'q8-4', lessonId: 'l8', question: 'How do you create an object with a computed property key?', options: ['obj.{key}: value', 'const obj = { [key]: value }', 'const obj = { key = value }', 'obj[key] = value inside {}'], correctIndex: 1, explanation: 'Computed property keys use bracket notation inside object literals: { [dynamicKey]: value }.' },
  { id: 'q8-5', lessonId: 'l8', question: 'What does delete obj.prop do?', options: ['Sets the property to null', 'Sets it to undefined', 'Removes the property entirely from the object', 'Throws an error'], correctIndex: 2, explanation: 'delete removes the property from the object entirely, so obj.hasOwnProperty("prop") returns false after.' },

  // Lesson 9 – DOM
  { id: 'q9-1', lessonId: 'l9', question: 'What is the DOM?', options: ['A CSS framework', 'A tree-structured object representation of an HTML document that JS can modify', 'A JavaScript engine', 'A browser security policy'], correctIndex: 1, explanation: 'The Document Object Model (DOM) is a programming interface for HTML documents, representing the page as a tree of objects.' },
  { id: 'q9-2', lessonId: 'l9', question: 'What is the difference between textContent and innerHTML?', options: ['They are identical', 'textContent treats everything as plain text; innerHTML parses HTML', 'innerHTML is faster', 'textContent can contain HTML tags'], correctIndex: 1, explanation: 'textContent sets/gets raw text (safe). innerHTML parses HTML (XSS risk with user input). Prefer textContent for plain text.' },
  { id: 'q9-3', lessonId: 'l9', question: 'What does document.querySelector(".btn") select?', options: ['All elements with class btn', 'The first element with class btn', 'The element with id btn', 'All button elements'], correctIndex: 1, explanation: 'querySelector returns the FIRST element matching the CSS selector. Use querySelectorAll for all matches.' },
  { id: 'q9-4', lessonId: 'l9', question: 'How do you add a CSS class to an element?', options: ['el.className += "active"', 'el.classList.add("active")', 'el.style.class = "active"', 'el.addClassName("active")'], correctIndex: 1, explanation: 'el.classList.add("active") is the modern way. It does not remove existing classes. el.className += works but can have spacing issues.' },
  { id: 'q9-5', lessonId: 'l9', question: 'Which method creates a new HTML element?', options: ['document.newElement("div")', 'document.createElement("div")', 'document.makeElement("div")', 'new Element("div")'], correctIndex: 1, explanation: 'document.createElement("div") creates a new <div> element. You still need to append it to the DOM.' },

  // Lesson 10 – Events
  { id: 'q10-1', lessonId: 'l10', question: 'What does event.preventDefault() do?', options: ['Stops the event from firing', 'Prevents the default browser action (e.g., form submission)', 'Removes the event listener', 'Stops event bubbling'], correctIndex: 1, explanation: 'preventDefault() prevents the default browser behavior — e.g., stopping a form from submitting or a link from navigating.' },
  { id: 'q10-2', lessonId: 'l10', question: 'What is event delegation?', options: ['Sending events to a server', 'Attaching a listener to a parent to handle events from its children', 'Delegating events between tabs', 'Using multiple event types on one element'], correctIndex: 1, explanation: 'Event delegation attaches one listener to a parent element and uses event.target to determine which child was clicked. More efficient for dynamic lists.' },
  { id: 'q10-3', lessonId: 'l10', question: 'What is event bubbling?', options: ['An event that fires multiple times', 'An event that propagates up from the target to ancestor elements', 'An event from a bubble chart', 'An animation event'], correctIndex: 1, explanation: 'After an event fires on a target element, it bubbles up through ancestor elements (child → parent → body → document).' },
  { id: 'q10-4', lessonId: 'l10', question: 'How do you fire a listener only once and then remove it automatically?', options: ['{ times: 1 }', '{ once: true }', 'removeEventListener inside the callback', 'Both B and C'], correctIndex: 3, explanation: '{ once: true } as a third argument to addEventListener automatically removes the listener after it fires once. You can also manually call removeEventListener inside the callback.' },
  { id: 'q10-5', lessonId: 'l10', question: 'What does event.target refer to?', options: ['The element the listener was attached to', 'The actual element that was clicked/interacted with', 'The parent element', 'The document'], correctIndex: 1, explanation: 'event.target is the specific element that triggered the event. event.currentTarget is the element the listener is attached to.' },

  // Lesson 11 – Async
  { id: 'q11-1', lessonId: 'l11', question: 'What does a Promise represent?', options: ['A guarantee that code will run without errors', 'A value that may be available now, in the future, or never', 'A synchronous function result', 'A type of loop'], correctIndex: 1, explanation: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation.' },
  { id: 'q11-2', lessonId: 'l11', question: 'What does await do?', options: ['Makes a function asynchronous', 'Pauses execution until a Promise resolves, then returns its value', 'Creates a new Promise', 'Catches errors from a Promise'], correctIndex: 1, explanation: 'await pauses the async function and waits for the Promise to resolve, then returns the resolved value.' },
  { id: 'q11-3', lessonId: 'l11', question: 'What does Promise.all() do if one promise rejects?', options: ['Ignores the rejection and returns the rest', 'Waits for all to settle', 'Immediately rejects with that error', 'Returns undefined for that slot'], correctIndex: 2, explanation: 'Promise.all() fails fast: if ANY promise rejects, the whole Promise.all() rejects immediately.' },
  { id: 'q11-4', lessonId: 'l11', question: 'Why must async/await be used inside an async function?', options: ['Because it\'s slower otherwise', 'Because await returns a Promise and the function must handle async execution', 'It doesn\'t need to be', 'Because of JavaScript\'s single-thread model'], correctIndex: 1, explanation: 'await can only be used inside functions marked async. The async keyword makes the function return a Promise automatically.' },
  { id: 'q11-5', lessonId: 'l11', question: 'What is the difference between Promise.allSettled() and Promise.all()?', options: ['allSettled is faster', 'allSettled waits for all promises regardless of rejection; all() fails on first rejection', 'They are identical', 'all() waits for all regardless of rejection'], correctIndex: 1, explanation: 'Promise.allSettled() waits for every promise to settle (resolve or reject) and gives you the full results array.' },

  // Lesson 12 – Fetch
  { id: 'q12-1', lessonId: 'l12', question: 'Does fetch() throw an error for a 404 response?', options: ['Yes, always', 'No — you must check res.ok or res.status', 'Yes, if you use await', 'Only for 5xx errors'], correctIndex: 1, explanation: 'fetch() only rejects on network failures. A 404 or 500 response still resolves — you must check res.ok manually.' },
  { id: 'q12-2', lessonId: 'l12', question: 'How do you send a POST request with fetch()?', options: ['fetch(url, "POST")', 'fetch(url, { method: "POST", body: JSON.stringify(data) })', 'fetch.post(url, data)', 'fetch(url).post(data)'], correctIndex: 1, explanation: 'Pass an options object as the second argument with method, headers, and body (JSON.stringify for objects).' },
  { id: 'q12-3', lessonId: 'l12', question: 'What header is needed when sending JSON data?', options: ['"Accept: application/json"', '"Content-Type: application/json"', '"Data-Type: json"', '"Format: JSON"'], correctIndex: 1, explanation: 'Content-Type: application/json tells the server the request body is JSON-formatted.' },
  { id: 'q12-4', lessonId: 'l12', question: 'What HTTP method is used to partially update a resource?', options: ['PUT', 'POST', 'PATCH', 'UPDATE'], correctIndex: 2, explanation: 'PATCH partially updates a resource (only the fields you send). PUT replaces the entire resource.' },
  { id: 'q12-5', lessonId: 'l12', question: 'What does await res.json() do?', options: ['Converts the response to a string', 'Parses the JSON response body and returns a JavaScript object', 'Checks if the response is valid JSON', 'Stringifies a JavaScript object'], correctIndex: 1, explanation: 'res.json() reads the response body and parses it as JSON, returning the resulting JavaScript object/array.' },

  // Lesson 13 – Closures
  { id: 'q13-1', lessonId: 'l13', question: 'What is a closure?', options: ['A way to close a browser tab', 'A function that retains access to variables from its outer scope after that scope has returned', 'An object with private methods', 'A way to end a loop'], correctIndex: 1, explanation: 'A closure is a function bundled with its lexical environment — it "remembers" variables from where it was defined.' },
  { id: 'q13-2', lessonId: 'l13', question: 'Why does `var` in a for loop cause the classic setTimeout bug?', options: ['var is not allowed in for loops', 'var is function-scoped, so all iterations share the same variable', 'setTimeout doesn\'t work with var', 'The loop runs too fast'], correctIndex: 1, explanation: 'var is hoisted to function scope, so by the time the timeout fires, the loop variable has its final value. Use let for block-scoping.' },
  { id: 'q13-3', lessonId: 'l13', question: 'What is memoization?', options: ['Storing data in localStorage', 'Caching function results so the same inputs don\'t recompute', 'Memorizing code patterns', 'A type of recursion'], correctIndex: 1, explanation: 'Memoization caches the return value of a function for given inputs. Repeated calls with same args return cached results instantly.' },
  { id: 'q13-4', lessonId: 'l13', question: 'What does partial application mean?', options: ['Running a function partially', 'Pre-filling some arguments of a function, returning a new function for the rest', 'Applying CSS partially', 'A loop that doesn\'t finish'], correctIndex: 1, explanation: 'Partial application creates a new function with some arguments already "baked in", reducing the function\'s arity.' },
  { id: 'q13-5', lessonId: 'l13', question: 'Which of these correctly uses a closure to create private state?', options: ['class { private x = 0 }', 'function makeCounter() { let n = 0; return { inc: () => ++n } }', 'const n = 0; function inc() { n++ }', 'let n = 0; export { n }'], correctIndex: 1, explanation: 'The returned object\'s methods close over `n`. Nothing outside can directly access or modify `n` — only through the returned functions.' },

  // Lesson 14 – Classes
  { id: 'q14-1', lessonId: 'l14', question: 'What does the super() call do in a constructor?', options: ['Calls the parent class\'s constructor', 'Creates a superclass', 'Makes the method public', 'Calls a static method'], correctIndex: 0, explanation: 'super() must be called in a child constructor before accessing `this`. It runs the parent\'s constructor.' },
  { id: 'q14-2', lessonId: 'l14', question: 'What is a private class field (using #)?', options: ['A field that can only be accessed by subclasses', 'A field that cannot be accessed outside the class body', 'A read-only field', 'A static field'], correctIndex: 1, explanation: 'Private fields (#name) are truly private — not accessible outside the class, not even in subclasses.' },
  { id: 'q14-3', lessonId: 'l14', question: 'What does instanceof check?', options: ['If a variable has a certain type', 'If an object was created by a class or its subclass', 'If a class method exists', 'The memory address of an object'], correctIndex: 1, explanation: 'instanceof checks the prototype chain: dog instanceof Animal is true if Dog extends Animal.' },
  { id: 'q14-4', lessonId: 'l14', question: 'What is a static method?', options: ['A method that cannot be overridden', 'A method called on the class itself, not on instances', 'A method that runs once', 'An inherited method'], correctIndex: 1, explanation: 'Static methods belong to the class: MyClass.create() not instance.create(). Often used for factory methods.' },
  { id: 'q14-5', lessonId: 'l14', question: 'JavaScript classes are syntactic sugar over:', options: ['C++ classes', 'Java classes', 'Prototype-based inheritance', 'TypeScript interfaces'], correctIndex: 2, explanation: 'JS classes don\'t introduce a new object model. They\'re a cleaner syntax over the existing prototype-based inheritance system.' },

  // Lesson 15 – Modules
  { id: 'q15-1', lessonId: 'l15', question: 'What is the difference between a default export and a named export?', options: ['Named exports are faster', 'A module can have one default export and many named exports; default is imported without {}', 'Default exports require {}', 'Named exports must match the variable name'], correctIndex: 1, explanation: 'import X from "./m" gets the default export. import { y } from "./m" gets a named export. A module has at most one default.' },
  { id: 'q15-2', lessonId: 'l15', question: 'What is tree-shaking?', options: ['Removing comments from code', 'A bundler optimization that removes unused exports from the final bundle', 'Organizing imports alphabetically', 'A CSS technique'], correctIndex: 1, explanation: 'Tree-shaking (supported by ESM) allows bundlers like Webpack/Vite to eliminate code that is never imported/used.' },
  { id: 'q15-3', lessonId: 'l15', question: 'What is a dynamic import?', options: ['Importing CSS dynamically', 'Loading a module lazily at runtime using import()', 'Importing from an API', 'An experimental feature not yet in JS'], correctIndex: 1, explanation: 'import("./module") returns a Promise and loads the module at runtime — great for code-splitting and lazy loading.' },
  { id: 'q15-4', lessonId: 'l15', question: 'What is a barrel export?', options: ['Exporting a large file', 'An index file that re-exports from multiple modules for a clean import path', 'A minified export', 'A default export with many values'], correctIndex: 1, explanation: 'A barrel file (index.js) re-exports from sub-modules so consumers can write: import { A, B, C } from "./components".' },
  { id: 'q15-5', lessonId: 'l15', question: 'How do you import everything from a module as a namespace?', options: ['import all from "./m"', 'import * as M from "./m"', 'import { * } from "./m"', 'require("./m")'], correctIndex: 1, explanation: 'import * as M from "./m" imports all named exports under the namespace M: M.foo, M.bar, etc.' },

  // Lessons 16-20 – Advanced
  { id: 'q16-1', lessonId: 'l16', question: 'What does the finally block do?', options: ['Runs only if no error occurs', 'Runs only if an error occurs', 'Always runs, whether or not an error occurred', 'Catches errors that catch missed'], correctIndex: 2, explanation: 'finally always executes — useful for cleanup like closing files, releasing locks, or hiding loading spinners.' },
  { id: 'q16-2', lessonId: 'l16', question: 'How do you create a custom error?', options: ['new CustomError("msg")', 'class MyError extends Error {}', 'throw { message: "msg" }', 'Error.custom("msg")'], correctIndex: 1, explanation: 'Extend the built-in Error class. Set this.name in the constructor for proper error identification.' },
  { id: 'q16-3', lessonId: 'l16', question: 'When should you re-throw an error in a catch block?', options: ['Never', 'When you can handle it locally', 'When you can\'t handle it and want the caller to deal with it', 'Always'], correctIndex: 2, explanation: 'Re-throw when your catch block can\'t fully handle the error. Swallowing errors silently makes bugs very hard to debug.' },
  { id: 'q16-4', lessonId: 'l16', question: 'What is exponential backoff?', options: ['Making requests faster each retry', 'Increasing the delay between retries to avoid overwhelming the server', 'A hashing algorithm', 'A sorting algorithm'], correctIndex: 1, explanation: 'Exponential backoff increases wait time between retries (e.g., 100ms, 200ms, 400ms) to reduce server load and improve success rate.' },
  { id: 'q16-5', lessonId: 'l16', question: 'What is the Result type pattern?', options: ['Using TypeScript generics', 'Returning { ok, data } or { ok: false, error } instead of throwing', 'A new JS feature', 'A React hook pattern'], correctIndex: 1, explanation: 'The Result pattern returns success/failure as values rather than exceptions, making error handling explicit at call sites.' },

  { id: 'q17-1', lessonId: 'l17', question: 'What is the key difference between localStorage and sessionStorage?', options: ['localStorage is faster', 'sessionStorage is cleared when the tab/browser closes; localStorage persists', 'localStorage has more storage space', 'They are identical'], correctIndex: 1, explanation: 'sessionStorage data is tied to the browser session and cleared on tab close. localStorage persists until explicitly cleared.' },
  { id: 'q17-2', lessonId: 'l17', question: 'Why should you JSON.parse/stringify values in localStorage?', options: ['localStorage doesn\'t support strings', 'localStorage only stores strings, so objects must be serialized', 'JSON is faster to access', 'It\'s optional'], correctIndex: 1, explanation: 'localStorage only stores strings. JSON.stringify converts objects to strings for storage; JSON.parse converts them back.' },
  { id: 'q17-3', lessonId: 'l17', question: 'What does the Intersection Observer API observe?', options: ['Mouse intersections', 'When elements enter or exit the viewport', 'CSS grid intersections', 'Network request collisions'], correctIndex: 1, explanation: 'IntersectionObserver fires callbacks when target elements enter or leave the visible viewport — perfect for lazy loading and infinite scroll.' },
  { id: 'q17-4', lessonId: 'l17', question: 'What does navigator.clipboard.writeText() require?', options: ['A user gesture (HTTPS + user action)', 'Root access', 'A special API key', 'Service Worker registration'], correctIndex: 0, explanation: 'Clipboard API requires a user gesture (like a click) and HTTPS for security reasons.' },
  { id: 'q17-5', lessonId: 'l17', question: 'What is a memory leak in the context of event listeners?', options: ['Using too much RAM in general', 'Event listeners that are never removed, keeping DOM elements or data alive after they\'re no longer needed', 'A bug in the browser', 'Using localStorage too much'], correctIndex: 1, explanation: 'If you add an event listener to a removed DOM element without removing the listener, the element can\'t be garbage-collected.' },

  { id: 'q18-1', lessonId: 'l18', question: 'What does the yield keyword do in a generator?', options: ['Exits the function', 'Pauses execution and returns a value, resuming on next call', 'Throws an error', 'Declares a return type'], correctIndex: 1, explanation: 'yield pauses the generator and "emits" a value. Calling next() resumes from where it left off.' },
  { id: 'q18-2', lessonId: 'l18', question: 'What makes an object iterable?', options: ['Having a .length property', 'Implementing [Symbol.iterator]() that returns an iterator object', 'Being an array', 'Having a forEach method'], correctIndex: 1, explanation: 'Any object with a [Symbol.iterator]() method that returns an iterator ({ next() }) can be used with for...of and spread.' },
  { id: 'q18-3', lessonId: 'l18', question: 'What is lazy evaluation?', options: ['Slow code execution', 'Computing values only when they are actually needed', 'Deferring variable declaration', 'A generator anti-pattern'], correctIndex: 1, explanation: 'Generators are lazy: they compute and yield values one at a time on demand, not all at once. Great for infinite sequences.' },
  { id: 'q18-4', lessonId: 'l18', question: 'What does generator.next().done = true indicate?', options: ['The generator has an error', 'The generator has finished yielding values', 'The next value is undefined', 'The generator needs to be reset'], correctIndex: 1, explanation: 'When done is true, the generator has returned. Subsequent next() calls return {value: undefined, done: true}.' },
  { id: 'q18-5', lessonId: 'l18', question: 'What is a use case for generators?', options: ['DOM manipulation', 'Infinite sequences, paginated data fetching, state machines', 'Event handling', 'CSS animations'], correctIndex: 1, explanation: 'Generators excel at infinite sequences (IDs, fibonacci), async workflows (redux-saga), and lazy data processing pipelines.' },

  { id: 'q19-1', lessonId: 'l19', question: 'What problem does the Observer pattern solve?', options: ['Data storage', 'Decoupling producers from consumers so state changes notify all subscribers', 'Inheritance chains', 'Module loading'], correctIndex: 1, explanation: 'Observer allows many components to react to changes without tight coupling. The subject notifies all registered observers on change.' },
  { id: 'q19-2', lessonId: 'l19', question: 'What is the Singleton pattern?', options: ['A class with one method', 'Ensuring a class has only one instance, providing a global access point', 'A function that runs once', 'A module with one export'], correctIndex: 1, explanation: 'Singleton restricts instantiation to one object. Useful for shared resources like config managers or connection pools.' },
  { id: 'q19-3', lessonId: 'l19', question: 'Why use the Factory pattern?', options: ['To make functions faster', 'To encapsulate object creation logic and return different types based on input', 'To prevent subclassing', 'To manage memory'], correctIndex: 1, explanation: 'Factory centralizes and abstracts object creation. The caller doesn\'t need to know which class to instantiate.' },
  { id: 'q19-4', lessonId: 'l19', question: 'What is the Strategy pattern?', options: ['A code review technique', 'Defining a family of interchangeable algorithms and selecting one at runtime', 'A deployment strategy', 'A testing approach'], correctIndex: 1, explanation: 'Strategy encapsulates different algorithms behind a common interface, letting you swap them without changing the calling code.' },
  { id: 'q19-5', lessonId: 'l19', question: 'What principle do design patterns generally promote?', options: ['More code is better', 'Tight coupling for performance', 'Separation of concerns and loose coupling', 'Using global variables'], correctIndex: 2, explanation: 'Design patterns promote separation of concerns, open/closed principle, and loose coupling for more maintainable and testable code.' },

  { id: 'q20-1', lessonId: 'l20', question: 'What is the difference between debounce and throttle?', options: ['They are the same', 'Debounce fires after a pause in activity; throttle fires at most once per interval', 'Throttle fires after a pause; debounce fires at intervals', 'Debounce is for clicks; throttle is for scrolls'], correctIndex: 1, explanation: 'Debounce: fires only after the activity STOPS for X ms (e.g., search input). Throttle: fires at most once per X ms regardless (e.g., scroll).' },
  { id: 'q20-2', lessonId: 'l20', question: 'What is a common cause of memory leaks?', options: ['Using const', 'Event listeners that are never removed', 'Using arrow functions', 'Short variable names'], correctIndex: 1, explanation: 'Unremoved event listeners, timers (setInterval), and references to detached DOM nodes are the most common JS memory leak sources.' },
  { id: 'q20-3', lessonId: 'l20', question: 'What API can you use to measure code performance?', options: ['console.time()', 'performance.mark() and performance.measure()', 'Date.now() difference', 'All of the above are valid'], correctIndex: 3, explanation: 'All three work. performance.mark/measure is most accurate (uses high-resolution timer). console.time() is convenient. Date.now() is less precise.' },
  { id: 'q20-4', lessonId: 'l20', question: 'What is virtual scrolling?', options: ['Scrolling through virtual reality', 'Rendering only the visible portion of a large list, not all items', 'CSS scroll-snap', 'Infinite scroll'], correctIndex: 1, explanation: 'Virtual scrolling renders only visible DOM nodes for huge lists, keeping performance smooth regardless of dataset size.' },
  { id: 'q20-5', lessonId: 'l20', question: 'Which of these is a JavaScript best practice?', options: ['Use var for all variables', 'Use == for comparisons', 'Handle all promise rejections', 'Use deeply nested callbacks'], correctIndex: 2, explanation: 'Always handle promise rejections (try/catch or .catch()). Unhandled rejections can crash Node.js processes and hide bugs in browsers.' },
]

export function getLessonQuestions(lessonId: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.lessonId === lessonId)
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id)
}

export function getLessonsByWeek(week: number): Lesson[] {
  return lessons.filter(l => l.week === week).sort((a, b) => a.order - b.order)
}

export function getWeekLabel(week: number): string {
  const labels: Record<number, string> = {
    1: 'Week 1 — Basics',
    2: 'Week 2 — Intermediate',
    3: 'Week 3 — Advanced',
    4: 'Week 4 — Advanced & Patterns',
  }
  return labels[week] ?? `Week ${week}`
}
