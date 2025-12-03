#### Logical AND Assignment
```
let x = 5;
let y = 10;

x &&= y;

console.log(x); // Outputs: 10 (because x is truthy, it gets assigned the value of y)
```
```
let a = 0;
let b = 20;

a ||= b;

console.log(a); // Outputs: 20 (because a is falsy, it gets assigned the value of b)
```
```
let p = null;
let q = 42;

p ??= q;

console.log(p); // Outputs: 42 (because p is null, it gets assigned the value of q)
```