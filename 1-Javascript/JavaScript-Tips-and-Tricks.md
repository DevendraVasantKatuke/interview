1. Destructuring Magic: Extract Values with Ease

Destructuring allows you to unpack values from arrays or objects in a breeze. Here's an example:
```
const person = { name: 'Alice’, age: 30 };
const { name, age } = person;
console.log(name); // Output: Alice
console.log(age); // Output: 30
```

2. Spread the Love: Clone Arrays and Merge Objects

The spread operator (`...`) lets you create copies of arrays and merge objects effortlessly:
```
const originalArray = [1, 2, 3];
const clonedArray = [...originalArray];
console.log(clonedArray); // Output: [1, 2, 3]
```
Merging objects:
```
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // Output: { a: 1, b: 3, c: 4 }
```
3. The Power of `map()`: Transform with Ease

The `map()` method is your secret weapon for transforming data:
```
const numbers = [1, 2, 3];
const squared = numbers.map(num => num * num);
console.log(squared); // Output: [1, 4, 9]
```
4. Short-circuit with `&&` and `||`: Elegant Conditionals

Use `&&` and `||` to create clean and concise conditionals:
```
const name = user.name || 'Guest';
console.log(name); // Output: Guest
```

5. Chaining `setTimeout()`: Sequencing Delays

Chaining `setTimeout()` creates a sequence of delayed actions:
```
function delayedLog(message, time) {
  setTimeout(() => {
    console.log(message);
  }, time);
}
delayedLog('Hello', 1000); // Output (after 1 second): Hello
```

6. Arrow Functions: Concise and Powerful

Arrow functions (`() => {}`) are not only concise, but they also preserve the value of `this`:
```
const greet = name => `Hello, ${name}!`;
console.log(greet(’Alice’)); // Output: Hello, Alice!
```

7. Mastering `Promise.all()`: Handle Multiple Promises

Combine multiple promises and handle them collectively using `Promise.all()`:
```
const promise1 = fetch('url1');
const promise2 = fetch('url2');
Promise.all([promise1, promise2])
  .then(responses => console.log(responses))
  .catch(error => console.error(error));
```

8. Dynamic Property Names: Versatile Object Keys

You can use variables as object property names using square brackets:
```
const key = 'name';
const person = { [key]: 'Alice' };
console.log(person.name); // Output: Alice
```

9. Template Literals Magic: String Formatting

Template literals (`${}`) allow you to embed expressions in strings:
```
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello, Alice!
```

10. NaN Checking: A Safer Alternative

Use `Number.isNaN()` to accurately check if a value is NaN:
```
const notANumber = 'Not a number';
console.log(Number.isNaN(notANumber)); // Output: false
```

11. Optional Chaining (`?.`): Tame Undefined Values

Avoid errors with optional chaining when dealing with nested properties:
```
const user = { info: { name: 'Alice' } };
console.log(user.info?.age); // Output: undefined
```

12. Regex Revival: Mastering Patterns

Regular expressions (`RegExp`) are powerful tools for pattern matching:
```
const text = 'Hello, world!';
const pattern = /Hello/g;
console.log(text.match(pattern)); // Output: ['Hello']
```

13. JSON.parse() Reviver: Transform Parsed Data

The `reviver` parameter in `JSON.parse()` lets you transform parsed JSON:
```
const data = '{"age":"30"}';
const parsed = JSON.parse(data, (key, value) => {
  if (key === 'age') return Number(value);
  return value;
});
console.log(parsed.age); // Output: 30
```
14. Cool Console Tricks: Debugging Delights

Go beyond `console.log()` with `console.table()` and `console.groupCollapsed()`:
```
const users = [{ name: 'Alice' }, { name: 'Bob' }];
console.table(users);
console.groupCollapsed(’Details’);
console.log(’Name: Alice’);
console.log(’Age: 30’);
console.groupEnd();
```

15. Fetch with `async`/`await`: Asynchronous Simplicity

`async`/`await` with `fetch()` simplifies handling asynchronous requests:
```
async function fetchData() {
  try {
    const response = await fetch('url');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```

16. Closures Unleashed: Data Privacy

Closures let you create private variables in functions:
```
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter(); // Output: 1
counter(); // Output: 2
```

17. Memoization for Speed: Efficient Recalculation

Memoization caches function results for improved performance:
```
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // Output: 55
```

18. Hail the Intersection Observer: Effortless Scroll Effects

Use the Intersection Observer API for lazy loading and scroll animations:
```
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
});

const elements = document.querySelectorAll('.animate');
elements.forEach(element => observer.observe(element));
```

19. ES6 Modules for Clean Code: Organized and Modular

Use ES6 modules for clean, modular code:
```
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3)); // Output: 5
```

20. Proxies: Beyond Objects

Proxies allow you to intercept and customize object operations:
```
const handler = {
  get(target, prop) {
    return `Property "${prop}" doesn't exist.`;
  }
};

