# Arrays
```js
let arr = new Array();
let arr = [];
```
```js run no-beautify
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];
alert( arr[1].name ); // John
arr[3](); // hello
```
#### `pop/push`, Methods that work with the end of the array (`stack`, `LIFO`)
#### `shift/unshift`, Methods that work with the begining of the array (`queue`, `FIFO`)
```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```
## Loops
```javascript
let arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
  alert( arr[i] );
}
for (let fruit of fruits) { // made for arrays
    alert( fruit );
}
```
```javascript
for (let key in arr) { // borrowed from Object 
    alert( arr[key] );
}
// iterates over "all" properties, that may be a problem
// 'for ... in' is optimized for generic objects, not arrays, and thus is 10-100 times slower. 
```
## A word about "length"
interesting thing about the `length` property is that it's writable.
```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
arr.length = 5; // return length back
arr.length = 0; // clear the array
```
## toString
```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```
```js run
alert( 0 == [] ); // true
alert('0' == [] ); // false
```