```
typeof {} // object
typeof [] // object
Array.isArray({}) // false
Array.isArray([]) // true
```
```
let fruits = ["Apple", "Orange", "Plum"];
alert( fruits.at(-1) ); // Plum
```
## Methods pop/push, shift/unshift
Methods push/pop run fast, while shift/unshift are slow.
```
let fruits = ["Apple", "Orange", "Pear"];
fruits.pop(); // remove "Pear"

fruits.push("Pear"); // Apple, Orange, Pear
```
```
let fruits = ["Apple", "Orange", "Pear"];
fruits.shift(); // remove Apple
fruits.unshift('Apple'); // Apple, Orange, Pear
```
Methods push and unshift can add multiple elements at once:
```
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");
// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
```
| |avoid (mutates the array)|prefer (returns a new array)|
|-|-|-|
|adding|push, unshift|concat, [...arr] spread syntax (example)|
|removing|pop, shift, splice|filter, slice (example)|
|replacing|	splice, arr[i] = ... assignment|map (example)|
|sorting|	reverse, sort|copy the array first (example)|

## toString
```
let arr = [1, 2, 3];
String(arr) === '1,2,3'; // true

[] + 1      // "1"
[1] + 1     // "11"
[1,2] + 1   // "1,21"
```
```
[] == []    // false
[0] == [0]  // false

0 == []     // true
'0' == []   // false
0 == ''     // true

'0' == ''   // false
```
## delete
```
let arr = ["I", "go", "home"];
delete arr[1]; // remove "go"
alert( arr[1] ); // undefined
```
## splice (mutates existing array)
```
arr.splice(start[, deleteCount, elem1, ..., elemN])
```
```
let arr = [1, 2, 5];
arr.splice(-1, 0, 3, 4); // 1,2,3,4,5
```
## slice (returns a new array sliced)
```
arr.slice([start], [end])
```
```
let arr = ["t", "e", "s", "t"];
arr.slice(1, 3) // e,s (copy from 1 to 3)
arr.slice(-2) // s,t (copy from -2 till the end)
```

We can also call it without arguments: `arr.slice()` creates a copy of `arr`. That's often used to obtain a copy for further transformations that should not affect the original array.

## concat (returns a new array)
```
let arr = [1, 2];

arr.concat([3, 4])          // 1,2,3,4
arr.concat([3, 4], [5, 6])  // 1,2,3,4,5,6
arr.concat([3, 4], 5, 6)    // 1,2,3,4,5,6
```
```
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

arr.concat(arrayLike)       // 1,2,[object Object]
```
…But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:
```
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

arr.concat(arrayLike)       // 1,2,something,else
```
## filter (returns an array)
```
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
```
## sort
```
let arr = [ 1, 2, 15 ];
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

arr.sort(compareNumeric); // 1, 2, 15
```
```
let countries = ['Österreich', 'Andorra', 'Vietnam'];
alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)
alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
## reduce/reduceRight
```
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```
```
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0); // 15
```
## thisArg
Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, accept an optional additional parameter thisArg.
```
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
```
The value of `thisArg` parameter becomes `this` for func.
```
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```