const proxy = new Proxy({}, handler);
console.log(proxy.name); // Output: Property "name" doesn’t exist.
```

21. Shortening console.log

Developers always like to save time, but writing console.log, again and again, sometimes it's tedious. But this next trick will show you how To minify your console.log file, see the code snippet below.
```
var a = console.log.bind(document)
a(3*4)
a("Welcome to YourQuorum")
a(true)
```

22. Short Conditions

Instead of writing multiple lines of conditional code, you can write it in a single line. This hack shows you how to do it. This is useful when working in multiple conditions at the same time.
```
// Short Conditions
var condtion = true
if(condtion)
{
  console.log("Login Successful")
}
// Short condtion
condtion && console.log("Login Successful")
```

23. Flat Multi-dimension Array

This hack will help you flatten matrices in a way, see code snippet below.
```
//deep flatten
var array = [100, [200, [300, 400, 500], 600], [700, 800,[900,[1000]]]]
console.log(array.flat(Infinity)) // [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
```

24. console.table()

This awesome trick will help you convert your data from CSV or dictionary format to spreadsheet format using the console.table() method.
```
// Console.table
var data=[{"category":"Discussion"}, {"category":"Health"}, {"category":"Education"}]
console.table(data)
```

25. Multiple Replace

We know we can use the replace() method to replace words in a string, but what about multiple replaced words in the same string? This trick will help you do it with the replace() method by adding a /g keyword at the end. Look at the following code to understand it.
```
// Multiple Replace
var data = "JavaScript is JavaScript"
//Single
console.log(data.replace(/JavaScript/, "TypeScript")) // TypeScript is JavaScript
//Multiple 
console.log(data.replace(/JavaScript/g, "TypeScript")) // TypeScript is TypeScript
```

26. Number and String Conversion

Conversion is a part of every programming language and in JavaScript you can easily convert numbers to strings and strings to numbers. See the code below.
```
// Number to String
var data1 = 200 
data1 = data1 + ""
console.log(data1) // 200
console.log(typeof(data1)) //String
// String to number
var data2 = "200"
data2 =+ data2
console.log(typeof(data2)) //number
```

27. Infinite Parameter in a Function

Suppose you passed 100 arguments in the function and now you have a problem to set 100 parameters in the function implementation. This problem is solved by this trick which shows you how to use remainder parameters to cover the infinite definition of parameters in the function.
```
// Infinite function parameter
function fun(...data)
{
  for(let i of data)
  {
    console.log(i) // 1 3 4 5 6
  }
}
fun(1 ,3, 4, 5, 6)
```

28. Shuffle an Array

Array shuffling can be done in an easy way by following the example code. This mostly comes in handy when you’re working on some game project in JavaScript and you need to shuffle your array.
```
// Shuffle An Array
var array = [100, 200, 300];
console.log(array.sort(function() 
{
    return Math.random() - 0.5 
}));
// [100, 300, 200]
```

29. Get the Last Item in an Array

This tip This saves you from iterating over the whole array to get the last element.In the code example below, we are using an array slice method with a negative number -1 that takes the elements from the last.
```
// Get last element of Array
let array = [100, 200, 300, 400, 500]
console.log(array.slice(-1)) // [500]
console.log(array.slice(-2)) // [400, 500]
```

30. Time the execution of your code
```
console.time('Execution Time');

await functionToBeMeasured();

console.timeEnd('Execution Time');
```
The time method is an invaluable tool for developers who want to deliver high-performance code. It takes a timer name as a parameter and expects to receive a call to timeEnd in which the same timer name is provided.

The timeEnd method returns the elapsed time in milliseconds between two function calls, allowing programmers to quickly identify bottlenecks in their code and easily refactor them.

This approach is much better than manually calculating elapsed execution time because it is built-in and widely supported by modern browsers.

31. Casting values in arrays using map
```
const numbers = ["65", "12", "4", "-0.23", "6.543"];
const newArr = numbers.map(Number)
console.log(newArr) //Array(5)[ 65,12,4,-0.23,6.543 ]
```
This is probably one of the simplest tricks in this article, but it provides a very elegant solution for converting an array of numeric values ​​represented as strings to JavaScript numbers (all JavaScript numbers are 64-bit floating point).

map method of Array and passing Number as a parameter for each array value, calls the constructor of Number and this return result.

32. Wait until multiple promises are complete
```
const promises = [
Promise.resolve(100),
fetch("http://localhost/"),
fetch("http://localhost/api/v1l/books"),
];

