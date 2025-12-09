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
### A maximal subarray
The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.
#### Slow solution
```javascript
function getMaxSubSum(arr) {
  let maxSum = 0; // if we take no elements, zero will be returned

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```
The solution has a time complexity of O(n2). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.

For big arrays (1000, 10000 or more items) such algorithms can lead to a serious sluggishness.
#### Fast solution
```javascript
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```
The algorithm requires exactly 1 array pass, so the time complexity is O(n).