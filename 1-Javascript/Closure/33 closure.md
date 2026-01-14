# Variable scope, closure
```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```
## Lexical Environment
### Step 1. Variables
In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.

The Lexical Environment object consists of two parts:

1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

A closure is a function that remembers its outer variables and can access them. 

In JavaScript, all functions are naturally closures. There is only one exception, `new function`.

## Garbage collection

### Real-life optimizations

As we've seen, in theory while a function is alive, all outer variables are also retained.
```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
      // In theory, it should be accessible, but the engine optimized it out.
  }

  return g;
}

let g = f();
g();
```
That may lead to funny (if not such time-consuming) debugging issues. One of them -- we can see a same-named outer variable instead of the expected one:

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```
### Here a counter object is made with the help of the constructor function.
```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
### Sum with closures
```js run
function sum(a) {
  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };
}

alert( sum(1)(2)); // 3
alert( sum(5)(-1)); // 4
```
### What will be the result of this code?
```js
let x = 1;

function func() {
  console.log(x); // Error

  let x = 2;
}

func();
```
### Filter inBetween
```js run
function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
```
### Filter inArray
```js run demo
function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
### sort by field
```javascript
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

// The usual way to do that would be:
users.sort((a, b) => a.name > b.name ? 1 : -1);
users.sort((a, b) => a.age > b.age ? 1 : -1);

// We make it even less verbose, like this
users.sort(byField('name'));
users.sort(byField('age'));
function byField(fieldName){
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}
```
### Army of functions
The following code creates an array of `shooters`.
Every function is meant to output its number.
```javascript
function makeArmy() {
    let shooters = [];
    for(let i = 0; i < 10; i++) {
        let shooter = function() { // shooter function
            alert( i ); // should show its number
        };
        shooters.push(shooter);
    }
      return shooters;
}
let army = makeArmy();
army[0](); // 0
army[5](); // 5
 ```