const statusPromises = await Promise.all(promises);
console.log(statusPromises); // ©: 100, 1: Request response, 2: Request response
console.log("Promises finished execution");
```
This trick is handy when you need to run multiple tasks and wait for them to complete. Since each task is executed asynchronously, they can be processed in parallel, and the returned data can be used after all promises have been resolved.

Remember that if a single promise is rejected, Promise.all will also immediately return a rejected promise.

You can use this trick if you are developing a microservices architecture and need large non-sequential data as quickly as possible from multiple points ending in.

O Once all the promises are resolved, Promise.all returns a promise that resolves to an array of the results of the originally provided promises.

As with any promise, you can also specify a callback to process the results.

33. Remove duplicates from arrays using Set
```
const numbers = [1, 2, 3, 4, 4, 4, 4, 5, 6, 6, 7];
const fruits = ["apple”, "pear", "banana", “apple”, "apple", “cherry"];

const uniqueNumbers ..new Set(numbers)];
const uniqueFruits = [...new Set(fruits)];

console. log(uniqueNumbers); // [ 1, 2, 3, 4, 5, 6, 7 ]
console. log(uniqueFruits); // ["apple”, "pear", “banana”, "cherry"
```
A simple but very effective way to remove duplicate arrays with a single line.

In this example, we also used the spread operator shown recently to expand the array and create an array.

This trick works great with values ​​of all kinds and even fixes some of JavaScript’s weird equality behavior.

You can also use arrays to remove duplicate arrays of complex objects.

34. Use the spread operator to shallow copy objects (and arrays!)
```
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const person = {
name: "Lewis",
active: false,
}

console. log([...numbers, 9, 10]); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log({ ...person, active: true }); // { name: "Lewis", active: true }
console.log({ ...person, age: 25 }); // { name: "Lewis", active: false, age: 25 }
```
With the introduction of extended syntax in JavaScript, it is now easier than ever to extend objects or arrays and make copies.

This is especially useful when you need to manage state in React or React Native, as all you have to do is copy the current state with the object literal, change selected properties, and change state with the state binding provided by useState.

This is also a great way to concatenate arrays or merge objects with a single line instead of having to iterate over each instance and manually merge them.

35. Function default params
```
let greetings = (name, message='Hello,') => {
    return `${message} ${name}`;
}

console.log(greetings('Jack'));
console.log(greetings('Jack', 'Hola!'));
```
In JavaScript, function arguments (or parameters) are like variables local to that function. You may or may not pass values ​​to it when calling the function. If you don’t pass a value for a parameter, the parameter becomes undefined and can lead to unwanted side effects.

There is an easy way to pass a default value when setting function parameters. Here is an example where we pass the default value Hello to the message parameter of the Greetings function.

36. Leverage the destructuring assignment syntax
```
const company = {
employees: 10,
founder: "John Doe",
products: ["Phones”, "Hardware", “Laptops"],
};


const { employees, founder } = company;
const { @: phones, 2: laptops } = company.products;

console.log(employees); // 10
console.log(founder); // John Doe
console.log(phones); // Phones
console.log(laptops); // Laptops
```
Another quick and easy trick you can use to extract the information most relevant to you from a JavaScript object.

The Destruct syntax allows developers to quickly unpack values ​​from arrays or object properties into named variables.

This syntax allows for several tricks, e.g. For example, swapping single-line variables or parsing only the meaning of properties of a returned object.

37. The default value with OR

If you ever want to set a default value for a variable, you can easily do so with the OR(||) operator.
```
let person = {name: 'Emma'};
let age = person.age || 35; // sets the value 35 if age is undefined
console.log(`Age of ${person.name} is ${age}`);
```
But wait, he has a problem. What if the person is 0 years old (maybe a newborn)? Age is calculated as 35 (0 || 35 = 35). This is unexpected behavior.

Enter the nullish coalescing operator (??).It is a logical operator that returns its right operand if its left operand is nullor undefined, and returns its left operand otherwise.

To complete the above code with the ??rewrite operator,
```
let person = {name: 'Jack'};
let age = person.age ?? 35; // sets the value 0 if age 0, 35 in case of undefined and null
console.log(`Age of ${person.name} is ${age}`);
```

38. Format JSON output with spaces

A simple but very efficient tool to export readable JSON by specifying in the third parameter the number of spaces to use for indentation.

The second parameter is replacement and can be a function that controls the string building process or it can be an array. In this case, it specifies the name of the properties to include in the string output.
```
const profile = {
name: "Emma",
age: 23,
dateJoined: "11-01-2019",
};

JSON.stringify(profile, null, 2);

//{

// "name": "Emma",

// Tage": 23,

// “"dateJoined": "11-01-2019"
//}
```

39. isInteger
```
let mynum = 123;
let mynumStr = "123";

console.log(`${mynum} is a number?`, Number.isInteger(mynum));
console.log(`${mynumStr} is a number?`, Number.isInteger(mynumStr));
//123 is a number?
//true
//123 is a number?
//false
```
There is a much easier way to determine if a value is an integer. The JavaScript Numbers API provides a method called isInteger() for this purpose. It is very useful and it is better to be aware of it.