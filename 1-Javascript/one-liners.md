1. calculate the cumulative sum of an array

```
const cumulativeSum = arr => arr.reduce((acc, num) => [...acc, acc.length ? acc[acc.length - 1] + num : num], []);
```

2. write a function in JavaScript to split an array into chunks of a specified size

```
const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
```

3. find the longest consecutive sequence of a specific element in an array

```
const longestConsecutiveSequence = (arr, element) => Math.max(...arr.join('').split(element).map(group => group.length));
```

4. transpose a 2D matrix

```
const transposeMatrix = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));
```

5. convert a string containing hyphens and underscores to camel case

```
const toCamelCase = str => str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
```

6. swap the values of two variables without using a temporary variable

```
[a, b] = [b, a];
```

7. create a countdown from a given number

```
const countdown = n => Array.from({ length: n }, (_, i) => n - i);
```

8. convert a string to an integer while handling non-numeric characters gracefully

```
const stringToInteger = str => +str === +str ? +str : 0;

stringToInteger("123"); // Output: 123
stringToInteger("abc"); // Output: 0
```

9. convert a decimal number to its binary representation

```
const decimalToBinary = num => num.toString(2);
```

10. calculate the factorial of a given non-negative integer

```
const factorial = (n) => n === 0 ? 1 : Array.from({length: n}, (_, i) => i + 1).reduce((acc, num) => acc * num, 1);
// try array reduce
```

11. safely access a deeply nested property of an object without throwing an error if any intermediate property is undefined

```
const deepAccess = (obj, path) => path.split('.').reduce((acc, key) => acc && acc[key], obj);

const nestedObject = { a: { b: { c: 42 } } };
const propertyPath = 'a.b.c';
const result = deepAccess(nestedObject, propertyPath);
// result: 42
```

12. generate a random integer between a specified minimum and maximum value (inclusive)

```
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

13. count the occurrences of each element in an array and return the result as an object

```
const countOccurrences = (arr) => arr.reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});

const inputArray = [1, 2, 2, 3, 4, 4, 4, 5];
const result = countOccurrences(inputArray);
// result: { 1: 1, 2: 2, 3: 1, 4: 3, 5: 1 }
```

14. capitalize the first letter of each word in a given sentence

```
const capitalizeWords = (sentence) => sentence.replace(/\b\w/g, char => char.toUpperCase());
```

15. reverse a given string

```
const reverseString = (str) => str.split('').reverse().join('');
```

16. find the longest word in a given sentence

```
const longestWord = (sentence) => sentence.split(' ').reduce((longest, word) => word.length > longest.length ? word : longest, '');
```

17. rename a specific property in an object

```
const renameProperty = (obj, oldName, newName) => ({ ...obj, [newName]: obj[oldName], ...(delete obj[oldName], obj) });

const person = { firstName: 'John', lastName: 'Doe', age: 30 };
const updatedPerson = renameProperty(person, 'firstName', 'first');
// updatedPerson: { first: 'John', lastName: 'Doe', age: 30 }
```

18. second-largest element in an array

```
const secondLargest = (arr) => [...new Set(arr)].sort((a, b) => b - a)[1];

const array = [5, 2, 8, 9, 2, 4, 7];
const result = secondLargest(array);
// result: 7
```

19. group an array of objects by a specified property

```
const groupByProperty = (arr, property) => arr.reduce((grouped, obj) => ({ ...grouped, [obj[property]]: [...(grouped[obj[property]] || []), obj] }), {});

const people = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Alice', age: 28 },
];

const result = groupByProperty(people, 'name');
// result: { 'Alice': [ { id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Alice', age: 28 } ],
//           'Bob': [ { id: 2, name: 'Bob', age: 30 } ] }
```

20. find the missing number in an array of consecutive integers from 1 to N

```
const findMissingNumber = (arr) => (arr.length + 1) * (arr.length + 2) / 2 - arr.reduce((sum, num) => sum + num, 0);

