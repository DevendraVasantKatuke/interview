1. Destructuring with Aliases 🧩
Destructuring is a technique that allows you to extract values from objects and arrays.

With the introduction of aliases, you can destructure values and assign them to new variable names in a single step.

This can make your code more concise and improve readability.
```
const person = { firstName: 'John', lastName: 'Doe', age: 30 };
const { firstName: fName, lastName: lName } = person;

console.log(fName); // Output: John
console.log(lName); // Output: Doe
```

2. Optional Chaining 🌐
The optional chaining operator (?.) allows you to access nested properties of an object without worrying about whether intermediate properties are null or undefined.

This helps prevent those dreaded "Cannot read property 'x' of null" errors.
```
const user = {
  info: {
    address: {
      street: '123 Main St',
      city: 'Exampleville'
    }
  }
};

const city = user?.info?.address?.city;
console.log(city); // Output: Exampleville
```

3. Nullish Coalescing Operator 🎭
The nullish coalescing operator (??) is used to provide a default value when dealing with null or undefined values.

It differs from the traditional || operator in that it only considers nullish values (null or undefined), ignoring falsy values (false, 0, '', etc.).

```
const defaultValue = 'Default';
const userInput = null;

const value = userInput ?? defaultValue;
console.log(value); // Output: Default
```

4. Dynamic Object Keys 🚪
You can now use expressions to define dynamic object keys within object literals using square brackets.
```
const dynamicKey = 'dynamicProperty';
const obj = {
  [dynamicKey]: 'This is a dynamically named property'
};

console.log(obj.dynamicProperty); // Output: This is a dynamically named property
```

5. Private Class Fields 🔒
JavaScript classes now support private fields using the # symbol. Private fields are inaccessible from outside the class, providing encapsulation and information hiding.
```
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // Output: 1
```

6. Promise.allSettled() 🌈
The Promise.allSettled() method returns a promise that resolves after all of the given promises have either resolved or rejected, providing the outcome of each promise in an array.
```
const promises = [
  Promise.resolve('Resolved'),
  Promise.reject('Rejected')
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
  });
// Output: [{ status: "fulfilled", value: "Resolved" }, { status: "rejected", reason: "Rejected" }]
```

7. The globalThis Object 🌎
The globalThis object provides a consistent way to access the global object across different environments, including browsers and Node.js.
```
console.log(globalThis === window); // In a browser, outputs: true
console.log(globalThis === global); // In Node.js, outputs: true
```

8. RegExp Match Indices 🔍
Regular expression matches now provide information about the indices where the match occurred.
```
const text = 'Hello, world!';
const pattern = /world/;

const match = text.match(pattern);
console.log(match.index); // Output: 7
```

9. flatMap() 📜
The flatMap() method combines the effects of map() and flat() in a single step.

It maps each element using a mapping function, then flattens the result to a depth of 1.
```
const numbers = [1, 2, 3];
const doubledAndFlattened = numbers.flatMap(num => [num * 2]);

console.log(doubledAndFlattened); // Output: [2, 4, 6]
```

10. Logical Assignment Operators 🎩
JavaScript introduces logical assignment operators (&&=, ||=, and ??=) that combine logical operations with assignment in a concise manner.
```
let x = false;
x ||= true;

console.log(x); // Output: true
```