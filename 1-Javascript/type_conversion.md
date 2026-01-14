## String Conversion
```js run
String(false); // 'false'
String(null); // 'null'
```
## Numeric Conversion
```js run
"6" / "2"; // 3, strings are converted to numbers
```
We can use the `Number(value)` function to explicitly convert a `value` to a number:
```js run
Number("123"); // 123
Number("   123   "); // 123
Number("123z"); // NaN
Number("an arbitrary string instead of a number"); // NaN, conversion failed
Number(undefined); // NaN
Number(null); // 0
Number(true); // 1
Number(false); // 0
```
## Boolean Conversion
`0`, `null`, `undefined`, `NaN`, `""` ,`false` return `false`. Every other value returns true.
```js run
Boolean(0); // false
Boolean(1); // true
Boolean("0"); // true
Boolean(" "); // true
Boolean("hello"); // true
Boolean(""); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false
```