const arr = [1, 2, 3, 5, 6, 7, 8];
const result = findMissingNumber(arr);
// result: 4
```

21. reverse the key-value pairs of an object

```
const reverseObject = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

const originalObject = { a: 1, b: 2, c: 3 };
const reversedObject = reverseObject(originalObject);
// reversedObject: { '1': 'a', '2': 'b', '3': 'c' }
```

22. check if a given string has balanced parentheses

```
const isBalancedParentheses = (str) => str.split('').reduce((count, char) => count >= 0 ? count + (char === '(' ? 1 : char === ')' ? -1 : 0) : -1, 0) === 0;

const str = '(a + b) * (c - d)';
const result = isBalancedParentheses(str);
// result: true

// write a JavaScript function to check if a given string has balanced brackets
const areBracketsBalanced = (str) => !str.split('').reduce((count, char) => (char === '(' || char === '[' || char === '{') ? ++count : (char === ')' || char === ']' || char === '}') ? --count : count, 0);

const s1 = '({[]})';
const r1 = areBracketsBalanced(s1); // r1: true

const s2 = '({[})';
const r2 = areBracketsBalanced(s2); // r2: false
```

23. write a concise function in JavaScript to implement a simple debounce function that delays the execution of a given function until after a specified time interval has passed without additional calls

```
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }
};

const delayedLog = debounce((text) => console.log(text), 1000);
delayedLog('Hello'); // Logs 'Hello' after 1000 milliseconds
delayedLog('World'); // Cancels the previous timeout and sets a new one for 'World'
```

24. write a JavaScript function to truncate a given string to a specified length and append “…” if it exceeds that length

```
const truncateString = (str, maxLength) => str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
```

25. write a throttle function in JavaScript to implement a simple throttle function that limits the execution of a given function to once every specified time interval

```
const throttle = (func, delay) => {
  let throttled = false;
  return (...args) => {
    if (!throttled) {
      func(...args);
      throttled = true;
      setTimeout(() => throttled = false, delay);
    }
  }
};

const throttledLog = throttle((text) => console.log(text), 1000);
throttledLog('Hello'); // Logs 'Hello'
throttledLog('World'); // Does not log 'World' because it's within the 1000ms throttle interval
```

26. write a JavaScript function to check if a given string has all unique characters

```
const hasUniqueCharacters = (str) => new Set(str).size === str.length;
```

27. write a JavaScript function to find the first non-repeated character in a given string

```
const firstNonRepeatedChar = (str) => str.split('').find(char => str.indexOf(char) === str.lastIndexOf(char));
```

28. write a JavaScript function to flatten a nested object?

```
const flattenObject = (obj) => Object.assign({}, ...(function flattenObj(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? flattenObj({ [k]: o[k] }) : { [k]: o[k] }))})(obj));

const o = { a: 1, b: { c: 2, d: { e: 3 } } };
const r = flattenObject(o);
// r: { a: 1, 'b.c': 2, 'b.d.e': 3 }
```

29. write a JavaScript function to rotate the elements of an array to the right by a specified number of positions

```
const rotateArray = (arr, positions) => arr.slice(-positions).concat(arr.slice(0, -positions));

