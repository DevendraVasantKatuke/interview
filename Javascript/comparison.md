# Comparisons
```js run
let result = 5 > 4; // result is true
```
## String comparison
```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```
When comparing values of different types, JavaScript converts the values to numbers.
```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```
For boolean values, `true` becomes `1` and `false` becomes `0`.
```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```
```js run
let a = 0;
Boolean(a); // false
let b = "0";
Boolean(b); // true
a == b; // true!
```
## Strict equality
```js run
0 == false; // true
'' == false; // true
```
```js run
0 === false; // false, because the types are different
```
## Comparison with null and undefined
```js run
null === undefined; // false
null == undefined; // true
```
`null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.
```js run
alert( null > 0 );  // false
alert( null == 0 ); // false
alert( null >= 0 ); // true
```
```js run
alert( undefined > 0 ); // false
alert( undefined < 0 ); // false
alert( undefined == 0 ); // false
```
#### some code
```javascript
5 > 4; // true
"apple" > "pineapple"; // false
"2" > "12"; // true
undefined == null; // true
undefined === null; // false
null == "\n0\n"; // false
null === +"\n0\n"; // false
```