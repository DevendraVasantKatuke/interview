# The "new Function" syntax
```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```
```js run
let sayHi = new Function('alert("Hello")');
sayHi(); // Hello
```
```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```
## Closure
A function remembers where it was born in the special property `[[Environment]]`.

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.
```js run
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

getFunc()(); // "test", from the Lexical Environment of getFunc
```
**If `new Function` had access to outer variables, it would have problems with minifiers.**

These three declarations mean the same:
```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```