const arr = [1, 2, 3, 4, 5];
const pos = 2;
const result = rotateArray(arr, pos);
// result: [4, 5, 1, 2, 3]
```

30. write a JavaScript function to convert a given number of minutes into hours and minutes

```
const convertToHoursAndMinutes = (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

const r = convertToHoursAndMinutes(125);
// r: '2h 5m'
```

31. write a JavaScript function to generate a random password of a specified length

```
const generateRandomPassword = (length) => Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('');

const pass = generateRandomPassword(12);
// pass: '$2#XrGp^@L9'
```

32. write a JavaScript function to convert an RGB color to its hexadecimal representation

```
const rgbToHex = (r, g, b) => `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
```

33. write a JavaScript function to generate a unique identifier

```
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

const uniqueId = generateUniqueId();
// uniqueId: 'abc123xyz'
```

34. write a JavaScript function that returns a promise which resolves after a specified delay

```
const delayPromise = (ms) => new Promise(resolve => setTimeout(resolve, ms));
```

35. write a JavaScript function to convert an object to a query string

```
const objectToQueryString = (obj) => Object.entries(obj).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

const o = { name: 'John Doe', age: 30, city: 'Example City' };
const qs = objectToQueryString(o);
// qs: 'name=John%20Doe&age=30&city=Example%20City'
```

36. write a JavaScript function to check if two objects have the same properties (regardless of order)

```
const haveSameProperties = (obj1, obj2) => JSON.stringify(Object.keys(obj1).sort()) === JSON.stringify(Object.keys(obj2).sort());

const o1 = { name: 'John', age: 30, city: 'Example City' };
const o2 = { age: 30, name: 'John', city: 'Example City' };

const r = haveSameProperties(o1, o2);
// r: true
```

37. write a JavaScript function to count the occurrences of each word in a given sentence

```
const countWordOccurrences = (sentence) => sentence.split(' ').reduce((countMap, word) => ({ ...countMap, [word]: (countMap[word] || 0) + 1 }), {});

const s = 'the quick brown fox jumps over the lazy dog jumps over the fence';
const r = countWordOccurrences(s);
console.log(r);
/*
r:
{
  'the': 3,
  'quick': 1,
  'brown': 1,
  'fox': 1,
  'jumps': 2,
  'over': 2,
  'lazy': 1,
  'dog': 1,
  'fence': 1
}
*/
```

38. write a JavaScript function to generate a random color in hexadecimal format

```
const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;
```

39. write a JavaScript function to implement a simple caching function that stores the result of a function for a given input and returns the cached result if the same input is provided again

```
const createCache = (func) => {
  const cache = new Map();
  return (...args) => cache.has(JSON.stringify(args)) ? cache.get(JSON.stringify(args)) : (cache.set(JSON.stringify(args), func(...args)), cache.get(JSON.stringify(args)));
};

const add = (a, b) => a + b;
const cachedAdd = createCache(add);

cachedAdd(2, 3); // Output: 5 (calculated and cached)
cachedAdd(2, 3); // Output: 5 (returned from cache)
```

40. write a JavaScript function to generate an array of specified length filled with random numbers

```
const generateRandomArray = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

const arr = generateRandomArray(5);
// arr: [42, 18, 75, 3, 91]
```

41. write a simple event emitter in JavaScript

```
const createEventEmitter = () => {
  const listeners = new Map();
  return {
    on: (event, listener) => listeners.has(event) ? listeners.get(event).push(listener) : listeners.set(event, [listener]),
    emit: (event, ...args) => listeners.get(event)?.forEach(listener => listener(...args)),
    off: (event, listener) => listeners.set(event, listeners.get(event)?.filter(l => l !== listener)),
  };
};


const eventEmitter = createEventEmitter();

const greetListener = (name) => console.log(`Hello, ${name}!`);
eventEmitter.on('greet', greetListener);

eventEmitter.emit('greet', 'Alice'); // Output: 'Hello, Alice!'
eventEmitter.off('greet', greetListener);

eventEmitter.emit('greet', 'Bob'); // No output (listener removed)
```

42. write a JavaScript function to implement a basic queue using arrays with enqueue and dequeue operations

```
const createQueue = () => ({
  items: [],
  enqueue: (item) => (items.push(item)),
  dequeue: () => items.shift()
});

const queue = createQueue();
queue.enqueue('item1');
queue.enqueue('item2');
queue.dequeue(); // Output: 'item1'
queue.dequeue(); // Output: 'item2'
```

43. write a JavaScript function to implement a basic stack using arrays with push and pop operations

```
const createStack = () => ({
  items: [],
  push: (item) => items.push(item),
  pop: () => items.pop()
});

const stack = createStack();
stack.push('item1');
stack.push('item2');
stack.pop(); // Output: 'item2'
stack.pop(); // Output: 'item1'
```
