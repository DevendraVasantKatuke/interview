# Arrow functions revisited
functions we usually don't want to leave the current context. That's where arrow functions come in handy.

Until arrow functions, every new function defined its own 'this' value 
(a new object in case of a constructor,
 undefined in strict mode function calls,
 the context object if the function is called as an "object method", etc.).

Arrow functions are always anonymous and lexically binds the this value

## Arrow functions have no "this"
```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```
If we used a "regular" function, there would be an error:
```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();
```
Not having `this` naturally means another limitation: arrow functions can't be used as constructors. They can't be called with `new`.


### Arrow functions VS bind
There's a subtle difference between an arrow function `=>` and a regular function called with `.bind(this)`:

- `.bind(this)` creates a "bound version" of the function.
- The arrow `=>` doesn't create any binding. The function simply doesn't have `this`. The lookup of `this` is made exactly the same way as a regular variable search: in the outer lexical environment.


## Arrows have no "arguments"

Arrow functions also have no `arguments` variable.

That's great for decorators, when we need to forward a call with the current `this` and `arguments`.

For instance, `defer(f, ms)` gets a function and returns a wrapper around it that delays the call by `ms` milliseconds:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
```
The same without an arrow function would look like:
```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```
Here we had to create additional variables `args` and `ctx` so that the function inside `setTimeout` could take them.