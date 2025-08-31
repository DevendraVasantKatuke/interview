```
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
```
```
console.log(null == undefined);
// → true
console.log(null == 0);
// → false
```
```
console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2
```
The ?? operator resembles || but returns the value on the right only if the one on the left is null or undefined, not if it is some other value that can be converted to false. Often, this is preferable to the behavior of ||.
```
console.log(0 || 100);
// → 100
console.log(0 ?? 100);
// → 0
console.log(null ?? 100);
// → 100
```