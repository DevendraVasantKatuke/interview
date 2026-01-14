- 📜 [Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- 📜 [Closure — JavaScript.Info](https://javascript.info/closure)
- 📜 [I never understood JavaScript closures — Olivier De Meulder](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)
- 📜 [Understand JavaScript Closures With Ease — Richard Bovell](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
- 📜 [Understanding JavaScript Closures — Codesmith](https://codeburst.io/understanding-javascript-closures-da6aab330302)
- 📜 [Understand Closures in JavaScript — Brandon Morelli](https://codeburst.io/understand-closures-in-javascript-d07852fa51e7)
- 📜 [A simple guide to help you understand closures in JavaScript — Prashant Ram](https://medium.freecodecamp.org/javascript-closures-simplified-d0d23fa06ba4)
- 📜 [Understanding JavaScript Closures: A Practical Approach — Paul Upendo](https://scotch.io/tutorials/understanding-javascript-closures-a-practical-approach)
- 📜 [Understanding JavaScript: Closures — Alexander Kondov](https://hackernoon.com/understanding-javascript-closures-4188edf5ea1b)
- 📜 [How to use JavaScript closures with confidence — Léna Faure](https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b)
- 📜 [JavaScript closures by example — tyler](https://howchoo.com/g/mge2mji2mtq/javascript-closures-by-example)
- 📜 [JavaScript — Closures and Scope — Alex Aitken](https://codeburst.io/javascript-closures-and-scope-3784c75b9290)
- 📜 [Discover the power of closures in JavaScript — Cristi Salcescu](https://medium.freecodecamp.org/discover-the-power-of-closures-in-javascript-5c472a7765d7)
- 📜 [The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript — Tyler McGinnis](https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)
- 📜 [Getting Closure — RealLifeJS](http://reallifejs.com/the-meat/getting-closure/)
- 📜 [Closure, Currying and IIFE in JavaScript — Ritik](https://dev.to/ritik_dev_js/what-the-hack-is-closure-currying-and-iife-in-javascript-32m9)
- 📜 [Understanding Closures in JavaScript — Sukhjinder Arora](https://blog.bitsrc.io/a-beginners-guide-to-closures-in-javascript-97d372284dda)
- 📜 [A basic guide to Closures in JavaScript — Parathan Thiyagalingam](https://medium.freecodecamp.org/a-basic-guide-to-closures-in-javascript-9fc8b7e3463e)
- 📜 [Closures: Using Memoization — Brian Barbour](https://dev.to/steelvoltage/closures-using-memoization-3597)
- 📜 [A Brief Introduction to Closures and Lexical Scoping in JavaScript — Ashutosh K Singh](https://medium.com/better-programming/a-brief-introduction-to-closures-and-lexical-scoping-in-javascript-8a5866496232)
- 📜 [Demystify Closures — stereobooster](https://dev.to/stereobooster/demystify-closures-5g42)
- 📜 [Scopes and Closures - JavaScript Concepts — Agney Menon](https://dev.to/boywithsilverwings/scopes-and-closures-javascript-concepts-4dfj)
- 📜 [Understanding Closures in JavaScript — Matt Popovich](https://dev.to/mattpopovich/understanding-closures-in-javascript-3k0d)
- 📜 [whatthefuck.is · A Closure - Dan Abramov](https://whatthefuck.is/closure)
- 📜 [Closures in JavaScript can... - Brandon LeBoeuf](https://dev.to/brandonleboeuf/closure-in-javascript-49n7)
- 🎥 [JavaScript The Hard Parts: Closure, Scope & Execution Context - Codesmith](https://www.youtube.com/watch?v=XTAzsODSCsM)
- 🎥 [Javascript Closure — techsith](https://www.youtube.com/watch?v=71AtaJpJHw0)
- 🎥 [Closures — Fun Fun Function](https://www.youtube.com/watch?v=CQqwU2Ixu-U)
- 🎥 [Closures in JavaScript — techsith](https://www.youtube.com/watch?v=-xqJo5VRP4A)
- 🎥 [JavaScript Closures 101: What is a closure? — JavaScript Tutorials](https://www.youtube.com/watch?v=yiEeiMN2Khs)
- 🎥 [Closures — freeCodeCamp](https://www.youtube.com/watch?v=1JsJx1x35c0)
- 🎥 [JavaScript Closures — CodeWorkr](https://www.youtube.com/watch?v=-rLrGAXK8WE)
- 🎥 [Closures in JS  - Akshay Saini](https://www.youtube.com/watch?v=qikxEIxsXco)
- 🎥 [CLOSURES en JavaScript: Qué son y cómo funcionan - Carlos Azaustre](https://youtu.be/xa8lhVwQBw4)

- https://stackoverflow.com/questions/111102/how-do-javascript-closures-work
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://dev.to/richardbray/why-the-var-and-let-keywords-shouldnt-be-used-interchangeably-3n07
- https://www.telerik.com/blogs/demystifying-closures-javascript

#### Filter inBetween
```
function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
```
#### Filter inArray
```
function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
#### Sort by field
```
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName){
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

users.sort(byField('name'));
users.sort(byField('age'));
```
#### army of functions
```
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
      let j = i;
      let shooter = function() {
        alert(j);
      };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

## The "new Function" syntax
But `new Function` allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:
```
let func = new Function ([arg1, arg2, ...argN], functionBody);
```
```
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3
```
```
let sayHi = new Function('alert("Hello")');
sayHi(); // Hello
```
```
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

## Closure
But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.

So, such function doesn't have access to outer variables, only to the global ones.
```
function getFunc() {
  let value = "test";
  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined
```
Compare it with the regular behavior:
```js run
function getFunc() {
  let value = "test";
  let func = function() { alert(value); };

  return func;
}

getFunc()(); // *!*"test"*/!*, from the Lexical Environment of getFunc
```

This special feature of `new Function` looks strange, but appears very useful in practice.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

Our new function needs to interact with the main script.

What if it could access the outer variables?

The problem is that before JavaScript is published to production, it's compressed using a *minifier* -- a special program that shrinks code by removing extra comments, spaces and -- what's important, renames local variables into shorter ones.

For instance, if a function has `let userName`, minifier replaces it with `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.

So if `new Function` had access to outer variables, it would be unable to find renamed  `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.

## Summary

The syntax:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
