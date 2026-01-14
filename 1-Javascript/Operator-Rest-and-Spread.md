### The Rest Operator
```
const numbers = [3, 2, 1, -2, 4, 9];
console.log(Math.max(...numbers)); // logs 9 to the console

const myFunction = (one, two, ...rest) => {
  console.log(rest);
};
myFunction("one", "two", "three", "four", "five"); // logs [‘three’, ‘four’, ‘five’] to the console
```
### The Spread Operator
```
const details = ["my", "name", "is"];
const message = [...details, "Ifeoma Imoh"];
console.log(message); // logs [ 'my', 'name', 'is', 'Ifeoma Imoh' ]

const oldObj = { firstName: "Ifeoma", lastName: "Imoh" };
const newObj = { ...oldObj, middleName: "Sylvia" };
console.log(newObj); // prints { firstName: 'Ifeoma', lastName: 'Imoh', middleName: 'Sylvia'}
```
```
const ChildComponent = ({ name, ...props }) => {
  return (
    <div>
      <p> Welcome, {name} </p>
      <p>{sex}</p>
      <p> {height} </p>
    </div>
  );
};

const ParentComponent = () => {
  return <ChildComponent name="Ifeoma" sex="F" height="173cm" />;
};
```
# Rest parameters and spread syntax
```
function sumAll(...args) { // args is the name for the array
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```
although `arguments` is both array-like and iterable, it's not an array. It does not support array methods, so we can't call `arguments.map(...)` for example.

Also, it always contains all arguments. We can't capture them partially, like we did with rest parameters.

> Arrow functions do not have `arguments`

If we access the `arguments` object from an arrow function, it takes them from the outer "normal" function.
```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```
## Spread syntax
```
alert( Math.max(3, 5, 1) ); // 5

let arr = [3, 5, 1];
alert( Math.max(arr) ); // NaN

let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5
```
```
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```
```
let str = "Hello";

alert( Array.from(str) ); // H,e,l,l,o
alert( [...str] ); // H,e,l,l,o
```
The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.

But there's a subtle difference between `Array.from(obj)` and `[...obj]`:

- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.