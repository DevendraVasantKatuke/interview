---
title: Coercion in Javascript
date: Dec 29, 2023
author: Devendra Vasant Katuke
---

```
[] + [] 		// "" (empty string)
[] + {}	 		// "[object Object]" (string)
{} + [] 		// 0
({} + [])		// "[object Object]"
false +	[] 		// "false" (string)
"123" +	1 		// "1231" (string)
"123" -	1 		// 122 (number)
"123" -	"abc" 	// NaN (number)
```

#### Number to String Conversion
```
// The Number 10 is converted to string '10' and then '+' concatenates both strings   
var x = 10 + '20';
var y = '20' + 10;
  
// The Boolean value true is converted to string 'true' and then '+' concatenates both the strings
var z = true + '10';
  
console.log(x); // 1020
console.log(y); // 2010
console.log(z); // true10
```
#### String to Number Conversion
```
// The string '5' is converted to number 5 in all cases implicitly
var w = 10 - '5';
var x = 10 * '5';
var y = 10 / '5';
var z = 10 % '5';
  
console.log(w); // 5
console.log(x); // 20
console.log(y); // 2
console.log(z); // 0
```
#### Boolean to Number
```
// The Boolean value true is converted to number 1 and then operation is performed
var x = true + 2;
  
// The Boolean value false is converted to number 0 and then operation is performed
var y = false + 2;
  
console.log(x); // 3
console.log(y); // 2
```
#### The Equality Operator
```
// Should output 'true' as string '10' is coerced to number 10
var x = (10 == '10');
  
// Should output 'true', as boolean true is coerced to number 1
var y = (true == 1);
  
// Should output 'false' as string 'true' is coerced to NaN which is not equal to 1 of Boolean true
var z = (true == 'true');
  
console.log(x); // true
console.log(y); // true
console.log(z); // false
```